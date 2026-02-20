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

const statusColors = {
  'Active': 'text-accent-600 border-accent-200 bg-accent-50',
  'In progress': 'text-amber-600 border-amber-200 bg-amber-50',
  'Complete': 'text-neutral-500 border-neutral-200 bg-neutral-50',
  'Prototype complete': 'text-neutral-500 border-neutral-200 bg-neutral-50',
  'Research phase': 'text-violet-600 border-violet-200 bg-violet-50',
};

const ProjectsPage = () => {
  // Group by type
  const grouped = projects.reduce((acc, project) => {
    if (!acc[project.type]) acc[project.type] = [];
    acc[project.type].push(project);
    return acc;
  }, {});

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-20 opacity-0 animate-fade-in">
        <Link to="/" className="back-link mb-8 inline-flex">← Back</Link>
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">Artifacts with source or documentation.</p>
      </header>

      {Object.entries(grouped).map(([type, typeProjects], groupIndex) => (
        <section
          key={type}
          className="mb-16 opacity-0 animate-fade-in"
          style={{ animationDelay: `${(groupIndex + 1) * 100}ms` }}
        >
          <h2 className="section-header">{type}</h2>
          <ul className="list-none p-0 stagger-children">
            {typeProjects.map((project, idx) => (
              <li
                key={idx}
                className="mb-6 pb-6 border-b border-neutral-100 last:border-b-0 opacity-0 animate-slide-in group"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-3">
                  <span className="font-bold tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline hover:underline decoration-neutral-300 text-neutral-900"
                      >
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </span>
                  <span className={`text-[10px] uppercase px-2 py-0.5 border font-medium tracking-wider ${statusColors[project.status] || 'text-neutral-500 border-neutral-200 bg-neutral-50'}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-neutral-600 mb-3 leading-relaxed">{project.description}</p>
                <span className="text-xs text-neutral-400 font-mono">{project.stack}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
};

export default ProjectsPage;
