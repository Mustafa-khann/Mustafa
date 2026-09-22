import { projectSummaries } from './projectSummaries';

// Ownership was confirmed by Mustafa. Implementation details come from the
// existing project descriptions and linked source. Personal reflections should
// be added in his own words; see docs/portfolio-author-notes.md.
const writeups = {
  hermesx: {
    format: 'Hardware prototype',
    contribution: 'Drone integration, custom electronics mounts and housings, payload clamp, and mobile control interface.',
    imageAlt: 'HermesX delivery drone build',
    imageCaption: 'HermesX — delivery drone prototype',
    content: `
      <h2>What I built</h2>
      <p>I built HermesX independently: a drone prototype for package delivery, with GPS destinations sent from a mobile app. The delivery use case was a first-aid kit sent to coordinates selected through the app.</p>
      <h2>What did not work</h2>
      <p>Initially, I tried using an ESP32 as the main microcontroller, but that did not work because more compute was required. I initially thought I would do it based on vision, with ROS, SLAM, path planning in 3D, and a complete robotics stack. That failed. I ran out of resources, so I pivoted to GPS and a Raspberry Pi with a flight-control unit.</p>
      <h2>Working with limited resources</h2>
      <p>Along the vision pipeline, I tried to optimize everything: using an Xbox Kinect instead of a stereo camera, and a Raspberry Pi 3 instead of a Pi 5.</p>
      <p>I custom-designed mounts and housings for the onboard electronics and attached a servo-powered robotic clamp for grasping and releasing payloads.</p>
      <h2>What changed</h2>
      <p>The project moved from the full vision-based robotics stack I initially wanted to a GPS-based approach that fit the resources I had. The Raspberry Pi and flight-control unit replaced the initial ESP32 approach.</p>
      <h2>What I demonstrated</h2>
      <p>Given a latitude and longitude, HermesX flew to the destination, landed, dropped a package, and returned to its takeoff position. That was the complete delivery sequence I successfully demonstrated after the GPS pivot.</p>
      <h2>Project context</h2>
      <p>This was a solo hardware prototype. In <a href="/posts/why-robotics-is-hard-to-break-into-personal-experience">my account of getting into robotics</a>, I describe building the delivery drone and the difficulty of continuing in robotics without a local industry, mentors, or an established community.</p>
    `,
  },
  anky: {
    format: 'Hardware prototype',
    contribution: 'Robotic arm build, servo control, and inverse-kinematics implementation.',
    imageAlt: 'Anky five-degree-of-freedom robotic arm build',
    imageCaption: 'Anky — five-axis robotic arm',
    content: `
      <h2>What I built</h2>
      <p>Anky was my first robotics project. I built the desktop-scale, 3D-printed, five-degree-of-freedom arm independently, following online tutorials as I learned. I wrote the inverse kinematics from scratch and implemented servo control in C++ on Arduino for pick-and-place operations.</p>
      <h2>Scope of my work</h2>
      <p>The project combined the physical arm with its control software. The inverse-kinematics implementation connects a target position with the joint angles needed to move the arm, while the servo-control code drives the joints.</p>
      <h2>Technical focus</h2>
      <p>The central control problem is translating a position in the arm's workspace into coordinated joint motion. Mechanical dimensions, joint limits, and servo movement all have to agree with the kinematic model. This is the connection between the physical build and the software that the project explores.</p>
      <h2>What I learned</h2>
      <p>Following tutorials helped me get started in robotics. Servo-motor calibration and writing the inverse kinematics from scratch taught me the most. Those were the parts where I learned how the arm's physical movement connects to the control code.</p>
    `,
  },
  'tiny-os': {
    format: 'Systems implementation',
    contribution: 'Assembly boot code, C kernel, device I/O, memory and process-management code.',
    content: `
      <h2>What I built</h2>
      <p>I built TinyOS independently, a small operating-system project for the Raspberry Pi written in C and ARM assembly. The repository includes boot code, a kernel, UART and framebuffer I/O, memory-management modules, and process-management code.</p>
      <h2>Implementation</h2>
      <p>The <a href="https://github.com/Mustafa-khann/TinyOS/blob/main/boot/boot.S" target="_blank" rel="noopener noreferrer">assembly entry point</a> selects the primary core, sets a stack pointer, clears the BSS section, installs an interrupt vector table, and enters the C kernel. These are the prerequisites the kernel needs before it can run C code.</p>
      <p>The kernel contains a command interface, while separate modules handle physical-page allocation, virtual memory, processes, and device communication. The build uses an ARM cross-compiler and a linker script to produce a kernel image.</p>
      <h2>Development and debugging</h2>
      <p>The <a href="https://github.com/Mustafa-khann/TinyOS/blob/main/Makefile" target="_blank" rel="noopener noreferrer">Makefile</a> includes QEMU run and debug targets for the Raspberry Pi 2 model. It also generates a linker map and disassembly, making the compiled image inspectable during low-level debugging.</p>
      <h2>What I learned</h2>
      <p>I had to build the filesystem, scheduling, display output, keyboard input, and GPU communication. I wrote those systems from scratch in C, with assembly for the boot code. Building all of those pieces taught me a lot about low-level systems programming.</p>
      <h2>Result and references</h2>
      <p>The implementation is public, together with build instructions and the QEMU workflow. The GitHub snapshot above records the project's open-source interest. The README credits the Cambridge Raspberry Pi OS tutorials as a learning reference.</p>
    `,
  },
  'tiny-compiler': {
    format: 'Language implementation',
    contribution: 'Lexer, recursive-descent parser, abstract syntax tree, and interpreter in C.',
    content: `
      <h2>What I built</h2>
      <p>I built Tiny Compiler independently in C. Its implementation takes source text through a lexer and parser into an abstract syntax tree, then evaluates that tree with an interpreter.</p>
      <h2>Implementation</h2>
      <p>The lexer recognizes identifiers, numbers, keywords, and operators, and tracks source positions. The recursive-descent parser separates precedence levels so multiplication, addition, comparisons, and assignments form the appropriate tree structure.</p>
      <p>The interpreter walks that tree and contains handling for expressions, variables, blocks, conditionals, and loops. Environments connect variable names with their values and provide the scope for a block.</p>
      <h2>Technical focus</h2>
      <p>The key boundary is between recognizing syntax and executing it. Operator precedence lives in the parser; variable lookup and evaluation live in the interpreter. Keeping those responsibilities in separate modules makes each stage visible in the code.</p>
      <h2>Result and source</h2>
      <p>The published project includes <a href="https://github.com/Mustafa-khann/Tiny-Compiler/blob/main/lexer.c" target="_blank" rel="noopener noreferrer">the lexer</a>, <a href="https://github.com/Mustafa-khann/Tiny-Compiler/blob/main/parser.c" target="_blank" rel="noopener noreferrer">parser</a>, and <a href="https://github.com/Mustafa-khann/Tiny-Compiler/blob/main/interpreter.c" target="_blank" rel="noopener noreferrer">interpreter</a>. Execution in this version is through interpretation of the syntax tree. The GitHub snapshot above records its open-source interest.</p>
    `,
  },
  'mnist-nn': {
    format: 'Machine learning experiment',
    contribution: 'Dataset handling, network structures, forward propagation, backpropagation, training, and prediction export in C.',
    content: `
      <h2>What I built</h2>
      <p>I implemented a handwritten-digit recognizer independently in C, including the neural-network operations and training code. The network uses 784 pixel inputs, a hidden layer of 128 units, and ten output classes.</p>
      <h2>Implementation</h2>
      <p>The hidden layer uses ReLU and the output uses softmax. The program loads CSV data, normalizes pixel values by dividing by 255, trains the network, and exports predictions to a Kaggle submission file.</p>
      <p>The <a href="https://github.com/Mustafa-khann/MNIST-Digit-Recognizer-in-C/blob/main/main.c" target="_blank" rel="noopener noreferrer">published configuration</a> specifies 42,000 training samples, 50 epochs, and a learning rate of 0.005. Network operations and dataset utilities are separate C modules.</p>
      <h2>Result and evaluation context</h2>
      <p>The recorded result for this project is 90% accuracy. The public training script prints training accuracy and exports predictions for the unlabeled test data. A saved evaluation run identifying the split for the 90% figure is not included in the repository.</p>
      <p>The source is available above, alongside a dated snapshot of its GitHub stars and forks.</p>
    `,
  },
  'urdu-text-gen': {
    format: 'Machine learning experiment',
    contribution: 'GAN-based Urdu text-generation implementation using transformers and PyTorch.',
    content: `
      <h2>What I built</h2>
      <p>I developed an Urdu text-generation project independently in Python and PyTorch, combining a generative adversarial network with transformer-based sequence modeling.</p>
      <h2>Technical focus</h2>
      <p>The project explores generating Urdu sequences while modeling dependencies across the text. It combines the generator–discriminator approach of a GAN with a transformer's attention mechanism.</p>
    `,
  },
  'rusty-transformer': {
    format: 'Architecture implementation',
    contribution: 'Transformer components, attention masks, and a forward-pass demonstration in Rust.',
    content: `
      <h2>What I built</h2>
      <p>I implemented transformer components independently in Rust, using ndarray for array operations. The code includes positional encoding, multi-head attention, layer normalization, feed-forward layers, and encoder and decoder stacks.</p>
      <h2>Implementation</h2>
      <p>The <a href="https://github.com/Mustafa-khann/Rusty-Transformer/blob/main/src/transformer.rs" target="_blank" rel="noopener noreferrer">model module</a> separates these components into Rust structs and forward methods. It includes padding and look-ahead masks, residual connections, and dropout operations.</p>
      <h2>Demonstration and scope</h2>
      <p>The <a href="https://github.com/Mustafa-khann/Rusty-Transformer/blob/main/src/main.rs" target="_blank" rel="noopener noreferrer">example program</a> configures a small model with two layers, four attention heads, and 64-dimensional embeddings. It constructs sample token inputs, calls the forward pass, and prints shapes and output values for inspection.</p>
      <p>The published example demonstrates the architecture's forward path. It does not include a trained-model benchmark. The README references <em>Attention Is All You Need</em> and <em>The Annotated Transformer</em>.</p>
    `,
  },
  'resume-analyzer': {
    format: 'Local prototype · Not deployed',
    contribution: 'React upload interface, Flask PDF-processing backend, and local language-model integration.',
    content: `
      <h2>What I built</h2>
      <p>I built a resume-analysis application independently, with a React interface and a Python/Flask backend. The application is designed to turn a PDF resume into feedback organized as strengths, weaknesses, and suggestions using a locally hosted language model.</p>
      <h2>Implementation</h2>
      <p>The backend checks the upload, extracts text with PyPDF2, sends it to a local OpenAI-compatible endpoint, and returns the model response as JSON. The frontend contains the upload controls, loading state, and sections for displaying the feedback.</p>
      <h2>Current status</h2>
      <p>This is a local prototype. I have not deployed it as a public application.</p>
      <p>The repository is named for Llama 3 8B. Its <a href="https://github.com/Mustafa-khann/Llama-3-8B-powered-Resume-Analyzer/blob/main/backendServer.py" target="_blank" rel="noopener noreferrer">published backend</a> currently selects Phi-3 through LM Studio. The implementation depends on a locally configured model server.</p>
    `,
  },
  'sign-language-nn': {
    format: 'Machine learning experiment',
    contribution: 'Image loading, neural-network implementation, training, and evaluation in C.',
    content: `
      <h2>What I built</h2>
      <p>I implemented a neural network independently in C for the Sign Language MNIST dataset. The published configuration uses 784 image inputs, a hidden layer of 128 units, and 24 output classes.</p>
      <h2>Implementation</h2>
      <p>The project separates dataset loading from network operations. Its <a href="https://github.com/Mustafa-khann/MNIST-Sign-Language-Recognizer-in-C/blob/main/src/main.c" target="_blank" rel="noopener noreferrer">main program</a> runs training, calculates training and test accuracy, exports predictions, and records elapsed time.</p>
      <h2>Result and limitation</h2>
      <p>The recorded accuracy is 73%. The repository description explicitly records the inability to get past that level. The configuration sets 20 training epochs and a learning rate of 0.005; a saved run tying the reported figure to a particular configuration is not included.</p>
      <p>This experiment classifies images from the dataset. It does not demonstrate continuous sign-language translation.</p>
      <h2>Related work</h2>
      <p>A separate <a href="https://github.com/Mustafa-khann/MNIST-Sign-Language-Recognizer-CNN-in-C" target="_blank" rel="noopener noreferrer">CNN repository</a> contains my convolutional-network work for the same dataset.</p>
    `,
  },
  'cnn-from-scratch': {
    format: 'Machine learning experiment',
    contribution: 'Convolution, pooling, and backpropagation implementation in C.',
    content: `
      <h2>What I built</h2>
      <p>I built a convolutional neural-network project independently in C, implementing convolution, pooling, and backpropagation to understand how CNNs process images.</p>
      <h2>Technical focus</h2>
      <p>The work spans the forward operations that transform an image into feature maps and the backward operations that propagate gradients through those layers. Implementing these in C makes the feature-map layout, intermediate buffers, and memory management explicit.</p>
      <h2>Related source</h2>
      <p>My <a href="https://github.com/Mustafa-khann/MNIST-Sign-Language-Recognizer-CNN-in-C" target="_blank" rel="noopener noreferrer">Sign Language CNN repository</a> contains related C work, including network assembly, a forward path, and a partial backward path. No accuracy benchmark is reported here for this project.</p>
    `,
  },
};

export const projectDetails = projectSummaries.map((summary, index) => ({
  id: index + 1,
  slug: summary.slug,
  title: summary.fullTitle,
  date: summary.date,
  techStack: summary.stack,
  abstract: summary.description,
  image: summary.image,
  thumbnail: summary.thumbnail,
  link: summary.link,
  ...writeups[summary.slug],
}));
