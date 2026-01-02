import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Lab.css';

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
    <main className="lab-page">
      <header className="lab-header">
        <Link to="/" className="lab-back-link">← Back</Link>
        <h1 className="lab-header-name">Projects</h1>
        <p className="lab-header-definition">Artifacts with source or documentation.</p>
      </header>

      {Object.entries(grouped).map(([type, typeProjects]) => (
        <section key={type} className="lab-section">
          <h2 className="lab-section-title">{type}</h2>
          <ul className="lab-projects-list">
            {typeProjects.map((project, idx) => (
              <li key={idx} className="lab-project-item">
                <div className="lab-project-header">
                  <span className="lab-project-name">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </span>
                  <span className="lab-project-status">{project.status}</span>
                </div>
                <p className="lab-project-description">{project.description}</p>
                <span className="lab-project-stack">{project.stack}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
};

export default ProjectsPage;
