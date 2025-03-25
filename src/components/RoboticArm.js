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
    
    // Object positions - moved much further away from the arm
    const objectStartPos = new THREE.Vector3(2.5, -1, 0); // Moved from 1.5 to 2.5
    const objectDropPos = new THREE.Vector3(-2.5, -1, 0); // Moved from -1.5 to -2.5
    let objectPos = objectStartPos.clone();
    let targetPos = new THREE.Vector3();
    
    // Distance threshold for picking up the object
    const pickupDistance = 0.2;
    
    // Define constraints for the box movement
    const minDistance = 0.8; // Minimum distance from the center of the base
    const maxDistance = 3.0; // Maximum distance - increased from 2.0 to allow for further positions
    
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
      position.y = -1;
      
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
      
      finger.position.x = isLeft ? -0.07 : 0.07;
      finger.position.z = 0;
      
      return finger;
    };
    
    const leftFinger = createGripperFinger(true);
    const rightFinger = createGripperFinger(false);
    gripper.add(leftFinger);
    gripper.add(rightFinger);
    
    // Create object to grab - adjusted position
    const objectGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const objectMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x40ffda,
      specular: 0xffffff,
      shininess: 30,
      transparent: false,
      opacity: 1.0
    });
    const object = new THREE.Mesh(objectGeometry, objectMaterial);
    object.position.copy(objectStartPos);
    // Position exactly at the base level
    object.position.y = baseGroup.position.y + 0.15; // Add half the height of the box to sit on the ground
    object.castShadow = true;
    scene.add(object);
    
    // Create drop location indicator - adjusted position
    const dropLocationGeometry = new THREE.RingGeometry(0.2, 0.22, 32);
    const dropLocationMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x40ffda,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    const dropLocation = new THREE.Mesh(dropLocationGeometry, dropLocationMaterial);
    dropLocation.rotation.x = -Math.PI / 2;
    dropLocation.position.copy(objectDropPos);
    // Position exactly at the base level
    dropLocation.position.y = baseGroup.position.y + 0.01; // Just slightly above the ground
    scene.add(dropLocation);
    
    // Add a highlight effect when hovering over the object
    const highlightObject = () => {
      objectMaterial.emissive.set(0x40ffda);
      objectMaterial.emissiveIntensity = 0.3;
      renderer.domElement.style.cursor = 'grab';
    };

    const unhighlightObject = () => {
      objectMaterial.emissive.set(0x000000);
      objectMaterial.emissiveIntensity = 0;
      renderer.domElement.style.cursor = 'auto';
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
      const intersects = raycaster.intersectObject(object);
      
      if (intersects.length > 0) {
        console.log("Object clicked!");
        isDragging = true;
        selectedObject = object;
        
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
        if (state !== "idle") {
          state = "paused";
          console.log("State changed to paused");
        }
      }
    };

    // Handle mouse move event
    const onMouseMove = (event) => {
      updateMousePosition(event);
      
      // Check for hover effect when not dragging
      if (!isDragging) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(object);
        
        if (intersects.length > 0) {
          highlightObject();
        } else {
          unhighlightObject();
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
          constrainObjectPosition(selectedObject.position);
          
          // Update the objectPos variable to match the new position
          objectPos.copy(selectedObject.position);
        }
      }
    };

    // Handle mouse up event
    const onMouseUp = (event) => {
      if (isDragging) {
        console.log("Mouse up - stopped dragging");
        isDragging = false;
        selectedObject = null;
        
        // Re-enable orbit controls
        controls.enabled = true;
        
        // Reset cursor style
        renderer.domElement.style.cursor = 'auto';
        
        // Start the arm animation to pick up the object
        state = "approaching";
        animationProgress = 0;
        console.log("State changed to approaching");
      }
    };

    // Add event listeners directly to the renderer's DOM element
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseup', onMouseUp); // Handle mouse up outside the canvas

    // Add touch support for mobile devices
    const onTouchStart = (event) => {
      event.preventDefault();
      const touch = event.touches[0];
      const simulatedEvent = {
        clientX: touch.clientX,
        clientY: touch.clientY
      };
      onMouseDown(simulatedEvent);
    };

    const onTouchMove = (event) => {
      event.preventDefault();
      const touch = event.touches[0];
      const simulatedEvent = {
        clientX: touch.clientX,
        clientY: touch.clientY
      };
      onMouseMove(simulatedEvent);
    };

    const onTouchEnd = (event) => {
      event.preventDefault();
      onMouseUp();
    };

    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false });
    renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false });
    renderer.domElement.addEventListener('touchend', onTouchEnd, { passive: false });

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

    // Add a debug message - positioned higher with larger text
    const debugText = addDebugText("Drag the box to move it", new THREE.Vector3(0, 2.5, 0)); // Raised from 2.0 to 2.5
    debugText.lookAt(camera.position);
    
    // Update robot arm function with 5 DOF
    const updateRobotArm = () => {
      // Update joint rotations
      shoulder.rotation.y = angle1;
      upperArm.rotation.x = angle2;
      elbow.rotation.x = angle3;
      wristPitch.rotation.x = angle4;
      wristRoll.rotation.z = angle5;
      wristYaw.rotation.y = angle6; // New joint rotation
      hand.rotation.z = angle7;
      
      // Update gripper based on whether object is grabbed
      const gripperOpenWidth = 0.12;
      const gripperClosedWidth = 0.04;
      const gripperWidth = objectGrabbed ? gripperClosedWidth : gripperOpenWidth;
      
      leftFinger.position.x = -gripperWidth;
      rightFinger.position.x = gripperWidth;
      
      // Update object position if grabbed
      if (objectGrabbed) {
        // Calculate the position of the gripper in world space
        const gripperWorldPos = new THREE.Vector3();
        gripper.getWorldPosition(gripperWorldPos);
        
        // Update the object position to match the gripper
        object.position.copy(gripperWorldPos);
        objectPos.copy(gripperWorldPos);
      }
    };
    
    // Calculate end effector position
    const getEndEffectorPosition = () => {
      const position = new THREE.Vector3();
      gripper.getWorldPosition(position);
      return position;
    };
    
    // Animation update function with improved state transitions
    const updateAnimation = (time) => {
      if (state === "idle") {
        // Idle position with subtle movement - vertical swan neck posture with 45-degree bends
        angle1 = 0.03 * Math.sin(time * 0.0008);
        angle2 = -Math.PI/2 + 0.02 * Math.sin(time * 0.001);  // Straight up from base
        angle3 = Math.PI/4 + 0.02 * Math.sin(time * 0.0012);  // 45-degree bend at elbow
        angle4 = Math.PI/4 + 0.01 * Math.sin(time * 0.0015);  // 45-degree bend at wrist
        angle5 = 0.01 * Math.sin(time * 0.002);
        angle6 = 0.01 * Math.sin(time * 0.0018);
        angle7 = 0.01 * Math.sin(time * 0.0025);
      } else if (state === "approaching") {
        // Move to a position slightly above the object
        targetPos = objectPos.clone();
        targetPos.y += 0.2; // Position above the object - reduced height
        
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
          // Move the object closer if it's too far
          const direction = new THREE.Vector3(relativePos.x, 0, relativePos.z).normalize();
          objectPos.x = baseGroup.position.x + direction.x * maxReach * 0.7;
          objectPos.z = baseGroup.position.z + direction.z * maxReach * 0.7;
          object.position.copy(objectPos);
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
        
        // Smoothly interpolate current angles to target angles
        angle1 = angle1 + (targetAngle1 - angle1) * 0.05;
        angle2 = angle2 + (targetAngle2 - angle2) * 0.05;
        angle3 = angle3 + (targetAngle3 - angle3) * 0.05;
        angle4 = angle4 + (targetAngle4 - angle4) * 0.05;
        angle5 = angle5 + (targetAngle5 - angle5) * 0.05;
        angle6 = angle6 + (targetAngle6 - angle6) * 0.05;
        angle7 = angle7 + (targetAngle7 - angle7) * 0.05;
        
        // Check if we've reached the position above the object
        const endEffectorPos = getEndEffectorPosition();
        const distanceToTarget = endEffectorPos.distanceTo(targetPos);
        
        if (distanceToTarget < pickupDistance) {
          state = "descending";
          animationProgress = 0;
          console.log("State changed to descending");
        }
      } else if (state === "descending") {
        // Move down to grab the object
        targetPos = objectPos.clone();
        
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
        
        // Smoothly interpolate current angles to target angles
        angle1 = angle1 + (targetAngle1 - angle1) * 0.05;
        angle2 = angle2 + (targetAngle2 - angle2) * 0.05;
        angle3 = angle3 + (targetAngle3 - angle3) * 0.05;
        angle4 = angle4 + (targetAngle4 - angle4) * 0.05;
        
        // Add wrist roll, yaw, and gripper rotation updates
        angle5 = angle5 + (targetAngle5 - angle5) * 0.05;
        angle6 = angle6 + (targetAngle6 - angle6) * 0.05;
        angle7 = angle7 + (targetAngle7 - angle7) * 0.05;
        
        // Check if we've reached the object
        const endEffectorPos = getEndEffectorPosition();
        const distanceToTarget = endEffectorPos.distanceTo(targetPos);
        console.log("Distance to object:", distanceToTarget);
        
        if (distanceToTarget < pickupDistance) {
          state = "grabbing";
          animationProgress = 0;
          console.log("State changed to grabbing");
        }
      } else if (state === "grabbing") {
        // Close the gripper
        animationProgress = Math.min(animationProgress + animationSpeed, 1);
        
        // After a short delay, grab the object
        if (animationProgress >= 1) {
          objectGrabbed = true;
          state = "lifting";
          animationProgress = 0;
          console.log("State changed to lifting, object grabbed:", objectGrabbed);
        }
      } else if (state === "lifting") {
        // Move up with the object
        targetPos = objectPos.clone();
        targetPos.y += 0.3; // Position above the object
        
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
        
        // Smoothly interpolate current angles to target angles
        angle1 = angle1 + (targetAngle1 - angle1) * 0.05;
        angle2 = angle2 + (targetAngle2 - angle2) * 0.05;
        angle3 = angle3 + (targetAngle3 - angle3) * 0.05;
        angle4 = angle4 + (targetAngle4 - angle4) * 0.05;
        
        // Add wrist roll, yaw, and gripper rotation updates
        angle5 = angle5 + (targetAngle5 - angle5) * 0.05;
        angle6 = angle6 + (targetAngle6 - angle6) * 0.05;
        angle7 = angle7 + (targetAngle7 - angle7) * 0.05;
        
        // Check if we've reached the position above the object
        const endEffectorPos = getEndEffectorPosition();
        const distanceToTarget = endEffectorPos.distanceTo(targetPos);
        
        if (distanceToTarget < pickupDistance) {
          state = "moving";
          animationProgress = 0;
          console.log("State changed to moving");
        }
      } else if (state === "moving") {
        // Move to the drop location
        targetPos = objectDropPos.clone();
        targetPos.y += 0.3; // Position above the drop location
        
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
          dropLocation.position.copy(objectDropPos);
          dropLocation.position.y = baseGroup.position.y + 0.01; // Adjust height for drop location
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
        
        // Smoothly interpolate current angles to target angles
        angle1 = angle1 + (targetAngle1 - angle1) * 0.05;
        angle2 = angle2 + (targetAngle2 - angle2) * 0.05;
        angle3 = angle3 + (targetAngle3 - angle3) * 0.05;
        angle4 = angle4 + (targetAngle4 - angle4) * 0.05;
        
        // Update wrist roll, yaw, and gripper rotation
        targetAngle5 = Math.sin(time * 0.001) * 0.1; // Subtle roll
        targetAngle6 = Math.atan2(relativePos.x, relativePos.z) * 0.5; // Orient toward drop location
        targetAngle7 = Math.sin(time * 0.002) * 0.1; // Subtle gripper rotation
        
        angle5 = angle5 + (targetAngle5 - angle5) * 0.05;
        angle6 = angle6 + (targetAngle6 - angle6) * 0.05;
        angle7 = angle7 + (targetAngle7 - angle7) * 0.05;
        
        // Check if we've reached the position above the drop location
        const endEffectorPos = getEndEffectorPosition();
        const distanceToTarget = endEffectorPos.distanceTo(targetPos);
        
        if (distanceToTarget < pickupDistance) {
          state = "dropping";
          animationProgress = 0;
          console.log("State changed to dropping");
        }
      } else if (state === "dropping") {
        // Lower the object to the drop location
        targetPos = objectDropPos.clone();
        
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
        
        // Smoothly interpolate current angles to target angles
        angle1 = angle1 + (targetAngle1 - angle1) * 0.05;
        angle2 = angle2 + (targetAngle2 - angle2) * 0.05;
        angle3 = angle3 + (targetAngle3 - angle3) * 0.05;
        angle4 = angle4 + (targetAngle4 - angle4) * 0.05;
        
        // Add wrist roll, yaw, and gripper rotation updates
        angle5 = angle5 + (targetAngle5 - angle5) * 0.05;
        angle6 = angle6 + (targetAngle6 - angle6) * 0.05;
        angle7 = angle7 + (targetAngle7 - angle7) * 0.05;
        
        // Check if we've reached the drop location
        const endEffectorPos = getEndEffectorPosition();
        const distanceToTarget = endEffectorPos.distanceTo(targetPos);
        
        if (distanceToTarget < pickupDistance) {
          state = "releasing";
          animationProgress = 0;
          console.log("State changed to releasing");
        }
      } else if (state === "releasing") {
        // Open the gripper
        animationProgress = Math.min(animationProgress + animationSpeed, 1);
        
        // After a short delay, release the object
        if (animationProgress >= 1) {
          objectGrabbed = false;
          
          // Fix: Ensure the object stays at the drop position
          object.position.copy(objectDropPos);
          objectPos.copy(objectDropPos);
          
          state = "returning";
          animationProgress = 0;
          console.log("State changed to returning, object released");
        }
      } else if (state === "returning") {
        // Move back to idle position - vertical swan neck posture with 45-degree bends
        targetAngle1 = 0;
        targetAngle2 = -Math.PI/2;  // Straight up from base
        targetAngle3 = Math.PI/4;   // 45-degree bend at elbow
        targetAngle4 = Math.PI/4;   // 45-degree bend at wrist
        targetAngle5 = 0; // Reset wrist roll
        targetAngle6 = 0; // Reset wrist yaw
        targetAngle7 = 0; // Reset gripper rotation
        
        // Smoothly interpolate current angles to target angles
        angle1 = angle1 + (targetAngle1 - angle1) * 0.05;
        angle2 = angle2 + (targetAngle2 - angle2) * 0.05;
        angle3 = angle3 + (targetAngle3 - angle3) * 0.05;
        angle4 = angle4 + (targetAngle4 - angle4) * 0.05;
        angle5 = angle5 + (targetAngle5 - angle5) * 0.05;
        angle6 = angle6 + (targetAngle6 - angle6) * 0.05;
        angle7 = angle7 + (targetAngle7 - angle7) * 0.05;
        
        // Check if we've reached the idle position
        const angleDiff = Math.abs(angle1 - targetAngle1) + 
                          Math.abs(angle2 - targetAngle2) + 
                          Math.abs(angle3 - targetAngle3) + 
                          Math.abs(angle4 - targetAngle4) + 
                          Math.abs(angle5 - targetAngle5) + 
                          Math.abs(angle6 - targetAngle6) + 
                          Math.abs(angle7 - targetAngle7);
        
        if (angleDiff < 0.05) {
          state = "idle";
          animationProgress = 0;
          console.log("State changed to idle");
          
          // Reset the object position to the start position for the next interaction
          setTimeout(() => {
            object.position.copy(objectStartPos);
            objectPos.copy(objectStartPos);
          }, 1000); // Wait 1 second before resetting
        }
      }
    };
    
    // Animation loop - track the ID
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Update animations
      updateAnimation(performance.now());
      updateRobotArm();
      
      // Update controls only when not dragging
      if (!isDragging) {
        controls.update();
      }
      
      // Render scene
      renderer.render(scene, camera);
    };
    
    // Start animation
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
    
    // Cleanup function
    return () => {
      // Store the animation frame ID to cancel it properly
      cancelAnimationFrame(animationFrameId);
      
      // Remove event listeners
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchmove', onTouchMove);
      renderer.domElement.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      
      // Dispose of Three.js resources
      scene.traverse(object => {
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
      
      // Remove canvas
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
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

