import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../styles/RoboticArm.css";

const RoboticArm = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    // Get the container element
    const container = mountRef.current;
    
    // Create scene, camera, renderer, etc.
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a192f); // Dark navy blue to match your website
    
    // Create camera with better positioning to show the vertical arm and more of the scene
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(4, 4, 5); // Zoomed out camera position
    camera.lookAt(0, 0, 0);
    
    // Create renderer with proper settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false // Disable alpha since we're using a matching background color
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Clear container and append renderer
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Define arm segment lengths - adjusted for better proportions
    const armLength1 = 0.4;  // Base to shoulder height
    const armLength2 = 0.8;  // Upper arm length
    const armLength3 = 0.7;  // Forearm length
    const armLength4 = 0.3;  // Wrist length
    const armLength5 = 0.2;  // Hand length
    
    // Scale factor for all components
    const scaleFactor = 1.5;  // Increase overall scale
    
    // Define initial angles for a vertical swan neck-like posture with 45-degree bends
    let angle1 = 0;           // Base rotation (y-axis)
    let angle2 = -Math.PI/2;  // Shoulder joint (x-axis) - straight up
    let angle3 = Math.PI/4;   // Elbow joint (x-axis) - 45-degree bend
    let angle4 = Math.PI/4;   // Wrist pitch (x-axis) - 45-degree bend downward
    let angle5 = 0;           // Wrist roll (z-axis)
    let angle6 = 0;           // Wrist yaw (y-axis)
    let angle7 = 0;           // Gripper rotation (z-axis)
    
    // Target angles for IK - match initial angles for smooth start
    let targetAngle1 = angle1;
    let targetAngle2 = angle2;
    let targetAngle3 = angle3;
    let targetAngle4 = angle4;
    let targetAngle5 = angle5;
    let targetAngle6 = angle6;
    let targetAngle7 = angle7;
    
    // Animation state
    let state = "idle";
    let animationProgress = 0;
    let animationSpeed = 0.02;
    let objectGrabbed = false;
    let currentTarget = null; 
    
    // Object positions
    const objectStartPos = new THREE.Vector3(2.5, -1, 0);
    const objectDropPos = new THREE.Vector3(-2.5, -1, 0);
    let targetPos = new THREE.Vector3();
    
    // Distance threshold for picking up the object
    const pickupDistance = 0.15;
    
    // Define constraints for the box movement
    const minDistance = 0.8;
    const maxDistance = 3.0;
    
    // Create a collection to store all interactive objects
    const interactiveObjects = [];
    
    // Function to constrain object position to be within reachable area
    const constrainObjectPosition = (position) => {
      const horizontalDist = Math.sqrt(position.x * position.x + position.z * position.z);
      
      if (horizontalDist < minDistance || horizontalDist > maxDistance) {
        // Calculate direction vector from base to object
        const direction = new THREE.Vector3(position.x, 0, position.z).normalize();
        
        // Constrain distance
        const newDistance = Math.max(minDistance, Math.min(maxDistance, horizontalDist));
        
        // Update position
        position.x = direction.x * newDistance;
        position.z = direction.z * newDistance;
      }
      
      // Constrain height to be at the table level
      position.y = baseGroup.position.y + (position === userDropLocation.position ? 0.01 : 0.15);
      
      return position;
    };
    
    // Create robot base - larger base
    const baseGroup = new THREE.Group();
    baseGroup.scale.set(scaleFactor, scaleFactor, scaleFactor);  // Scale the entire base group
    baseGroup.position.y = -1; // Move it down a bit
    scene.add(baseGroup);
    
    // Main circular base with more detail - increased radius
    const baseGeometry = new THREE.CylinderGeometry(0.7, 0.8, 0.25, 32);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x282c34,
      specular: 0x40ffda,
      shininess: 50
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.castShadow = true;
    base.receiveShadow = true;
    baseGroup.add(base);
    
    // Add base details - mounting bolts (larger)
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const boltGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 8);
      const boltMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x555555,
        specular: 0x999999,
        shininess: 80
      });
      const bolt = new THREE.Mesh(boltGeometry, boltMaterial);
      bolt.position.set(
        Math.cos(angle) * 0.75,
        0.12,
        Math.sin(angle) * 0.75
      );
      baseGroup.add(bolt);
    }
    
    // Base platform with texture - larger
    const platformGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.12, 32);
    const platformMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1e2228,
      specular: 0x40ffda,
      shininess: 40
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = 0.18;
    platform.castShadow = true;
    platform.receiveShadow = true;
    baseGroup.add(platform);
    
    // Add a rotating joint to the base - larger
    const baseJointGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.12, 16);
    const baseJointMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x40ffda,
      specular: 0xffffff,
      shininess: 70
    });
    const baseJoint = new THREE.Mesh(baseJointGeometry, baseJointMaterial);
    baseJoint.position.y = 0.3;
    baseGroup.add(baseJoint);
    
    // Create robot arm with more detailed components
    const robotArm = new THREE.Group();
    baseGroup.add(robotArm);
    
    // Helper function to create more detailed joints - larger sizes
    const createJoint = (color, size = 0.12) => {
      const group = new THREE.Group();
      
      // Main joint sphere
      const sphereGeometry = new THREE.SphereGeometry(size, 16, 16);
      const sphereMaterial = new THREE.MeshPhongMaterial({ 
        color: color,
        specular: 0xffffff,
        shininess: 70
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      group.add(sphere);
      
      // Add joint detail - axis indicator
      const axisGeometry = new THREE.CylinderGeometry(size/4, size/4, size*2, 8);
      const axisMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        specular: 0x999999,
        shininess: 50
      });
      const axis = new THREE.Mesh(axisGeometry, axisMaterial);
      axis.rotation.x = Math.PI/2;
      group.add(axis);
      
      return group;
    };
    
    // Helper function to create more detailed arm segments - thicker
    const createArmSegment = (length, radius, color = 0x1e2228) => {
      const group = new THREE.Group();
      
      // Main arm cylinder
      const geometry = new THREE.CylinderGeometry(radius, radius, length, 16);
      geometry.rotateX(Math.PI / 2);
      geometry.translate(0, 0, length / 2); // Ensure cylinder extends from origin
      
      const material = new THREE.MeshPhongMaterial({ 
        color: color,
        specular: 0x40ffda,
        shininess: 40
      });
      
      const cylinder = new THREE.Mesh(geometry, material);
      group.add(cylinder);
      
      // Add ribbed details to the arm
      const ribCount = Math.floor(length / 0.1);
      for (let i = 0; i < ribCount; i++) {
        const ribGeometry = new THREE.TorusGeometry(radius * 1.1, radius * 0.1, 8, 16);
        const ribMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x333333,
          specular: 0x999999,
          shininess: 50
        });
        const rib = new THREE.Mesh(ribGeometry, ribMaterial);
        rib.rotation.x = Math.PI/2;
        rib.position.z = (i / (ribCount-1)) * length;
        group.add(rib);
      }
      
      return group;
    };
    
    // Create the robot arm components with more realistic joints
    const shoulder = new THREE.Group();
    shoulder.position.y = armLength1; // Adjust to match the base height
    robotArm.add(shoulder);
    
    const upperArm = new THREE.Group();
    shoulder.add(upperArm);
    
    const elbow = new THREE.Group();
    upperArm.add(elbow);
    elbow.position.z = armLength2; // Position at the end of the upper arm
    
    const forearm = new THREE.Group();
    elbow.add(forearm);
    
    const wristPitch = new THREE.Group();
    forearm.add(wristPitch);
    wristPitch.position.z = armLength3; // Position at the end of the forearm
    
    const wristRoll = new THREE.Group(); // Roll joint
    wristPitch.add(wristRoll);
    
    const wristYaw = new THREE.Group(); // Yaw joint
    wristRoll.add(wristYaw);
    
    const hand = new THREE.Group();
    wristYaw.add(hand);
    hand.position.z = armLength4; // Position at the end of the wrist
    
    // Create visual components for joints with different colors
    const shoulderVisual = createJoint(0x40ffda, 0.1);
    shoulder.add(shoulderVisual);
    
    const elbowVisual = createJoint(0x40ffda, 0.09);
    elbow.add(elbowVisual);
    
    const wristPitchVisual = createJoint(0x40ffda, 0.08);
    wristPitch.add(wristPitchVisual);
    
    const wristRollVisual = createJoint(0x40ffda, 0.075);
    wristRoll.add(wristRollVisual);
    
    const wristYawVisual = createJoint(0x40ffda, 0.07); // New joint visual
    wristYaw.add(wristYawVisual);
    
    const handVisual = createJoint(0x40ffda, 0.065);
    hand.add(handVisual);
    
    // Add arm segments between joints with increased thicknesses
    const upperArmMesh = createArmSegment(armLength2, 0.09, 0x0a192f);
    upperArm.add(upperArmMesh);
    
    const forearmMesh = createArmSegment(armLength3, 0.075, 0x0a192f);
    forearm.add(forearmMesh);
    
    const wristMesh = createArmSegment(armLength4, 0.065, 0x0a192f); // Add wrist segment
    wristYaw.add(wristMesh);
    
    const handMesh = createArmSegment(armLength5, 0.06, 0x0a192f);
    hand.add(handMesh);
    
    // Add a gripper to the end of the arm - larger
    const gripper = new THREE.Group();
    hand.add(gripper);
    gripper.position.z = armLength4;
    
    // Create gripper parts - larger
    const gripperBaseGeometry = new THREE.BoxGeometry(0.15, 0.07, 0.07);
    const gripperBaseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      specular: 0x999999,
      shininess: 70
    });
    const gripperBase = new THREE.Mesh(gripperBaseGeometry, gripperBaseMaterial);
    gripper.add(gripperBase);
    
    // Create gripper fingers - larger
    const createGripperFinger = (isLeft) => {
      const finger = new THREE.Group();
      
      const fingerGeometry = new THREE.BoxGeometry(0.04, 0.03, 0.15);
      const fingerMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x40ffda,
        specular: 0xffffff,
        shininess: 70
      });
      const fingerMesh = new THREE.Mesh(fingerGeometry, fingerMaterial);
      fingerMesh.position.z = 0.075;
      finger.add(fingerMesh);
      
      // Add finger tip with different color
      const tipGeometry = new THREE.BoxGeometry(0.04, 0.03, 0.03);
      const tipMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        specular: 0xffffff,
        shininess: 90
      });
      const tipMesh = new THREE.Mesh(tipGeometry, tipMaterial);
      tipMesh.position.z = 0.15;
      finger.add(tipMesh);
      
      finger.position.x = isLeft ? -0.07 : 0.07;
      finger.position.z = 0;
      
      return finger;
    };
    
    const leftFinger = createGripperFinger(true);
    const rightFinger = createGripperFinger(false);
    gripper.add(leftFinger);
    gripper.add(rightFinger);

    // NOW add the getEndEffectorPosition function AFTER gripper is defined
    const getEndEffectorPosition = () => {
      // Create a temporary vector to store the position
      const position = new THREE.Vector3();
      
      // Get the world position of the gripper
      gripper.getWorldPosition(position);
      
      return position;
    };

    // Add this function to calculate the gripper opening based on animation progress
    const getGripperOpening = (progress) => {
      // Start with fingers closed (0.07 units apart)
      const baseOpening = 0.07;
      
      // Maximum additional opening (0.1 units more when fully open)
      const maxAdditionalOpening = 0.1;
      
      // Calculate current opening based on progress (0 = closed, 1 = open)
      return baseOpening + (maxAdditionalOpening * progress);
    };
    
    // Create blue box
    const createBox = (color, position, isRed = false) => {
      const boxGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const boxMaterial = new THREE.MeshPhongMaterial({ 
        color: color,
        specular: 0xffffff,
        shininess: 30,
        transparent: false,
        opacity: 1.0
      });

      // Add texture pattern to the box
      const createBoxTexture = (mainColor, patternColor) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 128;
        canvas.height = 128;
        
        // Fill background
        context.fillStyle = mainColor;
        context.fillRect(0, 0, 128, 128);
        
        // Add grid pattern
        context.strokeStyle = patternColor;
        context.lineWidth = 2;
        
        // Draw grid lines
        for (let i = 16; i < 128; i += 16) {
          context.beginPath();
          context.moveTo(i, 0);
          context.lineTo(i, 128);
          context.stroke();
          
          context.beginPath();
          context.moveTo(0, i);
          context.lineTo(128, i);
          context.stroke();
        }
        
        // Add a logo or symbol
        context.fillStyle = patternColor;
        context.beginPath();
        context.arc(64, 64, 24, 0, Math.PI * 2);
        context.fill();
        
        context.fillStyle = mainColor;
        context.beginPath();
        context.arc(64, 64, 16, 0, Math.PI * 2);
        context.fill();
        
        return new THREE.CanvasTexture(canvas);
      };

      const textureColor = isRed ? '#ff5555' : '#40ffda';
      const patternColor = isRed ? '#331111' : '#0a192f';
      boxMaterial.map = createBoxTexture(textureColor, patternColor);
      
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.copy(position);
      box.position.y = baseGroup.position.y + 0.15; // Add half the height of the box to sit on the ground
      box.castShadow = true;
      box.userData = { 
        isRed: isRed,
        isInteractive: true,
        isGrabbed: false
      };
      scene.add(box);
      
      // Add to interactive objects collection
      interactiveObjects.push(box);
      
      return box;
    };

    // Create blue box (original)
    const blueBox = createBox(0x40ffda, objectStartPos, false);

    // Create red box at a different position
    const redBox = createBox(0xff5555, new THREE.Vector3(-1.5, -1, 2.0), true);

    // Create drop locations for different colored boxes
    const createDropLocation = (color, position, isRed = false) => {
      const ringGeometry = new THREE.RingGeometry(0.2, 0.22, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = -Math.PI / 2;
      ring.position.copy(position);
      ring.position.y = baseGroup.position.y + 0.01; // Just slightly above the ground
      ring.userData = { isRed: isRed };
      scene.add(ring);
      
      // Add an inner ring
      const innerRingGeometry = new THREE.RingGeometry(0.15, 0.17, 32);
      const innerRingMaterial = new THREE.MeshBasicMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
      innerRing.rotation.x = -Math.PI / 2;
      innerRing.position.set(0, 0.005, 0); // Slightly above parent to avoid z-fighting
      ring.add(innerRing);
      
      return ring;
    };

    // Create blue drop location (original)
    const blueDropLocation = createDropLocation(0x40ffda, objectDropPos, false);

    // Create red drop location
    const redDropLocation = createDropLocation(0xff5555, new THREE.Vector3(1.5, -1, -2.0), true);

    // Add a movable target that can be positioned by the user
    const userDropLocationGeometry = new THREE.RingGeometry(0.25, 0.28, 32);
    const userDropLocationMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, // White color to be neutral
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    });
    const userDropLocation = new THREE.Mesh(userDropLocationGeometry, userDropLocationMaterial);
    userDropLocation.rotation.x = -Math.PI / 2;
    userDropLocation.position.set(1.5, baseGroup.position.y + 0.01, 1.5);
    userDropLocation.userData = { isMovableTarget: true };
    scene.add(userDropLocation);

    // Add an inner ring to make the target more visible
    const innerRingGeometry = new THREE.RingGeometry(0.15, 0.17, 32);
    const innerRingMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
    innerRing.position.set(0, 0.005, 0); // Slightly above parent to avoid z-fighting
    userDropLocation.add(innerRing);

    // Add a highlight function for hover effects
    const highlightObject = (object) => {
      if (object && object.material) {
        // Store original color if not already stored
        if (!object.userData.originalColor) {
          object.userData.originalColor = object.material.color.clone();
        }
        
        // Brighten the color slightly
        object.material.color.lerp(new THREE.Color(0xffffff), 0.2);
      }
    };

    const unhighlightObject = (object) => {
      if (object && object.material && object.userData.originalColor) {
        // Restore original color
        object.material.color.copy(object.userData.originalColor);
      }
    };

    // Raycaster for object interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let selectedObject = null;
    let dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    let dragOffset = new THREE.Vector3();

    // Convert mouse position to normalized device coordinates
    const updateMousePosition = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    // Handle mouse down event
    const onMouseDown = (event) => {
      console.log("Mouse down event triggered");
      updateMousePosition(event);
      
      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
      
      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects([blueBox, redBox, userDropLocation]);
      
      if (intersects.length > 0) {
        console.log("Object clicked:", intersects[0].object);
        isDragging = true;
        selectedObject = intersects[0].object;
        
        // Disable orbit controls while dragging
        controls.enabled = false;
        
        // Calculate the offset from the intersection point to the object position
        const intersectionPoint = intersects[0].point;
        dragOffset.copy(selectedObject.position).sub(intersectionPoint);
        
        // Set the drag plane to pass through the object's y position
        dragPlane.constant = -selectedObject.position.y;
        
        // Change cursor style
        renderer.domElement.style.cursor = 'grabbing';
        
        // Pause the arm animation while user is dragging
        if (state !== "idle" && (selectedObject === blueBox || selectedObject === redBox)) {
          state = "paused";
          console.log("State changed to paused");
        }
      }
    };

    // Handle mouse move event with hover effects
    const onMouseMove = (event) => {
      updateMousePosition(event);
      
      // Check for hover effect when not dragging
      if (!isDragging) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects([blueBox, redBox, userDropLocation]);
        
        // Reset all objects to their original colors
        [blueBox, redBox, userDropLocation].forEach(obj => {
          unhighlightObject(obj);
        });
        
        // Highlight the object under the cursor
        if (intersects.length > 0) {
          highlightObject(intersects[0].object);
          renderer.domElement.style.cursor = 'pointer';
        } else {
          renderer.domElement.style.cursor = 'auto';
        }
      }
      
      // If we're dragging an object, update its position
      if (isDragging && selectedObject) {
        raycaster.setFromCamera(mouse, camera);
        
        // Find where on the drag plane the ray intersects
        const intersectionPoint = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(dragPlane, intersectionPoint)) {
          // Update the object position, adding the original offset
          selectedObject.position.copy(intersectionPoint.add(dragOffset));
          
          // Apply constraints to keep the object within valid bounds
          if (selectedObject.userData.isInteractive) {
            constrainObjectPosition(selectedObject.position);
          } else if (selectedObject === userDropLocation) {
            // Constrain the drop location to the table level
            selectedObject.position.y = baseGroup.position.y + 0.01;
            // Apply the same distance constraints as the object
            constrainObjectPosition(selectedObject.position);
          }
        }
      }
    };

    // Handle mouse up event
    const onMouseUp = (event) => {
      if (isDragging) {
        // If we were dragging the drop location, update the target
        if (selectedObject === userDropLocation) {
          userDropLocation.userData.isActive = true;
          console.log("Updated custom drop location to:", userDropLocation.position);
        } else if (selectedObject && selectedObject.userData.isInteractive && state === "idle") {
          // Start the arm animation to pick up the object
          currentTarget = selectedObject;
          state = "approaching";
          animationProgress = 0;
          console.log("State changed to approaching for object:", currentTarget);
        }
        
        isDragging = false;
        selectedObject = null;
        
        // Re-enable orbit controls
        controls.enabled = true;
        
        // Reset cursor style
        renderer.domElement.style.cursor = 'auto';
      }
    };

    // Add event listeners directly to the renderer's DOM element
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseup', onMouseUp); // Catch mouse up outside the canvas

    // Add touch support for mobile devices
    const onTouchStart = (event) => {
      event.preventDefault();
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        const mouseEvent = {
          clientX: touch.clientX,
          clientY: touch.clientY
        };
        onMouseDown(mouseEvent);
      }
    };

    const onTouchMove = (event) => {
      event.preventDefault();
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        const mouseEvent = {
          clientX: touch.clientX,
          clientY: touch.clientY
        };
        onMouseMove(mouseEvent);
      }
    };

    const onTouchEnd = (event) => {
      event.preventDefault();
      onMouseUp(event);
    };

    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false });
    renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false });
    renderer.domElement.addEventListener('touchend', onTouchEnd);

    // Add debugging text to the scene - with larger font
    const addDebugText = (text, position) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 768; // Increased canvas width for larger text (from 512 to 768)
      canvas.height = 192; // Increased canvas height for larger text (from 128 to 192)
      
      context.fillStyle = '#40ffda'; // Aqua color to match website theme
      context.font = '48px Arial'; // Increased font size from 36px to 48px
      context.fillText(text, 10, 80); // Adjusted y-position for larger text (from 60 to 80)
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
      });
      const geometry = new THREE.PlaneGeometry(3, 0.75); // Increased plane size for larger text (from 2x0.5 to 3x0.75)
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      scene.add(mesh);
      
      return mesh;
    };

    // Add a debug message
    const debugText = addDebugText("Drag boxes or white target ring", new THREE.Vector3(0, 2.5, 0));
    debugText.lookAt(camera.position);
    
    // Update robot arm function with more realistic movement
    const updateRobotArm = () => {
      // Update robot arm joint rotations
      robotArm.rotation.y = angle1;
      upperArm.rotation.x = angle2;
      forearm.rotation.x = angle3;
      wristPitch.rotation.x = angle4;
      wristRoll.rotation.z = angle5;
      wristYaw.rotation.y = angle6;
      hand.rotation.z = angle7;
      
      // Update gripper fingers based on whether object is grabbed
      const gripperOpeningProgress = objectGrabbed ? 0 : 1;
      const currentOpening = getGripperOpening(gripperOpeningProgress);
      
      // Position the fingers
      leftFinger.position.x = -currentOpening;
      rightFinger.position.x = currentOpening;
      
      // Update object position if grabbed
      if (objectGrabbed && currentTarget) {
        // Calculate the position of the gripper in world space
        const gripperWorldPos = new THREE.Vector3();
        gripper.getWorldPosition(gripperWorldPos);
        
        // Update the object position to match the gripper
        currentTarget.position.copy(gripperWorldPos);
        
        // Adjust the box position to be centered between the gripper fingers
        currentTarget.position.y -= 0.05;
        
        // Update the object rotation to match the gripper
        const gripperWorldQuat = new THREE.Quaternion();
        gripper.getWorldQuaternion(gripperWorldQuat);
        currentTarget.quaternion.copy(gripperWorldQuat);
      }
    };
    
    // Get the appropriate drop location based on the current target
    const getTargetDropLocation = () => {
      if (!currentTarget) return blueDropLocation.position.clone();
      
      // Choose drop location based on box color
      if (currentTarget.userData.isRed) {
        return redDropLocation.position.clone();
      } else {
        return blueDropLocation.position.clone();
      }
    };
    
    // Animation update function with improved state transitions
    const updateAnimation = (time) => {
      // Animate the target rings with pulsing effect
      const pulse = (Math.sin(time * 0.003) + 1) * 0.5;
      userDropLocationMaterial.opacity = 0.4 + pulse * 0.3;
      innerRingMaterial.opacity = 0.3 + pulse * 0.4;
      
      if (state === "idle") {
        // Idle position with subtle movement
        angle1 = 0.03 * Math.sin(time * 0.0008);
        angle2 = -Math.PI/2 + 0.02 * Math.sin(time * 0.001);
        angle3 = Math.PI/4 + 0.02 * Math.sin(time * 0.0012);
        angle4 = Math.PI/4 + 0.01 * Math.sin(time * 0.0015);
        angle5 = 0.01 * Math.sin(time * 0.002);
        angle6 = 0.01 * Math.sin(time * 0.0018);
        angle7 = 0.01 * Math.sin(time * 0.0025);
        
        // Look for boxes that have been moved by the user
        if (!objectGrabbed && interactiveObjects.length > 0) {
          // Find the closest box that's not at its target location
          let closestBox = null;
          let closestDistance = Infinity;
          
          interactiveObjects.forEach(box => {
            // Skip if the box is already at its target
            const targetLocation = box.userData.isRed ? redDropLocation : blueDropLocation;
            const distanceToTarget = box.position.distanceTo(targetLocation.position);
            
            if (distanceToTarget > 0.3) { // If box is not at its target
              const distanceToArm = box.position.distanceTo(baseGroup.position);
              if (distanceToArm < closestDistance && distanceToArm < maxDistance) {
                closestDistance = distanceToArm;
                closestBox = box;
              }
            }
          });
          
          // If we found a box to pick up, make the arm look at it
          if (closestBox) {
            const lookDir = new THREE.Vector3().subVectors(closestBox.position, baseGroup.position).normalize();
            targetAngle1 = Math.atan2(lookDir.x, lookDir.z) * 0.2;
            angle1 = angle1 * 0.8 + targetAngle1 * 0.2;
          }
        }
      } else if (state === "approaching") {
        // Move to a position slightly above the object
        targetPos = currentTarget.position.clone();
        targetPos.y += 0.3;
        
        // Calculate target position relative to the robot base
        const relativePos = targetPos.clone().sub(baseGroup.position);
        
        // Calculate horizontal distance and height
        const distXZ = Math.sqrt(relativePos.x * relativePos.x + relativePos.z * relativePos.z);
        const height = relativePos.y - armLength1;
        
        // Calculate distance from shoulder to target
        const distance = Math.sqrt(distXZ * distXZ + height * height);
        
        // Check if distance is within reachable range
        const maxReach = armLength2 + armLength3 + armLength4 * 0.5;
        if (distance > maxReach * 0.95) {
          console.log("Object too far to reach, distance:", distance, "max reach:", maxReach);
          state = "idle";
          return;
        }
        
        // Calculate target angles using inverse kinematics
        targetAngle1 = Math.atan2(relativePos.x, relativePos.z);
        
        // Calculate elbow angle using law of cosines
        const cosElbow = (armLength2 * armLength2 + armLength3 * armLength3 - distance * distance) / 
                         (2 * armLength2 * armLength3);
        const clampedCosElbow = Math.max(-0.99, Math.min(0.99, cosElbow));
        targetAngle3 = Math.PI - Math.acos(clampedCosElbow);
        
        // Calculate shoulder angle
        const cosShoulderToElbow = (armLength2 * armLength2 + distance * distance - armLength3 * armLength3) / 
                                  (2 * armLength2 * distance);
        const clampedCosShoulderToElbow = Math.max(-0.99, Math.min(0.99, cosShoulderToElbow));
        const shoulderToElbow = Math.acos(clampedCosShoulderToElbow);
        const shoulderToTarget = Math.atan2(height, distXZ);
        targetAngle2 = shoulderToTarget - shoulderToElbow;
        
        // Calculate wrist pitch angle to keep end effector level
        targetAngle4 = -targetAngle2 - targetAngle3;
        
        // Calculate wrist orientation to align with the object
        targetAngle5 = 0;
        targetAngle6 = targetAngle1 * 0.2;
        targetAngle7 = 0;
        
        // Add slight anticipation movement
        const progress = Math.min(1, animationProgress * 3);
        if (progress < 0.3) {
          const anticipation = Math.sin(progress * Math.PI) * 0.1;
          targetAngle2 += anticipation;
          targetAngle3 -= anticipation * 0.5;
        }
        
        // Smoothly interpolate current angles to target angles with easing
        const easeFactor = 0.05 + 0.05 * Math.sin(Math.PI * Math.min(1, animationProgress * 2));
        angle1 = angle1 + (targetAngle1 - angle1) * easeFactor;
        angle2 = angle2 + (targetAngle2 - angle2) * easeFactor;
        angle3 = angle3 + (targetAngle3 - angle3) * easeFactor;
        angle4 = angle4 + (targetAngle4 - angle4) * easeFactor;
        angle5 = angle5 + (targetAngle5 - angle5) * easeFactor;
        angle6 = angle6 + (targetAngle6 - angle6) * easeFactor;
        angle7 = angle7 + (targetAngle7 - angle7) * easeFactor;
        
        // Increment animation progress
        animationProgress += animationSpeed;
        
        // Check if we've reached the position above the object
        const endEffectorPos = getEndEffectorPosition();
        const distanceToTarget = endEffectorPos.distanceTo(targetPos);
        
        if (distanceToTarget < pickupDistance || animationProgress > 3) {
          state = "descending";
          animationProgress = 0;
          console.log("State changed to descending");
        }
      } else if (state === "descending") {
        // Move down to grab the object
        targetPos = currentTarget.position.clone();
        
        // Add a slight approach angle for more natural movement
        const approachProgress = Math.min(1, animationProgress * 2);
        const approachOffset = 0.1 * (1 - approachProgress);
        targetPos.y += approachOffset;
        
        // Calculate target position relative to the robot base
        const relativePos = targetPos.clone().sub(baseGroup.position);
        
        // Calculate horizontal distance and height
        const distXZ = Math.sqrt(relativePos.x * relativePos.x + relativePos.z * relativePos.z);
        const height = relativePos.y - armLength1;
        
        // Calculate distance from shoulder to target
        const distance = Math.sqrt(distXZ * distXZ + height * height);
        
        // Calculate target angles using inverse kinematics
        targetAngle1 = Math.atan2(relativePos.x, relativePos.z);
        
        // Calculate elbow angle using law of cosines
        const cosElbow = (armLength2 * armLength2 + armLength3 * armLength3 - distance * distance) / 
                         (2 * armLength2 * armLength3);
        const clampedCosElbow = Math.max(-0.99, Math.min(0.99, cosElbow));
        targetAngle3 = Math.PI - Math.acos(clampedCosElbow);
        
        // Calculate shoulder angle
        const cosShoulderToElbow = (armLength2 * armLength2 + distance * distance - armLength3 * armLength3) / 
                                  (2 * armLength2 * distance);
        const clampedCosShoulderToElbow = Math.max(-0.99, Math.min(0.99, cosShoulderToElbow));
        const shoulderToElbow = Math.acos(clampedCosShoulderToElbow);
        const shoulderToTarget = Math.atan2(height, distXZ);
        targetAngle2 = shoulderToTarget - shoulderToElbow;
        
        // Calculate wrist pitch angle to keep end effector level
        targetAngle4 = -targetAngle2 - targetAngle3;
        
        // Calculate wrist orientation to align with the object
        targetAngle5 = 0;
        targetAngle6 = targetAngle1 * 0.2;
        targetAngle7 = 0;
        
        // Slow down as we get closer to the object
        const slowdownFactor = 0.05 + 0.05 * (1 - Math.min(1, approachProgress));
        
        // Smoothly interpolate current angles to target angles
        angle1 = angle1 + (targetAngle1 - angle1) * slowdownFactor;
        angle2 = angle2 + (targetAngle2 - angle2) * slowdownFactor;
        angle3 = angle3 + (targetAngle3 - angle3) * slowdownFactor;
        angle4 = angle4 + (targetAngle4 - angle4) * slowdownFactor;
        angle5 = angle5 + (targetAngle5 - angle5) * slowdownFactor;
        angle6 = angle6 + (targetAngle6 - angle6) * slowdownFactor;
        angle7 = angle7 + (targetAngle7 - angle7) * slowdownFactor;
        
        // Increment animation progress
        animationProgress += animationSpeed * 0.7;
        
        // Check if we've reached the object
        const endEffectorPos = getEndEffectorPosition();
        const distanceToTarget = endEffectorPos.distanceTo(targetPos);
        
        if (distanceToTarget < pickupDistance || animationProgress > 2) {
          state = "grabbing";
          animationProgress = 0;
          console.log("State changed to grabbing");
        }
      } else if (state === "grabbing") {
        // Close the gripper
        animationProgress = Math.min(animationProgress + animationSpeed * 0.8, 1);
        
        // Add a slight upward movement as the gripper closes
        const grabAdjustment = Math.sin(animationProgress * Math.PI) * 0.02;
        targetAngle2 -= grabAdjustment;
        targetAngle3 += grabAdjustment;
        targetAngle4 -= grabAdjustment;
        
        // Smoothly interpolate current angles to target angles
        angle1 = angle1 + (targetAngle1 - angle1) * 0.1;
        angle2 = angle2 + (targetAngle2 - angle2) * 0.1;
        angle3 = angle3 + (targetAngle3 - angle3) * 0.1;
        angle4 = angle4 + (targetAngle4 - angle4) * 0.1;
        angle5 = angle5 + (targetAngle5 - angle5) * 0.1;
        angle6 = angle6 + (targetAngle6 - angle6) * 0.1;
        angle7 = angle7 + (targetAngle7 - angle7) * 0.1;
        
        // After a short delay, grab the object
        if (animationProgress >= 1) {
          objectGrabbed = true;
          currentTarget.userData.isGrabbed = true;
          state = "lifting";
          animationProgress = 0;
          console.log("State changed to lifting, object grabbed");
          
          // Add a slight "settling" effect
          targetAngle2 += 0.02;
          targetAngle3 -= 0.03;
          targetAngle4 += 0.01;
        }
      } else if (state === "lifting") {
        // Move up with the object
        targetPos = currentTarget.position.clone();
        targetPos.y += 0.3 + 0.1 * Math.sin(Math.PI * Math.min(1, animationProgress * 2));
        
        // Calculate target position relative to the robot base
        const relativePos = targetPos.clone().sub(baseGroup.position);
        
        // Calculate horizontal distance and height
        const distXZ = Math.sqrt(relativePos.x * relativePos.x + relativePos.z * relativePos.z);
        const height = relativePos.y - armLength1;
        
        // Calculate distance from shoulder to target
        const distance = Math.sqrt(distXZ * distXZ + height * height);
        
        // Calculate target angles using inverse kinematics
        targetAngle1 = Math.atan2(relativePos.x, relativePos.z);
        
        // Calculate elbow angle using law of cosines
        const cosElbow = (armLength2 * armLength2 + armLength3 * armLength3 - distance * distance) / 
                         (2 * armLength2 * armLength3);
        const clampedCosElbow = Math.max(-0.99, Math.min(0.99, cosElbow));
        targetAngle3 = Math.PI - Math.acos(clampedCosElbow);
        
        // Calculate shoulder angle
        const cosShoulderToElbow = (armLength2 * armLength2 + distance * distance - armLength3 * armLength3) / 
                                  (2 * armLength2 * distance);
        const clampedCosShoulderToElbow = Math.max(-0.99, Math.min(0.99, cosShoulderToElbow));
        const shoulderToElbow = Math.acos(clampedCosShoulderToElbow);
        const shoulderToTarget = Math.atan2(height, distXZ);
        targetAngle2 = shoulderToTarget - shoulderToElbow;
        
        // Calculate wrist pitch angle to keep end effector level
        targetAngle4 = -targetAngle2 - targetAngle3;
        
        // Add a slight wobble to the movement for weight simulation
        const liftProgress = Math.min(1, animationProgress * 2);
        const wobble = Math.sin(liftProgress * Math.PI * 4) * 0.02 * (1 - liftProgress);
        targetAngle2 += wobble;
        targetAngle3 -= wobble * 0.7;
        targetAngle4 += wobble * 0.3;
        
        // Acceleration at start of lift
        const liftEase = liftProgress < 0.3 ? 
                        0.05 + 0.1 * (liftProgress / 0.3) : 
                        0.15 - 0.1 * ((liftProgress - 0.3) / 0.7);
        
        // Smoothly interpolate current angles to target angles
        angle1 = angle1 + (targetAngle1 - angle1) * liftEase;
        angle2 = angle2 + (targetAngle2 - angle2) * liftEase;
        angle3 = angle3 + (targetAngle3 - angle3) * liftEase;
        angle4 = angle4 + (targetAngle4 - angle4) * liftEase;
        angle5 = angle5 + (targetAngle5 - angle5) * liftEase;
        angle6 = angle6 + (targetAngle6 - angle6) * liftEase;
        angle7 = angle7 + (targetAngle7 - angle7) * liftEase;
        
        // Increment animation progress
        animationProgress += animationSpeed;
        
        // Check if we've reached the position above the object
        const endEffectorPos = getEndEffectorPosition();
        const distanceToTarget = endEffectorPos.distanceTo(targetPos);
        
        if (distanceToTarget < pickupDistance || animationProgress > 2) {
          state = "moving";
          animationProgress = 0;
          console.log("State changed to moving");
          
          // Determine the appropriate drop location based on the box color
          if (currentTarget.userData.isRed) {
            // Red box goes to red drop location
            objectDropPos.copy(redDropLocation.position);
          } else {
            // Blue box goes to blue drop location
            objectDropPos.copy(blueDropLocation.position);
          }
          
          // If user has moved the custom drop location, use that instead
          if (userDropLocation.userData.isActive) {
            objectDropPos.copy(userDropLocation.position);
            userDropLocation.userData.isActive = false; // Reset after use
          }
        }
      } else if (state === "moving") {
        // Move to the drop location with a natural arc motion
        targetPos = objectDropPos.clone();
        
        // Add an arc to the movement path
        const moveProgress = Math.min(1, animationProgress);
        const arcHeight = 0.4 * Math.sin(moveProgress * Math.PI);
        targetPos.y += 0.3 + arcHeight;
        
        // Calculate target position relative to the robot base
        const relativePos = targetPos.clone().sub(baseGroup.position);
        
        // Calculate horizontal distance and height
        const distXZ = Math.sqrt(relativePos.x * relativePos.x + relativePos.z * relativePos.z);
        const height = relativePos.y - armLength1;
        
        // Calculate distance from shoulder to target
        const distance = Math.sqrt(distXZ * distXZ + height * height);
        
        // Check if distance is within reachable range
        const maxReach = armLength2 + armLength3;
        if (distance > maxReach * 0.95) {
          console.log("Drop location too far to reach, distance:", distance, "max reach:", maxReach);
          // Move the drop location closer if it's too far
          const direction = new THREE.Vector3(relativePos.x, 0, relativePos.z).normalize();
          objectDropPos.x = baseGroup.position.x + direction.x * maxReach * 0.8;
          objectDropPos.z = baseGroup.position.z + direction.z * maxReach * 0.8;
          return;
        }
        
        // Calculate target angles using inverse kinematics
        targetAngle1 = Math.atan2(relativePos.x, relativePos.z);
        
        // Calculate elbow angle using law of cosines
        const cosElbow = (armLength2 * armLength2 + armLength3 * armLength3 - distance * distance) / 
                         (2 * armLength2 * armLength3);
        const clampedCosElbow = Math.max(-0.99, Math.min(0.99, cosElbow));
        targetAngle3 = Math.PI - Math.acos(clampedCosElbow);
        
        // Calculate shoulder angle
        const cosShoulderToElbow = (armLength2 * armLength2 + distance * distance - armLength3 * armLength3) / 
                                  (2 * armLength2 * distance);
        const clampedCosShoulderToElbow = Math.max(-0.99, Math.min(0.99, cosShoulderToElbow));
        const shoulderToElbow = Math.acos(clampedCosShoulderToElbow);
        const shoulderToTarget = Math.atan2(height, distXZ);
        targetAngle2 = shoulderToTarget - shoulderToElbow;
        
        // Calculate wrist pitch angle to keep end effector level
        targetAngle4 = -targetAngle2 - targetAngle3;
        
        // Add natural movement patterns during transport
        // Simulate weight and momentum with subtle oscillations
        const weightWobble = Math.sin(moveProgress * Math.PI * 6) * 0.02 * (1 - moveProgress);
        targetAngle2 += weightWobble;
        targetAngle3 -= weightWobble * 0.7;
        targetAngle4 += weightWobble * 0.3;
        
        // Add wrist movements to make the transport look more natural
        targetAngle5 = Math.sin(moveProgress * Math.PI * 2) * 0.1;
        targetAngle6 = Math.atan2(relativePos.x, relativePos.z) * 0.3;
        targetAngle7 = Math.sin(moveProgress * Math.PI * 3) * 0.05;
        
        // Variable speed based on movement phase (ease in/out)
        let movementEase;
        if (moveProgress < 0.2) {
          // Acceleration phase
          movementEase = 0.03 + (moveProgress / 0.2) * 0.07;
        } else if (moveProgress > 0.8) {
          // Deceleration phase
          movementEase = 0.1 - ((moveProgress - 0.8) / 0.2) * 0.07;
        } else {
          // Constant speed phase
          movementEase = 0.1;
        }
        
        // Smoothly interpolate current angles to target angles
        angle1 = angle1 + (targetAngle1 - angle1) * movementEase;
        angle2 = angle2 + (targetAngle2 - angle2) * movementEase;
        angle3 = angle3 + (targetAngle3 - angle3) * movementEase;
        angle4 = angle4 + (targetAngle4 - angle4) * movementEase;
        angle5 = angle5 + (targetAngle5 - angle5) * movementEase;
        angle6 = angle6 + (targetAngle6 - angle6) * movementEase;
        angle7 = angle7 + (targetAngle7 - angle7) * movementEase;
        
        // Increment animation progress
        animationProgress += animationSpeed * (0.7 + 0.6 * Math.sin(Math.PI * moveProgress));
        
        // Check if we've reached the position above the drop location
        const endEffectorPos = getEndEffectorPosition();
        const distanceToTarget = endEffectorPos.distanceTo(targetPos);
        
        if (distanceToTarget < pickupDistance || animationProgress > 3) {
          state = "dropping";
          animationProgress = 0;
          console.log("State changed to dropping");
        }
      } else if (state === "dropping") {
        // Lower the object to the drop location
        targetPos = objectDropPos.clone();
        
        // Add a slight approach angle for more natural movement
        const dropProgress = Math.min(1, animationProgress * 2);
        const dropOffset = 0.1 * (1 - dropProgress);
        targetPos.y += dropOffset;
        
        // Calculate target position relative to the robot base
        const relativePos = targetPos.clone().sub(baseGroup.position);
        
        // Calculate horizontal distance and height
        const distXZ = Math.sqrt(relativePos.x * relativePos.x + relativePos.z * relativePos.z);
        const height = relativePos.y - armLength1;
        
        // Calculate distance from shoulder to target
        const distance = Math.sqrt(distXZ * distXZ + height * height);
        
        // Calculate target angles using inverse kinematics
        targetAngle1 = Math.atan2(relativePos.x, relativePos.z);
        
        // Calculate elbow angle using law of cosines
        const cosElbow = (armLength2 * armLength2 + armLength3 * armLength3 - distance * distance) / 
                         (2 * armLength2 * armLength3);
        const clampedCosElbow = Math.max(-0.99, Math.min(0.99, cosElbow));
        targetAngle3 = Math.PI - Math.acos(clampedCosElbow);
        
        // Calculate shoulder angle
        const cosShoulderToElbow = (armLength2 * armLength2 + distance * distance - armLength3 * armLength3) / 
                                  (2 * armLength2 * distance);
        const clampedCosShoulderToElbow = Math.max(-0.99, Math.min(0.99, cosShoulderToElbow));
        const shoulderToElbow = Math.acos(clampedCosShoulderToElbow);
        const shoulderToTarget = Math.atan2(height, distXZ);
        targetAngle2 = shoulderToTarget - shoulderToElbow;
        
        // Calculate wrist pitch angle to keep end effector level
        targetAngle4 = -targetAngle2 - targetAngle3;
        
        // Add precision movements as we get closer to the target
        const precisionFactor = Math.min(1, dropProgress * 3);
        if (precisionFactor > 0.8) {
          // Slight adjustments for precise placement
          const microAdjust = Math.sin(precisionFactor * Math.PI * 10) * 0.005 * (1 - (precisionFactor - 0.8) / 0.2);
          targetAngle2 += microAdjust;
          targetAngle3 -= microAdjust * 0.5;
          targetAngle4 += microAdjust * 0.5;
        }
        
        // Slow down as we get closer to the drop point
        const slowdownFactor = 0.03 + 0.02 * (1 - Math.min(1, dropProgress));
        
        // Smoothly interpolate current angles to target angles
        angle1 = angle1 + (targetAngle1 - angle1) * slowdownFactor;
        angle2 = angle2 + (targetAngle2 - angle2) * slowdownFactor;
        angle3 = angle3 + (targetAngle3 - angle3) * slowdownFactor;
        angle4 = angle4 + (targetAngle4 - angle4) * slowdownFactor;
        angle5 = angle5 + (targetAngle5 - angle5) * slowdownFactor;
        angle6 = angle6 + (targetAngle6 - angle6) * slowdownFactor;
        angle7 = angle7 + (targetAngle7 - angle7) * slowdownFactor;
        
        // Increment animation progress
        animationProgress += animationSpeed * 0.6;
        
        // Check if we've reached the drop location
        const endEffectorPos = getEndEffectorPosition();
        const distanceToTarget = endEffectorPos.distanceTo(targetPos);
        
        if (distanceToTarget < pickupDistance || animationProgress > 2) {
          state = "releasing";
          animationProgress = 0;
          console.log("State changed to releasing");
        }
      } else if (state === "releasing") {
        // Open the gripper
        animationProgress = Math.min(animationProgress + animationSpeed * 0.8, 1);
        
        // Add a slight upward movement as the gripper opens
        const releaseAdjustment = Math.sin(animationProgress * Math.PI) * 0.01;
        targetAngle2 -= releaseAdjustment;
        targetAngle3 += releaseAdjustment;
        targetAngle4 -= releaseAdjustment;
        
        // Smoothly interpolate current angles to target angles
        angle1 = angle1 + (targetAngle1 - angle1) * 0.1;
        angle2 = angle2 + (targetAngle2 - angle2) * 0.1;
        angle3 = angle3 + (targetAngle3 - angle3) * 0.1;
        angle4 = angle4 + (targetAngle4 - angle4) * 0.1;
        angle5 = angle5 + (targetAngle5 - angle5) * 0.1;
        angle6 = angle6 + (targetAngle6 - angle6) * 0.1;
        angle7 = angle7 + (targetAngle7 - angle7) * 0.1;
        
        // After a short delay, release the object
        if (animationProgress >= 1) {
          objectGrabbed = false;
          
          // Fix: Ensure the object stays at the drop position
          currentTarget.position.copy(objectDropPos);
          // Ensure the box is properly aligned with the ground
          currentTarget.rotation.set(0, currentTarget.rotation.y, 0);
          currentTarget.position.y = baseGroup.position.y + 0.15; // Half height of box
          currentTarget.userData.isGrabbed = false;
          
          state = "returning";
          animationProgress = 0;
          console.log("State changed to returning, object released");
          
          // Add a slight "settling" effect when the object is released
          targetAngle2 += 0.02;
          targetAngle3 -= 0.03;
          targetAngle4 += 0.01;
        }
      } else if (state === "returning") {
        // Move back to idle position
        targetAngle1 = 0;
        targetAngle2 = -Math.PI/2;
        targetAngle3 = Math.PI/4;
        targetAngle4 = Math.PI/4;
        targetAngle5 = 0;
        targetAngle6 = 0;
        targetAngle7 = 0;
        
        // Add natural return motion with slight overshoot
        const returnProgress = Math.min(1, animationProgress * 1.5);
        const overshoot = Math.sin(returnProgress * Math.PI) * 0.05 * (1 - returnProgress);
        
        // Apply overshoot to different joints
        targetAngle2 += overshoot;
        targetAngle3 -= overshoot * 0.7;
        targetAngle4 += overshoot * 0.3;
        
        // Variable speed for return (faster at start, slower at end)
        const returnEase = 0.05 + 0.1 * (1 - Math.min(1, returnProgress));
        
        // Smoothly interpolate current angles to target angles
        angle1 = angle1 + (targetAngle1 - angle1) * returnEase;
        angle2 = angle2 + (targetAngle2 - angle2) * returnEase;
        angle3 = angle3 + (targetAngle3 - angle3) * returnEase;
        angle4 = angle4 + (targetAngle4 - angle4) * returnEase;
        angle5 = angle5 + (targetAngle5 - angle5) * returnEase;
        angle6 = angle6 + (targetAngle6 - angle6) * returnEase;
        angle7 = angle7 + (targetAngle7 - angle7) * returnEase;
        
        // Increment animation progress
        animationProgress += animationSpeed;
        
        // Check if we've returned to idle position
        const angleThreshold = 0.05;
        const isNearTarget = 
          Math.abs(angle1 - targetAngle1) < angleThreshold &&
          Math.abs(angle2 - targetAngle2) < angleThreshold &&
          Math.abs(angle3 - targetAngle3) < angleThreshold &&
          Math.abs(angle4 - targetAngle4) < angleThreshold;
        
        if (isNearTarget || animationProgress > 3) {
          state = "idle";
          animationProgress = 0;
          currentTarget = null;
          console.log("State changed to idle");
        }
      } else if (state === "paused") {
        // Do nothing while paused - user is dragging the object
        // The arm will maintain its current position
      }
    };
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update controls
      controls.update();
      
      // Update the animation state
      updateAnimation(Date.now());
      
      // Update robot arm
      updateRobotArm();
      
      // Update object position if it's grabbed by the gripper
      if (objectGrabbed && currentTarget) {
        const endEffectorPos = getEndEffectorPosition();
        currentTarget.position.copy(endEffectorPos);
        
        // Apply slight rotation to the box based on arm movement
        currentTarget.rotation.y = angle1 * 0.5;
      }
      
      // Make debug text always face the camera
      debugText.lookAt(camera.position);
      
      // Animate the drop locations with a subtle pulsing effect
      const time = Date.now() * 0.001;
      blueDropLocation.scale.set(
        1.0 + 0.05 * Math.sin(time * 2),
        1.0,
        1.0 + 0.05 * Math.sin(time * 2)
      );
      redDropLocation.scale.set(
        1.0 + 0.05 * Math.sin(time * 2 + Math.PI),
        1.0,
        1.0 + 0.05 * Math.sin(time * 2 + Math.PI)
      );
      userDropLocation.scale.set(
        1.0 + 0.05 * Math.sin(time * 2 + Math.PI/2),
        1.0,
        1.0 + 0.05 * Math.sin(time * 2 + Math.PI/2)
      );
      
      // Render the scene
      renderer.render(scene, camera);
    };
    
    // Start animation loop
    animate();
    
    // Handle window resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up function for when component unmounts
    return () => {
      console.log("Cleaning up Three.js resources");
      
      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseup', onMouseUp);
      
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchmove', onTouchMove);
      renderer.domElement.removeEventListener('touchend', onTouchEnd);
      
      // Dispose of Three.js resources
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
      controls.dispose();
    };
  }, []); 

  return <div id="robotic-arm" ref={mountRef} style={{ 
    width: '100%', 
    height: '58vh',
    position: 'relative',
    marginTop: '0px',
    marginBottom: '17px',
    zIndex: 0,
    pointerEvents: 'auto'
  }} />;
};

export default RoboticArm;

