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

    // `slug` points at the full write-up in data/projects.js. Outputs are the
    // first evidence a visitor sees, so they lead into the site; the GitHub
    // link rides along as a secondary exit rather than the only destination.
    outputs: [
        {
            name: 'HermesX',
            type: 'Prototype',
            description: 'Autonomous drone for GPS-based package delivery. First aid kit delivery to coordinates via mobile app.',
            stack: 'Pixhawk, ROS, Python, C++, React Native',
            slug: 'hermesx',
        },
        {
            name: 'Anky',
            type: 'Prototype',
            description: '5-DoF robotic arm. Inverse kinematics implementation. Pick-and-place operations.',
            stack: 'Arduino, C++, Servo Control',
            slug: 'anky',
        },
        {
            name: 'TinyOS',
            type: 'System',
            description: 'Minimal operating system for Raspberry Pi. Bootloader in assembly.',
            stack: 'C, Assembly',
            slug: 'tiny-os',
            link: 'https://github.com/Mustafa-khann/TinyOS',
        },
        {
            name: 'TinyCompiler',
            type: 'System',
            description: 'Compiler for C-like language. Lexer, parser, code generator.',
            stack: 'C',
            slug: 'tiny-compiler',
            link: 'https://github.com/Mustafa-khann/TinyCompiler',
        },
        {
            name: 'MNIST Neural Network',
            type: 'Experiment',
            description: 'Digit recognizer in pure C. 90% accuracy.',
            stack: 'C',
            slug: 'mnist-nn',
            link: 'https://github.com/Mustafa-khann/MNIST-Digit-Recognizer-in-C',
        },
        {
            name: 'CNN from Scratch',
            type: 'Experiment',
            description: 'Convolutional neural network in C. Convolutions, pooling, backpropagation.',
            stack: 'C',
            slug: 'cnn-from-scratch',
            link: 'https://github.com/Mustafa-khann/CNN-Architecture-from-Scratch-in-C',
        },
        {
            name: 'Rusty Transformer',
            type: 'Experiment',
            description: 'Transformer architecture implementation.',
            stack: 'Rust',
            slug: 'rusty-transformer',
            link: 'https://github.com/Mustafa-khann/rusty-transformer',
        },
    ],

    currentSetup: [
        'Laptop-first R&D',
        'Building a physical hardware lab',
        'Focused on rapid iteration infrastructure',
    ],

    /**
     * Dated, newest first. This is the site's pulse: a visitor can tell at a
     * glance whether anything is still happening here, and a returning visitor
     * has something new to read. Keep entries to one concrete line — what
     * changed, what broke, what got measured.
     *
     * Seeded from this repository's own commit history. Extend it with lab work.
     */
    labLog: [
        { date: 'Jun 23, 2026', entry: 'Pulled post routing and date parsing into one shared utility module.' },
        { date: 'Jun 18, 2026', entry: 'Route chunks now preload on idle after first paint.' },
        { date: 'Mar 28, 2026', entry: 'Rebuilt project pages as full build guides with short URLs.' },
        { date: 'Feb 20, 2026', entry: 'Shipped the 3D bookshelf with a dock-magnification scroll indicator.' },
    ],

    collaboration: `I collaborate after technical risk is reduced. Some projects are designed to scale. Most are killed early.`,

    footer: {
        name: 'Mustafa Khan',
        email: 'mustafakhann050@gmail.com',
        github: 'https://github.com/mustafa-khann',
        twitter: 'https://x.com/oprydai',
    },
};
