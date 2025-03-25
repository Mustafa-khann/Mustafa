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
    
    // Define arm segment lengths with more realistic proportions
    const armLength1 = 0.4;  // Base to shoulder height
    const armLength2 = 0.8;  // Upper arm length
    const armLength3 = 0.7;  // Forearm length
    const armLength4 = 0.3;  // Wrist length
    const armLength5 = 0.2;  // Hand length
    
    // Scale factor for all components
    const scaleFactor = 1.5;  // Increase overall scale
    
    // Define joint limits (in radians) for more realistic constraints
    const jointLimits = {
      base: { min: -Math.PI, max: Math.PI },           // Base rotation (y-axis)
      shoulder: { min: -Math.PI/2, max: Math.PI/2 },   // Shoulder joint (x-axis)
      elbow: { min: 0, max: Math.PI },                 // Elbow joint (x-axis)
      wristPitch: { min: -Math.PI/2, max: Math.PI/2 }, // Wrist pitch (x-axis)
      wristRoll: { min: -Math.PI, max: Math.PI },      // Wrist roll (z-axis)
      wristYaw: { min: -Math.PI/2, max: Math.PI/2 },   // Wrist yaw (y-axis)
      gripper: { min: -Math.PI/4, max: Math.PI/4 }     // Gripper rotation (z-axis)
    };
    
    // Current joint angles
    let angle1 = 0;           // Base rotation (y-axis)
    let angle2 = -Math.PI/2;  // Shoulder joint (x-axis)
    let angle3 = Math.PI/4;   // Elbow joint (x-axis)
    let angle4 = Math.PI/4;   // Wrist pitch (x-axis)
    let angle5 = 0;           // Wrist roll (z-axis)
    let angle6 = 0;           // Wrist yaw (y-axis)
    let angle7 = 0;           // Gripper rotation (z-axis)
    
    // Target joint angles for IK
    let targetAngle1 = angle1;
    let targetAngle2 = angle2;
    let targetAngle3 = angle3;
    let targetAngle4 = angle4;
    let targetAngle5 = angle5;
    let targetAngle6 = angle6;
    let targetAngle7 = angle7;
    
    // Path planning variables
    let pathPoints = [];
    let currentPathIndex = 0;
    let pathProgress = 0;
    let pathSpeed = 0.05;
    
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
      
      // Constrain height to be at the table level - fixed to ensure objects stay on the surface
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
          
          // Apply constraints to keep the object within valid bounds and on the surface
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
          state = "planning_approach";
          console.log("State changed to planning_approach for object:", currentTarget);
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
      canvas.width = 1024; // Significantly increased canvas width
      canvas.height = 256; // Increased canvas height
      
      // Clear the canvas with a transparent background
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw text with better positioning
      context.fillStyle = '#40ffda'; // Aqua color to match website theme
      context.font = 'bold 48px Arial'; // Bold font for better visibility
      
      // Center the text horizontally
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width/2, canvas.height/2);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide // Visible from both sides
      });
      const geometry = new THREE.PlaneGeometry(5, 1.25); // Wider plane geometry
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      scene.add(mesh);
      
      return mesh;
    };

    // Add a debug message with shorter text that will definitely fit
    const debugText = addDebugText("It's not broken, it's just artistic.", new THREE.Vector3(0, 2.2, 0));
    debugText.lookAt(camera.position);
    
    // Implement forward kinematics to calculate end effector position from joint angles
    const forwardKinematics = (angles) => {
      const [a1, a2, a3, a4, a5, a6, a7] = angles;
      
      // Create transformation matrices for each joint
      const baseMatrix = new THREE.Matrix4().makeRotationY(a1);
      
      const shoulderPos = new THREE.Vector3(0, armLength1, 0);
      const shoulderMatrix = new THREE.Matrix4().makeTranslation(shoulderPos.x, shoulderPos.y, shoulderPos.z)
        .multiply(new THREE.Matrix4().makeRotationX(a2));
      
      const elbowPos = new THREE.Vector3(0, 0, armLength2);
      const elbowMatrix = new THREE.Matrix4().makeTranslation(elbowPos.x, elbowPos.y, elbowPos.z)
        .multiply(new THREE.Matrix4().makeRotationX(a3));
      
      const wristPos = new THREE.Vector3(0, 0, armLength3);
      const wristPitchMatrix = new THREE.Matrix4().makeTranslation(wristPos.x, wristPos.y, wristPos.z)
        .multiply(new THREE.Matrix4().makeRotationX(a4));
      
      const wristRollPos = new THREE.Vector3(0, 0, 0);
      const wristRollMatrix = new THREE.Matrix4().makeTranslation(wristRollPos.x, wristRollPos.y, wristRollPos.z)
        .multiply(new THREE.Matrix4().makeRotationZ(a5));
      
      const wristYawPos = new THREE.Vector3(0, 0, 0);
      const wristYawMatrix = new THREE.Matrix4().makeTranslation(wristYawPos.x, wristYawPos.y, wristYawPos.z)
        .multiply(new THREE.Matrix4().makeRotationY(a6));
      
      const handPos = new THREE.Vector3(0, 0, armLength4);
      const handMatrix = new THREE.Matrix4().makeTranslation(handPos.x, handPos.y, handPos.z)
        .multiply(new THREE.Matrix4().makeRotationZ(a7));
      
      const gripperPos = new THREE.Vector3(0, 0, armLength5);
      const gripperMatrix = new THREE.Matrix4().makeTranslation(gripperPos.x, gripperPos.y, gripperPos.z);
      
      // Combine all transformations
      const worldMatrix = new THREE.Matrix4()
        .multiply(baseMatrix)
        .multiply(shoulderMatrix)
        .multiply(elbowMatrix)
        .multiply(wristPitchMatrix)
        .multiply(wristRollMatrix)
        .multiply(wristYawMatrix)
        .multiply(handMatrix)
        .multiply(gripperMatrix);
      
      // Extract the position from the world matrix
      const position = new THREE.Vector3();
      position.setFromMatrixPosition(worldMatrix);
      
      return position;
    };

    // Implement inverse kinematics using the Jacobian transpose method
    const inverseKinematics = (targetPosition, currentAngles) => {
      const maxIterations = 100;
      const epsilon = 0.01;
      let angles = [...currentAngles];
      
      for (let i = 0; i < maxIterations; i++) {
        // Calculate current end effector position
        const currentPosition = forwardKinematics(angles);
        
        // Calculate error vector
        const error = new THREE.Vector3().subVectors(targetPosition, currentPosition);
        
        // If error is small enough, we're done
        if (error.length() < epsilon) {
          break;
        }
        
        // Calculate Jacobian matrix (approximation using finite differences)
        const jacobian = calculateJacobian(angles);
        
        // Calculate joint angle updates using Jacobian transpose
        const updates = applyJacobianTranspose(jacobian, error);
        
        // Update angles with damping factor
        const dampingFactor = 0.1;
        for (let j = 0; j < angles.length; j++) {
          angles[j] += updates[j] * dampingFactor;
          
          // Apply joint limits
          const jointName = ['base', 'shoulder', 'elbow', 'wristPitch', 'wristRoll', 'wristYaw', 'gripper'][j];
          const limits = jointLimits[jointName];
          angles[j] = Math.max(limits.min, Math.min(limits.max, angles[j]));
        }
      }
      
      return angles;
    };

    // Calculate Jacobian matrix using finite differences
    const calculateJacobian = (angles) => {
      const jacobian = [];
      const h = 0.0001; // Small delta for finite difference
      
      // Calculate current end effector position
      const currentPosition = forwardKinematics(angles);
      
      // For each joint angle, calculate partial derivatives
      for (let i = 0; i < angles.length; i++) {
        const tempAngles = [...angles];
        tempAngles[i] += h;
        
        // Calculate new position after small change in angle
        const newPosition = forwardKinematics(tempAngles);
        
        // Calculate partial derivatives (dx/dθ, dy/dθ, dz/dθ)
        const dx = (newPosition.x - currentPosition.x) / h;
        const dy = (newPosition.y - currentPosition.y) / h;
        const dz = (newPosition.z - currentPosition.z) / h;
        
        jacobian.push([dx, dy, dz]);
      }
      
      return jacobian;
    };

    // Apply Jacobian transpose method to calculate joint updates
    const applyJacobianTranspose = (jacobian, error) => {
      const updates = new Array(jacobian.length).fill(0);
      
      // Multiply Jacobian transpose by error vector
      for (let i = 0; i < jacobian.length; i++) {
        updates[i] = jacobian[i][0] * error.x + jacobian[i][1] * error.y + jacobian[i][2] * error.z;
      }
      
      return updates;
    };

    // Path planning using cubic spline interpolation
    const planPath = (startPos, endPos, numPoints = 20) => {
      const path = [];
      
      // Create a smooth arc path between start and end positions
      const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
      
      // Add height to the midpoint to create an arc
      midPoint.y += 0.5;
      
      // Generate points along the path using cubic spline interpolation
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        
        // Cubic interpolation parameters
        const t2 = t * t;
        const t3 = t2 * t;
        const mt = 1 - t;
        const mt2 = mt * mt;
        const mt3 = mt2 * mt;
        
        // Cubic spline formula with control points
        const point = new THREE.Vector3();
        point.x = startPos.x * mt3 + 3 * midPoint.x * mt2 * t + 3 * midPoint.x * mt * t2 + endPos.x * t3;
        point.y = startPos.y * mt3 + 3 * midPoint.y * mt2 * t + 3 * midPoint.y * mt * t2 + endPos.y * t3;
        point.z = startPos.z * mt3 + 3 * midPoint.z * mt2 * t + 3 * midPoint.z * mt * t2 + endPos.z * t3;
        
        path.push(point);
      }
      
      return path;
    };

    // Collision detection and avoidance
    const checkCollision = (position, obstacles) => {
      for (const obstacle of obstacles) {
        const distance = position.distanceTo(obstacle.position);
        if (distance < obstacle.radius) {
          return true; // Collision detected
        }
      }
      return false; // No collision
    };

    // Modify path to avoid obstacles
    const avoidObstacles = (path, obstacles) => {
      const modifiedPath = [];
      
      for (const point of path) {
        if (checkCollision(point, obstacles)) {
          // Find closest obstacle
          let closestObstacle = obstacles[0];
          let minDistance = point.distanceTo(closestObstacle.position);
          
          for (let i = 1; i < obstacles.length; i++) {
            const distance = point.distanceTo(obstacles[i].position);
            if (distance < minDistance) {
              minDistance = distance;
              closestObstacle = obstacles[i];
            }
          }
          
          // Calculate avoidance vector
          const avoidanceVector = new THREE.Vector3().subVectors(point, closestObstacle.position);
          avoidanceVector.normalize();
          
          // Move point away from obstacle
          const safePoint = new THREE.Vector3().addVectors(
            closestObstacle.position,
            avoidanceVector.multiplyScalar(closestObstacle.radius + 0.2)
          );
          
          modifiedPath.push(safePoint);
        } else {
          modifiedPath.push(point.clone());
        }
      }
      
      return modifiedPath;
    };

    // Smooth the path using Catmull-Rom spline
    const smoothPath = (path, numPoints = 50) => {
      if (path.length < 4) return path;
      
      const smoothedPath = [];
      const spline = new THREE.CatmullRomCurve3(path);
      
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const point = spline.getPoint(t);
        smoothedPath.push(point);
      }
      
      return smoothedPath;
    };

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

    // Follow path using IK
    const followPath = () => {
      if (pathPoints.length === 0 || currentPathIndex >= pathPoints.length) {
        return false;
      }
      
      // Get current target point
      const targetPoint = pathPoints[currentPathIndex];
      
      // Calculate current joint angles
      const currentAngles = [angle1, angle2, angle3, angle4, angle5, angle6, angle7];
      
      // Calculate new joint angles using IK
      const newAngles = inverseKinematics(targetPoint, currentAngles);
      
      // Interpolate between current and new angles
      const t = pathProgress;
      angle1 = currentAngles[0] + (newAngles[0] - currentAngles[0]) * t;
      angle2 = currentAngles[1] + (newAngles[1] - currentAngles[1]) * t;
      angle3 = currentAngles[2] + (newAngles[2] - currentAngles[2]) * t;
      angle4 = currentAngles[3] + (newAngles[3] - currentAngles[3]) * t;
      angle5 = currentAngles[4] + (newAngles[4] - currentAngles[4]) * t;
      angle6 = currentAngles[5] + (newAngles[5] - currentAngles[5]) * t;
      angle7 = currentAngles[6] + (newAngles[6] - currentAngles[6]) * t;
      
      // Update path progress
      pathProgress += pathSpeed;
      
      // Move to next point if we've reached the current one
      if (pathProgress >= 1) {
        currentPathIndex++;
        pathProgress = 0;
        
        // Return true if we've reached the end of the path
        return currentPathIndex >= pathPoints.length;
      }
      
      return false;
    };

    // Animation update function with improved state transitions
    const updateAnimation = (time) => {
      // Animate the target rings with pulsing effect
      const pulse = (Math.sin(time * 0.003) + 1) * 0.5;
      userDropLocationMaterial.opacity = 0.4 + pulse * 0.3;
      
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
          
          // If we found a box to pick up, start approaching it
          if (closestBox) {
            currentTarget = closestBox;
            state = "planning_approach";
            console.log("State changed to planning_approach for object:", currentTarget);
          }
        }
      } else if (state === "planning_approach") {
        // Plan a path to approach the object
        const endEffectorPos = getEndEffectorPosition();
        const approachPos = currentTarget.position.clone();
        approachPos.y += 0.3; // Position above the object
        
        // Generate path points
        pathPoints = planPath(endEffectorPos, approachPos, 30);
        
        // Avoid obstacles
        const obstacles = interactiveObjects
          .filter(obj => obj !== currentTarget)
          .map(obj => ({ position: obj.position, radius: 0.4 }));
        
        pathPoints = avoidObstacles(pathPoints, obstacles);
        
        // Smooth the path
        pathPoints = smoothPath(pathPoints);
        
        // Reset path following variables
        currentPathIndex = 0;
        pathProgress = 0;
        
        // Transition to following the path
        state = "approaching";
        console.log("Path planned with", pathPoints.length, "points");
      } else if (state === "approaching") {
        // Follow the planned path
        const pathComplete = followPath();
        
        if (pathComplete) {
          // Plan path to grab the object
          const endEffectorPos = getEndEffectorPosition();
          const grabPos = currentTarget.position.clone();
          
          // Generate path points for final approach
          pathPoints = planPath(endEffectorPos, grabPos, 10);
          
          // Reset path following variables
          currentPathIndex = 0;
          pathProgress = 0;
          
          // Transition to grabbing
          state = "grabbing";
          console.log("State changed to grabbing");
        }
      } else if (state === "grabbing") {
        // Follow the path to grab the object
        const pathComplete = followPath();
        
        if (pathComplete) {
          // Grab the object
          objectGrabbed = true;
          currentTarget.userData.isGrabbed = true;
          
          // Plan path to lift the object
          const endEffectorPos = getEndEffectorPosition();
          const liftPos = endEffectorPos.clone();
          liftPos.y += 0.3; // Lift up
          
          // Generate path points for lifting
          pathPoints = planPath(endEffectorPos, liftPos, 10);
          
          // Reset path following variables
          currentPathIndex = 0;
          pathProgress = 0;
          
          // Transition to lifting
          state = "lifting";
          console.log("State changed to lifting, object grabbed");
        }
      } else if (state === "lifting") {
        // Follow the path to lift the object
        const pathComplete = followPath();
        
        if (pathComplete) {
          // Determine the appropriate drop location based on the box color
          let dropPos;
          if (currentTarget.userData.isRed) {
            // Red box goes to red drop location
            dropPos = redDropLocation.position.clone();
          } else {
            // Blue box goes to blue drop location
            dropPos = blueDropLocation.position.clone();
          }
          
          // If user has moved the custom drop location, use that instead
          if (userDropLocation.userData.isActive) {
            dropPos = userDropLocation.position.clone();
            userDropLocation.userData.isActive = false; // Reset after use
          }
          
          // Add height for approach
          dropPos.y += 0.3;
          
          // Plan path to the drop location
          const endEffectorPos = getEndEffectorPosition();
          
          // Generate path points for moving to drop location
          pathPoints = planPath(endEffectorPos, dropPos, 30);
          
          // Avoid obstacles
          const obstacles = interactiveObjects
            .filter(obj => obj !== currentTarget)
            .map(obj => ({ position: obj.position, radius: 0.4 }));
          
          pathPoints = avoidObstacles(pathPoints, obstacles);
          
          // Smooth the path
          pathPoints = smoothPath(pathPoints);
          
          // Reset path following variables
          currentPathIndex = 0;
          pathProgress = 0;
          
          // Transition to moving
          state = "moving";
          console.log("State changed to moving");
        }
      } else if (state === "moving") {
        // Follow the path to the drop location
        const pathComplete = followPath();
        
        if (pathComplete) {
          // Plan path to lower the object
          const endEffectorPos = getEndEffectorPosition();
          const lowerPos = endEffectorPos.clone();
          lowerPos.y -= 0.3; // Lower down
          
          // Generate path points for lowering
          pathPoints = planPath(endEffectorPos, lowerPos, 10);
          
          // Reset path following variables
          currentPathIndex = 0;
          pathProgress = 0;
          
          // Transition to dropping
          state = "dropping";
          console.log("State changed to dropping");
        }
      } else if (state === "dropping") {
        // Follow the path to lower the object
        const pathComplete = followPath();
        
        if (pathComplete) {
          // Release the object
          objectGrabbed = false;
          currentTarget.userData.isGrabbed = false;
          
          // Plan path to move away from the object
          const endEffectorPos = getEndEffectorPosition();
          const retreatPos = endEffectorPos.clone();
          retreatPos.y += 0.3; // Move up
          
          // Generate path points for retreating
          pathPoints = planPath(endEffectorPos, retreatPos, 10);
          
          // Reset path following variables
          currentPathIndex = 0;
          pathProgress = 0;
          
          // Transition to retreating
          state = "retreating";
          console.log("State changed to retreating, object released");
        }
      } else if (state === "retreating") {
        // Follow the path to move away from the object
        const pathComplete = followPath();
        
        if (pathComplete) {
          // Plan path to return to idle position
          const endEffectorPos = getEndEffectorPosition();
          const idlePos = new THREE.Vector3(0, armLength1 + armLength2 * 0.7, armLength3 * 0.7);
          
          // Generate path points for returning to idle
          pathPoints = planPath(endEffectorPos, idlePos, 20);
          
          // Avoid obstacles
          const obstacles = interactiveObjects.map(obj => ({ 
            position: obj.position, 
            radius: 0.4 
          }));
          
          pathPoints = avoidObstacles(pathPoints, obstacles);
          
          // Smooth the path
          pathPoints = smoothPath(pathPoints);
          
          // Reset path following variables
          currentPathIndex = 0;
          pathProgress = 0;
          
          // Transition to returning
          state = "returning";
          console.log("State changed to returning");
        }
      } else if (state === "returning") {
        // Follow the path to return to idle position
        const pathComplete = followPath();
        
        if (pathComplete) {
          // Reset to idle state
          state = "idle";
          currentTarget = null;
          console.log("State changed to idle");
        }
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

