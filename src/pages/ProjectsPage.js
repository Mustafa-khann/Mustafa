import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    name: 'HermesX',
    type: 'Hardware',
    description: 'Autonomous drone for GPS-based package delivery. First aid kit delivery via mobile app.',
    stack: 'Pixhawk, ROS, Python, C++, React Native',
    status: 'Prototype complete',
  },
  {
    name: 'Anky',
    type: 'Hardware',
    description: '5-DoF robotic arm with inverse kinematics. Pick-and-place operations.',
    stack: 'Arduino, C++, Servo Control',
    status: 'Prototype complete',
  },
  {
    name: 'TinyOS',
    type: 'System',
    description: 'Minimal operating system for Raspberry Pi. Bootloader in assembly.',
    stack: 'C, Assembly',
    link: 'https://github.com/Mustafa-khann/TinyOS',
    status: 'Active',
  },
  {
    name: 'TinyCompiler',
    type: 'System',
    description: 'Compiler for C-like language. Lexer, parser, code generator.',
    stack: 'C',
    link: 'https://github.com/Mustafa-khann/TinyCompiler',
    status: 'Complete',
  },
  {
    name: 'MNIST Neural Network',
    type: 'Experiment',
    description: 'Digit recognizer in pure C. 90% accuracy.',
    stack: 'C',
    link: 'https://github.com/Mustafa-khann/MNIST-Digit-Recognizer-in-C',
    status: 'Complete',
  },
  {
    name: 'Sign Language Recognizer',
    type: 'Experiment',
    description: 'Neural network in C. 73% accuracy on MNIST Sign Language Dataset.',
    stack: 'C',
    link: 'https://github.com/Mustafa-khann/Sign-Language-Recognizer',
    status: 'Complete',
  },
  {
    name: 'CNN from Scratch',
    type: 'Experiment',
    description: 'Convolutional neural network in C. Convolutions, pooling, backpropagation.',
    stack: 'C',
    link: 'https://github.com/Mustafa-khann/CNN-Architecture-from-Scratch-in-C',
    status: 'Complete',
  },
  {
    name: 'Rusty Transformer',
    type: 'Experiment',
    description: 'Transformer architecture implementation.',
    stack: 'Rust',
    link: 'https://github.com/Mustafa-khann/rusty-transformer',
    status: 'In progress',
  },
  {
    name: 'Video Stabilizer',
    type: 'Tool',
    description: 'Video stabilization using OpenCV.',
    stack: 'C++, OpenCV',
    link: 'https://github.com/Mustafa-khann/Video-Stabilizer',
    status: 'Complete',
  },
  {
    name: 'Urdu Text Generation',
    type: 'Experiment',
    description: 'GAN-based Urdu text generator using transformer architecture.',
    stack: 'Python, Transformer',
    status: 'Research phase',
  },
];

const ProjectsPage = () => {
  // Group by type
  const grouped = projects.reduce((acc, project) => {
    if (!acc[project.type]) acc[project.type] = [];
    acc[project.type].push(project);
    return acc;
  }, {});

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-24">
        <Link to="/" className="inline-block mb-8 text-xs font-bold uppercase tracking-widest text-text-muted no-underline hover:text-text-heading transition-colors">← Back</Link>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tightest mb-2 text-text-heading">Projects</h1>
        <p className="text-text-muted italic">Artifacts with source or documentation.</p>
      </header>

      {Object.entries(grouped).map(([type, typeProjects]) => (
        <section key={type} className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 border-b border-border-subtle pb-2">{type}</h2>
          <ul className="list-none p-0">
            {typeProjects.map((project, idx) => (
              <li key={idx} className="mb-8 pb-8 border-b border-border-subtle last:border-b-0">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-bold tracking-tight text-text-heading">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline decoration-border-active">
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </span>
                  <span className="text-sm text-text-muted italic opacity-80">{project.status}</span>
                </div>
                <p className="text-text-muted mb-2">{project.description}</p>
                <span className="text-sm text-text-muted italic opacity-70 font-mono">{project.stack}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
};

export default ProjectsPage;
