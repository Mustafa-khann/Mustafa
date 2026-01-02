/**
 * Centralized site content configuration
 * All copy is maintained here for easy editing
 */

export const siteContent = {
    header: {
        name: 'Mustafa Khan',
        definition: 'Independent engineer running continuous experiments across software, hardware, and autonomous systems.',
    },

    whatThisIs: `This is my public work surface. I prototype systems and ideas. Most experiments fail. Some become fundable or scalable.`,

    howIWork: {
        process: [
            'Identify a technical problem',
            'Prototype rapidly',
            'Test in real conditions',
            'Continue or discard',
        ],
        constraints: [
            'Small budgets',
            'Short cycles',
            'Minimal tooling',
            'Preference for first-principles',
        ],
    },

    domains: [
        'Mobile & Web Applications',
        'Embedded Systems & Hardware',
        'Energy & Power Systems',
        'Drones & Robotics',
        'Autonomous Vehicles',
        'Applied AI & Control',
    ],

    outputs: [
        {
            name: 'HermesX',
            type: 'Prototype',
            description: 'Autonomous drone for GPS-based package delivery. First aid kit delivery to coordinates via mobile app.',
            stack: 'Pixhawk, ROS, Python, C++, React Native',
        },
        {
            name: 'Anky',
            type: 'Prototype',
            description: '5-DoF robotic arm. Inverse kinematics implementation. Pick-and-place operations.',
            stack: 'Arduino, C++, Servo Control',
        },
        {
            name: 'TinyOS',
            type: 'System',
            description: 'Minimal operating system for Raspberry Pi. Bootloader in assembly.',
            stack: 'C, Assembly',
            link: 'https://github.com/Mustafa-khann/TinyOS',
        },
        {
            name: 'TinyCompiler',
            type: 'System',
            description: 'Compiler for C-like language. Lexer, parser, code generator.',
            stack: 'C',
            link: 'https://github.com/Mustafa-khann/TinyCompiler',
        },
        {
            name: 'MNIST Neural Network',
            type: 'Experiment',
            description: 'Digit recognizer in pure C. 90% accuracy.',
            stack: 'C',
            link: 'https://github.com/Mustafa-khann/MNIST-Digit-Recognizer-in-C',
        },
        {
            name: 'CNN from Scratch',
            type: 'Experiment',
            description: 'Convolutional neural network in C. Convolutions, pooling, backpropagation.',
            stack: 'C',
            link: 'https://github.com/Mustafa-khann/CNN-Architecture-from-Scratch-in-C',
        },
        {
            name: 'Rusty Transformer',
            type: 'Experiment',
            description: 'Transformer architecture implementation.',
            stack: 'Rust',
            link: 'https://github.com/Mustafa-khann/rusty-transformer',
        },
    ],

    currentSetup: [
        'Laptop-first R&D',
        'Building a physical hardware lab',
        'Focused on rapid iteration infrastructure',
    ],

    collaboration: `I collaborate after technical risk is reduced. Some projects are designed to scale. Most are killed early.`,

    footer: {
        name: 'Mustafa Khan',
        email: 'mustafakhann050@gmail.com',
        github: 'https://github.com/mustafa-khann',
        twitter: 'https://x.com/oprydai',
    },
};
