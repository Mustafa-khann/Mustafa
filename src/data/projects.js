export const projectDetails = [
    {
      id: 1,
      title: "HermesX - Autonomous Drone for Package Delivery",
      date: "May 2023",
      techStack: "Pixhawk, ROS, Python, C++, React Native",
      abstract: "Learn how to build a fully functional autonomous drone prototype that delivers packages to a specific GPS location via a mobile app.",
      image: "/assets/drone-1080.jpg",
      link: "",
      content: `
        <h2>Project Guide: Autonomous Delivery Drone (Conceptual)</h2>

        <h3>Project Overview</h3>
        <p>This guide outlines the conceptual process for building a functional prototype of an autonomous drone capable of delivering small packages. The core challenge lies in integrating hardware components like a flight controller (e.g., Pixhawk) and sensors with software systems like the Robot Operating System (ROS) for navigation and mission execution, controlled via a mobile interface.</p>
        
        <h3>Conceptual Materials & Components</h3>
        <p>A project like this conceptually requires a flight controller, a drone frame, propulsion system (motors, ESCs, propellers), power source (battery), navigation sensors (GPS, compass, IMU), a companion computer (like Raspberry Pi) for running ROS and higher-level logic, telemetry for communication, and a mechanism for package release (e.g., servo-based).</p>
        
        <h3>Phase 1: Physical Assembly Concepts</h3>
        <p>This phase involves the mechanical construction of the drone. Key considerations include selecting an appropriate frame size for payload and stability, securely mounting motors and ESCs, placing the flight controller centrally with vibration dampening, ensuring the GPS module is positioned for optimal signal reception (away from interference), and integrating the companion computer and package release mechanism.</p>
        
        <h3>Phase 2: Software Environment Setup</h3>
        <p>Setting up the software stack is crucial. This conceptually involves flashing appropriate firmware (like PX4 or ArduPilot) to the flight controller, configuring basic parameters (like airframe type, sensor calibration) using ground control software (e.g., QGroundControl), installing an operating system (like Ubuntu) and ROS on the companion computer, and establishing communication between ROS and the flight controller (e.g., using MAVROS).</p>
        
        <h3>Phase 3: Autonomous Navigation Logic</h3>
        <p>Developing the core autonomy involves creating ROS nodes to manage the drone's state and behaviour. This includes implementing logic to handle communication with the flight controller for tasks like arming, setting flight modes (e.g., HOLD, MISSION), and executing takeoff/landing commands. A key component is the waypoint navigation system, which requires algorithms to translate desired GPS coordinates into flight controller commands, manage sequences of waypoints, and monitor mission progress. Implementing robust safety features (like return-to-launch on low battery or signal loss) is a critical theoretical aspect.</p>
  
        <h3>Phase 4: Mobile Control Interface Design</h3>
        <p>A user interface, potentially a mobile app (e.g., using React Native), is needed for mission planning. Conceptually, this involves designing an interface for users to select delivery coordinates on a map, send mission commands to the drone (likely via a backend server communicating with the drone's ROS system), and monitor the drone's status and position in real-time (using technologies like WebSockets for live updates).</p>
        
        <h3>Phase 5: Package Release Mechanism Integration</h3>
        <p>Integrating the package release requires both hardware and software considerations. A mechanism needs to be designed and attached to the drone, controllable via a servo connected to the flight controller. A ROS node must be developed to subscribe to mission status updates and trigger the servo actuation via flight controller commands when the drone reaches the target destination waypoint.</p>
        
        <h3>Phase 6: Testing and Calibration Strategy</h3>
        <p>A rigorous testing protocol is essential. This starts with thorough calibration of all sensors (IMU, compass) and the propulsion system (ESCs) via ground control software. Initial tests involve verifying motor directions and basic stability in manual flight modes in a safe environment. Autonomous capabilities are tested incrementally, starting with simple tasks like hovering and position holding, then progressing to waypoint navigation in increasingly complex scenarios. Full system tests in open areas validate the entire mission workflow.</p>
        
        <h3>Conclusion & Future Directions</h3>
        <p>Building such a drone integrates concepts from embedded systems, robotics (control theory, navigation), software engineering, and potentially mobile development. Theoretical future improvements involve adding obstacle avoidance capabilities (requiring additional sensors like LIDAR or cameras and perception algorithms), refining path planning, enhancing the package mechanism, and improving overall system robustness and safety.</p>
      `
    },
    {
      id: 2,
      title: "Anky - 5 DoF Robotic Arm",
      date: "January 2023",
      techStack: "Arduino, C++, Servo Control, Inverse Kinematics",
      abstract: "A step-by-step guide to building a desktop-scale 3D printed 5-DoF robotic arm with precision control for pick-and-place operations.",
      image: "/assets/arm-1080.jpeg",
      link: "",
      content: `
        <h2>Project Guide: 5 DoF Robotic Arm (Conceptual)</h2>

        <h3>Introduction</h3>
        <p>This guide describes the concepts for constructing a desktop-scale 5 Degrees of Freedom (DoF) robotic arm, typically using 3D printed parts and controlled by a microcontroller like Arduino. The focus is on understanding the principles of kinematics for control and developing a user interface for operation.</p>
  
        <h3>Conceptual Materials & Tools</h3>
        <p>The core components include a microcontroller, servo motors (high torque for main joints, smaller for gripper), 3D printed structural parts, fasteners (bolts, nuts), bearings for joints, a suitable power supply capable of handling servo current draw, wiring, and potentially user interface elements like joysticks or LCD screens.</p>
  
        <h3>Phase 1: Component Design & Fabrication (3D Printing)</h3>
        <p>This phase involves designing or obtaining 3D models for the arm's links and joints (base, shoulder, elbow, wrist, gripper). Considerations include structural integrity, joint design allowing desired rotation ranges, incorporating mounts for servos and bearings, and planning channels for wire routing. Printing these parts requires attention to print settings (layer height, infill, supports) to balance strength and detail.</p>
        
        <h3>Phase 2: Mechanical Assembly</h3>
        <p>Assembly proceeds from the base upwards. Servos are mounted within their respective joints, links are connected, and bearings are installed to ensure smooth motion. Careful routing of servo wires through the structure is necessary to prevent pinching or restricted movement. Ensuring all joints move freely without excessive play is critical.</p>
  
        <h3>Phase 3: Electronics & Wiring</h3>
        <p>This involves connecting the servos to the appropriate control pins on the microcontroller. Power distribution is a key consideration; servos require significant current, often necessitating a separate, high-amperage power supply and careful wiring to avoid overloading the microcontroller. Connecting user interface components (joystick, LCD) to the microcontroller's analog/digital/I2C pins is also done here. Power filtering (e.g., using capacitors) may be needed to reduce electrical noise.</p>
  
        <h3>Phase 4: Kinematics Implementation (Conceptual)</h3>
        <p>This is the core software challenge. <strong>Forward Kinematics</strong> involves developing mathematical formulas (often based on arm segment lengths and joint angles) to calculate the 3D position and orientation of the end-effector given the angles of each joint. <strong>Inverse Kinematics (IK)</strong> is the inverse problem: calculating the required angles for each of the 5 joints to place the end-effector at a specific target position and orientation in space. This often involves trigonometry and geometric solutions specific to the arm's configuration. Implementing IK allows for more intuitive control (e.g., specifying target coordinates rather than individual joint angles).</p>
  
        <h3>Phase 5: Control Software & User Interface</h3>
        <p>The microcontroller software reads input from the user interface (e.g., joystick) and translates it into arm movements. Different control modes can be implemented: <strong>Joint Mode</strong> allows direct control of each servo angle, while <strong>Cartesian Mode</strong> uses the IK solution to move the end-effector based on joystick input interpreted as X, Y, Z movements. The software sends precise PWM signals to the servos to achieve the calculated angles. Feedback (like current position or mode) can be displayed on an LCD.</p>
        
        <h3>Phase 6: Calibration & Testing Strategy</h3>
        <p>Calibration is needed to map the PWM signal range to the actual angular range of each servo and to fine-tune the kinematic model with precise measured segment lengths. Testing involves verifying the full range of motion for each joint, checking the accuracy of the forward and inverse kinematics throughout the workspace, and tuning control parameters (like speed or smoothing) for stable and precise movements. Testing pick-and-place sequences verifies the overall functionality.</p>
        
        <h3>Phase 7: Programming Basic Operations (Conceptual)</h3>
        <p>Higher-level functionality involves programming sequences of movements. This could include defining a 'home' position, creating routines for picking an object at one location and placing it at another (requiring a series of IK-calculated movements for the approach, grasp, lift, move, lower, release sequence), or even tracing predefined paths.</p>
        
        <h3>Conclusion & Future Directions</h3>
        <p>This project provides a practical understanding of robotics fundamentals. Theoretical extensions include adding closed-loop control using position feedback (e.g., potentiometers or encoders on joints), integrating computer vision for object detection, interfacing with ROS for more complex planning, or designing more sophisticated end-effectors.</p>
      `
    },
    {
      id: 3,
      title: "Tiny OS",
      date: "December 2022",
      techStack: "C, Assembly",
      abstract: "A tiny operating system for the Raspberry Pi written purely in C, with the bootloader in assembly.",
      image: "/assets/tinyos.jpeg",
      link: "https://github.com/Mustafa-khann/TinyOS",
      content: 
      `
        <h2>Project Guide: Minimalist Operating System (Conceptual)</h2>
        
        <h3>Project Overview</h3>
        <p>This guide outlines the conceptual steps for building a minimal operating system from the ground up, targeting a platform like the Raspberry Pi. It focuses on understanding core OS principles by implementing them directly, primarily in C with assembly for the initial boot phase.</p>
        
        <h3>Prerequisites & Setup</h3>
        <p>Conceptually, this requires a target hardware board (Raspberry Pi), an SD card for the OS image, a way to interface for debugging (like a USB-to-TTL serial cable), and a development machine with a cross-compiler toolchain (e.g., ARM GNU Toolchain) installed to build code for the target architecture. Familiarity with C, ARM assembly, and basic computer architecture is assumed.</p>
        
        <h3>Phase 1: Bootstrapping (Assembly)</h3>
        <p>The process begins with the bootloader, written in assembly. Its purpose is to perform minimal hardware initialization required before C code can run. This typically involves setting up the stack pointer, potentially configuring processor modes, clearing the BSS segment (uninitialized data area), and finally jumping to the main C kernel entry point. Understanding the specific hardware boot sequence of the target platform (e.g., Raspberry Pi's GPU loading stages) is crucial.</p>
        
        <h3>Phase 2: Basic Kernel & Console I/O (C)</h3>
        <p>The initial C code (kernel main function) needs to establish basic communication. This usually involves implementing a driver for a serial port (UART). Understanding the memory-mapped registers of the UART peripheral is key. Functions for sending single characters and strings are developed first to allow \`printf\`-style debugging. The kernel might start with a simple infinite loop after initialization.</p>
        
        <h3>Phase 3: Memory Management Concepts</h3>
        <p>Implementing memory management is fundamental. Initially, this might be a simple physical memory manager that tracks available memory regions (e.g., using a bitmap or linked list) and provides basic \`malloc\`/\`free\` equivalents for the kernel itself. Later, this could be extended to include virtual memory using the Memory Management Unit (MMU), requiring setup of page tables and translation mechanisms to map virtual addresses used by processes to physical memory addresses, providing memory protection.</p>
        
        <h3>Phase 4: Interrupt Handling</h3>
        <p>The OS needs to respond to hardware events. This requires setting up the interrupt controller (on ARM, typically the GIC - Generic Interrupt Controller), defining an interrupt vector table, and writing interrupt service routines (ISRs) for specific events (like timer interrupts or UART receive interrupts). Careful handling of processor context (saving/restoring registers) within ISRs is essential.</p>

        <h3>Phase 5: Scheduling Concepts</h3>
        <p>To support multitasking (even basic cooperative or preemptive), a scheduler is needed. This involves defining a process or task control block (TCB) structure to store the state (registers, stack pointer) of each task. A scheduling algorithm (e.g., simple round-robin) decides which task runs next. Context switching logic (often involving assembly) is required to save the state of the current task and restore the state of the next task. A timer interrupt is typically used to trigger preemptive scheduling.</p>

        <h3>Phase 6: System Calls (Conceptual)</h3>
        <p>If user-mode processes were to be implemented (a significant extension), a system call mechanism would be needed. This provides a controlled interface for user processes to request kernel services (like file I/O or memory allocation). It typically involves a specific instruction (like \`SVC\` on ARM) that triggers an exception, transferring control to a kernel handler which performs the requested service.</p>

        <h3>Phase 7: Basic Device Drivers</h3>
        <p>Beyond the initial UART, drivers for other peripherals might be developed. This involves understanding the hardware specifications and memory-mapped registers for devices like GPIO (for controlling pins), timers (for delays and scheduling), or potentially I2C/SPI controllers for communicating with external sensors or devices.</p>

        <h3>Conclusion</h3>
        <p>Building even a minimal OS touches upon fundamental concepts like hardware initialization, low-level I/O, memory management, interrupts, and scheduling. It provides deep insights into the hardware-software interface. Potential extensions include implementing a simple filesystem, basic networking, or more sophisticated memory and process management.</p>
      `
    },
    {
      id: 4,
      title: "Tiny Compiler",
      date: null,
      techStack: "C",
      abstract: "A tiny compiler for C like language, with a complete lexer, parser, and code generator.",
      image: null,
      link: null,
      content: `
        <h2>Project Guide: Compiler Construction (Conceptual)</h2>

        <h3>Project Overview</h3>
        <p>This guide outlines the conceptual stages involved in building a compiler for a small, defined programming language (often a subset of C). The goal is to translate source code written in this language into executable machine code or an intermediate representation.</p>

        <h3>Phase 1: Lexical Analysis (Lexing/Scanning)</h3>
        <p>The first step is to break the raw source code text into a sequence of meaningful tokens. Tokens represent basic units like keywords (\`if\`, \`while\` ), identifiers (\`myVariable\` ), operators (\`+\`, \`=\` ), numbers (\`123\` ), strings (\`"hello"\` ), and punctuation (\`;\` , \`(\`). This phase typically uses concepts from formal language theory, defining token patterns using regular expressions and implementing a scanner (lexer) often based on finite automata principles to recognize these patterns in the input stream.</p>

        <h3>Phase 2: Syntax Analysis (Parsing)</h3>
        <p>The parser takes the stream of tokens from the lexer and checks if they form a syntactically valid structure according to the grammar of the source language. The language's grammar is often formally defined using a notation like Backus-Naur Form (BNF). The parser attempts to derive the token sequence from the grammar's start symbol. Common parsing techniques include recursive descent (top-down) or shift-reduce parsing (bottom-up, e.g., using tools like Yacc/Bison). The primary output of this phase is typically an Abstract Syntax Tree (AST), a tree representation of the source code's structure, free from syntactic details like parentheses or semicolons.</p>

        <h3>Phase 3: Semantic Analysis</h3>
        <p>While the parser checks grammatical structure, the semantic analyzer checks for meaning-related constraints. This includes tasks like type checking (ensuring operations are performed on compatible data types, e.g., not adding a string to an integer), verifying variable declarations (checking if variables are declared before use and managing scopes), and ensuring function calls match their definitions in terms of argument count and types. This phase often annotates the AST with type information and builds a symbol table to track identifiers and their properties (type, scope).</p>

        <h3>Phase 4: Intermediate Representation (IR) Generation (Optional)</h3>
        <p>For more complex compilers, the AST might be translated into an Intermediate Representation (IR). An IR is a lower-level, machine-independent representation (e.g., three-address code, stack machine code). Using an IR can simplify the code generation process and facilitate machine-independent optimizations. This phase involves traversing the (possibly annotated) AST and generating corresponding IR instructions.</p>

        <h3>Phase 5: Code Optimization (Optional)</h3>
        <p>This phase aims to improve the generated code's performance (speed, size). Optimizations can be performed on the AST or, more commonly, on the IR. Examples include constant folding (evaluating constant expressions at compile time), dead code elimination (removing unreachable code), loop optimizations (e.g., code motion), and register allocation. This is often the most complex part of a compiler.</p>

        <h3>Phase 6: Code Generation</h3>
        <p>The final phase translates the IR (or directly from the AST/annotated AST) into the target machine's language, such as assembly code or machine code. This involves mapping IR instructions or AST nodes to sequences of target instructions, managing memory allocation for variables, and respecting the target architecture's calling conventions for function calls. Register allocation is a critical part of this phase if not done during optimization.</p>

        <h3>Conclusion</h3>
        <p>Building a compiler, even a tiny one, requires understanding concepts from formal languages, data structures (trees, symbol tables), algorithms, and potentially computer architecture. It provides insight into how programming languages are processed and executed.</p>
      `
    },
    {
      id: 5,
      title: "MNIST Digit Recognizer Neural Network in C",
      date: "August 2022",
      techStack: "C",
      abstract: "A MNIST digit recognizer neural network purely written in C. Yields 90% accuracy.",
      image: "/assets/digitrecognizer.jpeg",
      link: "https://github.com/Mustafa-khann/MNIST-Digit-Recognizer-in-C",
      content: `
        <h2>Project Guide: Feedforward Neural Network in C (Conceptual)</h2>

        <h3>Project Overview</h3>
        <p>This guide conceptually outlines building a simple feedforward neural network from scratch in C to classify handwritten digits from the MNIST dataset. The challenge lies in implementing the core learning algorithms (forward propagation, backpropagation, gradient descent) without relying on high-level machine learning libraries.</p>
        
        <h3>Phase 1: Understanding the Theory</h3>
        <p>Before implementation, understanding the core concepts is vital. This includes the network architecture (input layer matching image size, one or more hidden layers, output layer matching number of classes), the neuron model (weighted inputs, bias, activation function like ReLU or Sigmoid), the forward pass (calculating activations layer by layer), the loss function (e.g., cross-entropy to measure error), the backpropagation algorithm (using the chain rule to calculate gradients of the loss with respect to each weight and bias), and the gradient descent optimization process (updating weights/biases in the opposite direction of their gradients).</p>

        <h3>Phase 2: Data Handling</h3>
        <p>The MNIST dataset consists of images (pixel values) and labels (the digit represented). A crucial step involves writing functions in C to parse the specific MNIST file format (which uses a custom binary structure), load the images and labels into memory (e.g., arrays), and potentially normalize the pixel values (e.g., scaling from 0-255 to 0-1) for better numerical stability during training.</p>

        <h3>Phase 3: Network Structure Implementation</h3>
        <p>Defining data structures in C to represent the network is necessary. This could involve structs to hold layer dimensions, weights (matrices), biases (vectors), and activations. Functions are needed to initialize the network, allocating memory for weights and biases and initializing them (e.g., with small random values).</p>
        
        <h3>Phase 4: Implementing Forward Propagation</h3>
        <p>This involves writing C functions to perform the forward pass. For each layer, this requires matrix multiplication (input activations by layer weights), vector addition (adding biases), and applying the chosen activation function element-wise. For the output layer, a softmax function is typically applied to convert outputs into class probabilities.</p>

        <h3>Phase 5: Implementing Backpropagation & Gradient Descent</h3>
        <p>This is often the most complex part. Functions are needed to calculate the error at the output layer. Then, working backward through the network, gradients for weights and biases of each layer are calculated using the chain rule and the derivatives of the activation functions. Finally, an update function implements gradient descent, adjusting each weight and bias based on its calculated gradient and a chosen learning rate.</p>

        <h3>Phase 6: Training Loop & Evaluation</h3>
        <p>A main training loop iterates through the dataset (potentially multiple times, called epochs). Inside the loop, for each training example (or batch of examples), the forward pass calculates predictions, the loss is computed, the backward pass calculates gradients, and the weights are updated. Periodically, the network's performance is evaluated on a separate test set (using only the forward pass) to measure accuracy and monitor for overfitting.</p>

        <h3>Implementation Considerations in C</h3>
        <p>Building this in C requires careful memory management (allocating and freeing memory for matrices/vectors), efficient implementation of matrix operations, and attention to numerical stability (e.g., using appropriate data types like \`double\` or \`float\`, handling potential overflows/underflows).</p>

        <h3>Conclusion</h3>
        <p>Implementing a neural network from scratch reinforces fundamental concepts of machine learning, matrix math, and low-level programming. It provides a solid base for understanding how more complex deep learning models function internally.</p>
      `
    },
    {
      id: 6,
      title: "Urdu Text Generation Using GAN Architecture",
      date: "June 2022",
      techStack: "Python, PyTorch, Transformer",
      abstract: "Developed a GAN-based Urdu text generator, leveraging transformer architecture to overcome long-range text dependencies.",
      image: "/assets/urdugan.jpeg",
      link: "https://github.com/yourusername/urdu-text-generator",
      content: `
        <h2>Project Guide: GAN + Transformer for Urdu Text Generation (Conceptual)</h2>

        <h3>Project Overview</h3>
        <p>This guide describes the conceptual framework for generating Urdu text using a combination of Generative Adversarial Networks (GANs) and the Transformer architecture. The goal is to leverage the sequence modeling power of Transformers within the adversarial training framework of GANs to produce coherent and contextually relevant Urdu text.</p>

        <h3>Core Concepts</h3>
        <p>Understanding both GANs and Transformers is key. <strong>GANs</strong> involve a Generator network (creating fake data) and a Discriminator network (distinguishing real from fake data), trained adversarially. <strong>Transformers</strong> utilize self-attention mechanisms to capture long-range dependencies in sequential data, making them suitable for language tasks. This project typically uses a Transformer-based model (like GPT-2) as the Generator and another (like BERT or a simpler classifier) as the Discriminator.</p>

        <h3>Phase 1: Data Preparation for Urdu</h3>
        <p>Acquiring a suitable corpus of Urdu text is the first step. Preprocessing involves cleaning the text, handling the right-to-left script directionality, normalizing Unicode characters, and potentially segmenting the text into sentences or paragraphs. Tokenization specifically for Urdu might require specialized tokenizers or adapting multilingual models (like XLM-RoBERTa) that understand Urdu script.</p>

        <h3>Phase 2: Model Architecture Design</h3>
        <p>The <strong>Generator</strong> is designed to take random noise (or a starting sequence) and generate a sequence of Urdu text tokens. A pre-trained Transformer language model (like a smaller GPT variant) can be fine-tuned for this. The <strong>Discriminator</strong> takes a sequence of text tokens (either real from the corpus or fake from the Generator) and outputs a probability score indicating whether the sequence is real or fake. This could be a Transformer-based classifier (like BERT fine-tuned for sequence classification).</p>

        <h3>Phase 3: Adversarial Training Process</h3>
        <p>Training involves alternating updates to the Discriminator and Generator. 
        <strong>Discriminator Training:</strong> It's trained on batches of real Urdu text (labeled as real) and batches of fake text generated by the current Generator (labeled as fake). Its goal is to improve its ability to distinguish the two.
        <strong>Generator Training:</strong> It generates fake text, which is then passed through the Discriminator. The Generator's goal is to produce text that the Discriminator classifies as real. The error signal from the Discriminator is backpropagated to update the Generator's weights (the Discriminator's weights are frozen during this step).</p>

        <h3>Phase 4: Handling Training Challenges</h3>
        <p>GAN training is notoriously unstable. Techniques like careful hyperparameter tuning (learning rates for G and D), using appropriate loss functions (e.g., variants of BCE loss or Wasserstein loss), and potentially adjusting the number of updates for D vs. G per iteration (d_steps, g_steps) are crucial. Mode collapse (Generator producing limited variety of outputs) is a common issue to monitor.</p>

        <h3>Phase 5: Generation and Evaluation</h3>
        <p>Once trained, the Generator can be used to produce new Urdu text sequences, typically starting from a seed input or noise. Evaluating the quality of generated text is challenging. Metrics might include perplexity (though less reliable with GANs), BLEU scores if reference texts are available, or qualitative human evaluation assessing coherence, grammar, and relevance.</p>

        <h3>Technical Considerations</h3>
        <p>Using libraries like PyTorch or TensorFlow simplifies implementing the Transformer models and the training loop. Handling tokenization, sequence padding, and attention masks correctly within the Transformer models is essential. The computational cost can be significant, often requiring GPU acceleration.</p>

        <h3>Conclusion</h3>
        <p>Combining GANs and Transformers for text generation is an advanced technique aiming to leverage the strengths of both. It addresses challenges in generating diverse and high-quality sequences, particularly for complex languages like Urdu. Success depends heavily on data quality, model architecture choices, and careful tuning of the adversarial training process.</p>
      `
    },
    {
      id: 7,
      title: "Rusty Transformer",
      date: "April 2022",
      techStack: "Rust",
      abstract: "The Transformer architecture implemented in Rust for high performance and memory safety, focusing on efficient natural language processing.",
      image: "/assets/rustytransformer.jpeg",
      link: "https://github.com/Mustafa-khann/rusty-transformer",
      content: `
        <h2>Project Guide: Transformer Implementation in Rust (Conceptual)</h2>

        <h3>Project Overview</h3>
        <p>This guide outlines the conceptual process of implementing the Transformer neural network architecture from scratch using Rust. The motivation is often to leverage Rust's performance and memory safety features for computationally intensive NLP tasks, contrasting with typical Python implementations.</p>

        <h3>Core Transformer Concepts</h3>
        <p>A deep understanding of the Transformer architecture is prerequisite. This includes the overall Encoder-Decoder structure, the self-attention mechanism (scaled dot-product attention), multi-head attention, positional encodings (sinusoidal or learned), position-wise feed-forward networks, residual connections, and layer normalization.</p>

        <h3>Phase 1: Environment & Dependencies</h3>
        <p>Setting up the Rust project involves managing dependencies using Cargo. Key crates would include a numerical computing library (like \`ndarray\` for N-dimensional arrays/tensors), potentially crates for random number generation (\`rand\` ), serialization (\`serde\` ), parallelization (\`rayon\` ), and possibly tokenization libraries if building an end-to-end application.</p>

        <h3>Phase 2: Foundational Tensor/Matrix Operations</h3>
        <p>A core part of the project is implementing or wrapping tensor operations safely and efficiently in Rust. This involves defining data structures for tensors (e.g., using \`ndarray\` ) and implementing essential operations like matrix multiplication, element-wise operations, transposition, slicing, concatenation, activation functions (ReLU, Softmax), and potentially gradient calculations if implementing backpropagation manually (though often an auto-diff library might be used or adapted).</p>

        <h3>Phase 3: Implementing Transformer Components</h3>
        <p>Each logical part of the Transformer architecture needs to be implemented, likely as separate modules or structs in Rust:
        <ul>
          <li><strong>Embedding Layer:</strong> Maps input token IDs to dense vectors.</li>
          <li><strong>Positional Encoding:</strong> Generates or loads positional information to be added to embeddings.</li>
          <li><strong>Multi-Head Attention:</strong> Implements the attention mechanism, including splitting into heads, scaled dot-product attention, and concatenating results. Requires careful tensor manipulation.</li>
          <li><strong>Position-wise Feed-Forward Network:</strong> Consists of two linear transformations with a ReLU activation in between.</li>
          <li><strong>Layer Normalization:</strong> Implements layer normalization.</li>
          <li><strong>Encoder/Decoder Blocks:</strong> Combines the above components with residual connections and layer normalization according to the architecture.</li>
        </ul>
        Rust's type system and ownership rules are leveraged here to ensure correctness and memory safety.</p>

        <h3>Phase 4: Assembling the Full Model</h3>
        <p>The individual components are combined into the final Transformer struct, containing stacks of Encoder and Decoder blocks, embedding layers, and a final linear layer to produce output logits. The forward pass logic needs to be implemented, correctly handling inputs, outputs, and masks between the encoder and decoder.</p>

        <h3>Phase 5: Training & Inference Logic (Conceptual)</h3>
        <p>Implementing a training loop involves processing batches of data, calculating loss (e.g., cross-entropy), computing gradients (either manually or using an auto-diff framework adapted for Rust), and updating model parameters using an optimizer (e.g., Adam). Inference (e.g., for translation) involves encoding the input sequence and then auto-regressively decoding the output sequence token by token.</p>

        <h3>Phase 6: Leveraging Rust's Strengths</h3>
        <p>Optimizing the implementation might involve using libraries like \`Rayon\` for parallelizing computations across CPU cores, ensuring efficient memory layout and access patterns, and potentially using SIMD intrinsics for low-level optimization of numerical operations. Rust's strong type system helps prevent errors at compile time.</p>

        <h3>Conclusion</h3>
        <p>Implementing a Transformer in Rust is a significant undertaking that combines deep learning knowledge with systems programming skills. It highlights the trade-offs between development speed (often faster in Python) and runtime performance/safety (potential advantages in Rust). It demonstrates Rust's capability for high-performance computing tasks beyond its traditional domains.</p>
      `
    },
    {
      id: 8,
      title: "LLama 3.0 Resume Analyzer",
      date: null,
      techStack: "Python, Nodejs, Ollama",
      abstract: "LLama 3.0 based resume analyzer that analyzes your resume and gives you a score and suggestions on how to improve it.",
      image: null,
      link: null,
      content: `
        <h2>Project Guide: LLM-Based Resume Analyzer (Conceptual)</h2>

        <h3>Project Overview</h3>
        <p>This guide conceptually describes building a tool that uses a Large Language Model (LLM), such as Llama 3, to analyze resumes, provide scores, and offer improvement suggestions. It leverages the LLM's natural language understanding capabilities.</p>

        <h3>Core Concept: Leveraging LLMs</h3>
        <p>The fundamental principle is using a pre-trained LLM's ability to process and understand text. The LLM acts as the core engine for parsing the resume content, evaluating it against certain criteria, and generating feedback. Tools like Ollama might be used to run the LLM locally.</p>

        <h3>Phase 1: Resume Input & Parsing</h3>
        <p>The system needs a way to accept a resume, typically as a PDF or text file. A preliminary parsing step might be needed to extract raw text content from the resume format. Libraries in Python or Node.js can handle PDF text extraction.</p>

        <h3>Phase 2: Prompt Engineering</h3>
        <p>This is a critical phase. Designing effective prompts is key to guiding the LLM's analysis. Prompts need to instruct the LLM to:
        <ul>
          <li>Identify key sections (Experience, Education, Skills).</li>
          <li>Extract specific information (job titles, dates, technologies, quantifiable achievements).</li>
          <li>Assess quality based on defined criteria (e.g., clarity, use of action verbs, relevance to a target job description if provided, conciseness).</li>
          <li>Generate a score or rating (based on its assessment).</li>
          <li>Provide specific, actionable suggestions for improvement.</li>
        </ul>
        Iterative refinement of prompts is usually necessary to get desired results.</p>

        <h3>Phase 3: LLM Interaction</h3>
        <p>The system sends the extracted resume text along with the engineered prompts to the LLM (e.g., Llama 3 running via Ollama's API). Code (Python/Node.js) handles the API requests and receives the LLM's generated response, which contains the analysis, score, and suggestions.</p>

        <h3>Phase 4: Structuring and Presenting Output</h3>
        <p>The raw text output from the LLM might need post-processing. This could involve parsing the LLM's response to structure the information cleanly (e.g., separating the score, strengths, areas for improvement, specific suggestions). The final analysis is then presented to the user through a user interface (potentially a web interface).</p>

        <h3>Technical Considerations</h3>
        <p>Choosing the right LLM (size, capabilities) is important. Running LLMs locally (via Ollama) requires sufficient hardware resources (RAM, potentially GPU). Handling API interactions, potential errors, and managing the context length limitations of the LLM are practical implementation details. Ensuring user privacy regarding resume data is also a consideration.</p>

        <h3>Conclusion</h3>
        <p>An LLM-based resume analyzer leverages the power of modern AI for a practical task. The main challenges lie in effective prompt engineering to elicit the desired analysis and in building a user-friendly system around the LLM interaction. The quality of the output is highly dependent on the chosen LLM and the quality of the prompts.</p>
      `
    },
    {
      id: 9,
      title: "Sign Language Recognizer Neural Network in C",
      date: null,
      techStack: "C",
      abstract: "A sign language recognizer neural network purely written in C. Yeilds 73% accuracy on the MNIST Sign Language Dataset.",
      image: null,
      link: null,
      content: `
        <h2>Project Guide: Sign Language NN in C (Conceptual)</h2>

        <h3>Project Overview</h3>
        <p>This guide conceptually follows the process of building a neural network in C to recognize sign language gestures, likely using a dataset like Sign Language MNIST. It shares many core principles with the MNIST Digit Recognizer but applies them to a different, potentially more complex, visual recognition task.</p>

        <h3>Core Theory Adaptation</h3>
        <p>The fundamental theory of feedforward neural networks (layers, neurons, activations, forward/backpropagation, gradient descent) remains the same as in the digit recognizer project. The primary difference lies in the input data (pixels representing hand signs) and the output classes (different signs).</p>

        <h3>Phase 1: Dataset Handling</h3>
        <p>Similar to MNIST digits, this requires understanding and parsing the specific format of the Sign Language dataset (e.g., Sign Language MNIST is often in CSV format). C code is needed to read the image pixel data and corresponding labels, loading them into appropriate data structures (arrays).</p>

        <h3>Phase 2: Network Design & Implementation</h3>
        <p>A feedforward network architecture is designed. The input layer size matches the flattened image dimensions. The number of hidden layers and neurons per layer are hyperparameters to be chosen. The output layer has neurons corresponding to the number of sign classes. The C implementation involves defining structures for the network, initializing weights/biases, and implementing the forward pass, activation functions (e.g., ReLU, Softmax), loss function (cross-entropy), backpropagation, and weight update rules, just as in the digit recognizer project.</p>

        <h3>Challenges Compared to Digits</h3>
        <p>Sign language gestures can have higher visual similarity between different classes and potentially more variation within the same class compared to digits. This might make classification harder and may necessitate exploring different network architectures (e.g., more layers or neurons) or more careful hyperparameter tuning (learning rate, initialization) during the training phase to achieve reasonable accuracy.</p>

        <h3>Phase 3: Training & Evaluation</h3>
        <p>The training process mirrors the digit recognizer: iterating through the sign language training data, performing forward/backward passes, updating weights, and periodically evaluating accuracy on a separate test set. Achieving the reported 73% accuracy likely requires significant training time and tuning.</p>

        <h3>Conclusion</h3>
        <p>Building a sign language recognizer in C reinforces the core concepts of neural networks while applying them to a slightly more complex image classification task. It highlights the universal nature of the underlying algorithms and the importance of data handling and hyperparameter tuning for achieving good performance, all while managing low-level implementation details in C.</p>
      `
    },
    {
      id: 10,
      title: "CNN Architecture from Scratch in C",
      date: null,
      techStack: "C",
      abstract: "Built a convolutional neural network in C, implementing convolutions, pooling, and backpropagation to understand how CNNs process images.",
      image: null,
      link: null,
      content: `
        <h2>Project Guide: CNN Implementation in C (Conceptual)</h2>

        <h3>Project Overview</h3>
        <p>This guide outlines the conceptual steps for implementing a Convolutional Neural Network (CNN) architecture from scratch in C. CNNs are specialized for grid-like data (images). Building one in C provides deep insight into the mechanics of convolutional and pooling operations.</p>

        <h3>Core CNN Concepts</h3>
        <p>Understanding CNN-specific layers is essential:
        <ul>
          <li><strong>Convolutional Layers:</strong> Apply learned filters (kernels) across input feature maps using the convolution operation to detect spatial features. Key parameters include filter size, stride, and padding.</li>
          <li><strong>Pooling Layers (e.g., Max Pooling):</strong> Downsample feature maps, reducing dimensionality and providing some translation invariance.</li>
          <li><strong>Activation Functions (e.g., ReLU):</strong> Introduce non-linearity, typically after convolutional layers.</li>
          <li><strong>Fully Connected Layers:</strong> Often used at the end to classify based on extracted features.</li>
        </ul>
        Backpropagation needs to be adapted to calculate gradients through these specialized layers.</p>

        <h3>Phase 1: Data Structures for CNNs</h3>
        <p>Representing data requires careful thought. Feature maps are often multi-dimensional (height, width, channels). Filters in convolutional layers are also multi-dimensional. C structures or multi-dimensional arrays are needed to store input data, intermediate feature maps, filter weights, biases, and gradients.</p>

        <h3>Phase 2: Implementing CNN Layer Operations</h3>
        <p>This is the core implementation challenge:
        <ul>
          <li><strong>Convolution Forward Pass:</strong> Implementing the convolution operation efficiently in C involves nested loops sliding the filters across the input feature maps, performing element-wise multiplications and summations. Managing padding and stride correctly is crucial.</li>
          <li><strong>Pooling Forward Pass:</strong> Implementing max pooling involves sliding a window across feature maps and selecting the maximum value within each window.</li>
          <li><strong>Backpropagation through Convolution:</strong> Calculating gradients for filter weights involves a related convolutional operation (often using flipped filters) between the input activations and the output gradients. Calculating gradients for the input feature map also involves a convolution (often a 'full' convolution) between the filters and the output gradients.</li>
          <li><strong>Backpropagation through Pooling:</strong> For max pooling, the gradient is typically passed back only to the location within the pooling window that had the maximum value during the forward pass.</li>
        </ul>
        Implementing these efficiently and correctly in C without libraries is complex.</p>

        <h3>Phase 3: Network Assembly & Training</h3>
        <p>The implemented layers are assembled into a CNN architecture (e.g., CONV -> RELU -> POOL -> CONV -> RELU -> POOL -> FC -> SOFTMAX). The training loop proceeds similarly to a standard neural network, but the forward and backward passes now use the specialized CNN layer functions. Memory management for potentially large intermediate feature maps becomes even more critical than in standard feedforward networks.</p>

        <h3>Conclusion</h3>
        <p>Implementing a CNN in C is a demanding project that provides unparalleled understanding of how these powerful image processing models work at a fundamental level. The main challenges lie in correctly and efficiently implementing the convolution and pooling operations and their corresponding backpropagation steps, along with careful memory management.</p>
      `
    }
  ];