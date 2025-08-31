import React from 'react';
import '../../styles/Projects.css';
import FolderOpenRoundedIcon from '@material-ui/icons/FolderOpenRounded';
import GitHubIcon from '@material-ui/icons/GitHub';
import LaunchIcon from '@material-ui/icons/Launch';
import FadeInSection from '../common/FadeInSection';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carousel from 'react-bootstrap/Carousel';
import ExternalLinks from '../ui/ExternalLinks';

class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: '1',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey,
    });
  }
  
  render() {
    const spotlightProjects = {
      'HermesX - Autonomous Drone for Package Delivery': {
        title: 'HermesX - Autonomous Drone for Package Delivery',
        desc: 'Built a fully functional prototype that delivers a first aid kit to a specific GPS location via a mobile app in emergency situations',
        techStack: 'Pixhawk, ROS, Python, C++, React Native',
        image: '/assets/drone-1080.jpg',
      },
      'Anky - 5 DoF Robotic Arm': {
        title: 'Anky - 5 DoF Robotic Arm',
        desc: 'A desktop-scale 3D Printed 5-DoF robotic arm with precision control for pick-and-place operations. Features inverse kinematics implementation for intuitive positioning, and a user-friendly control interface. Capable of automated sequence programming and manual control via joystick.',
        techStack: 'Arduino, C++, Servo Control, Inverse Kinematics',
        image: '/assets/arm-1080.jpeg',
      },
      'Tiny OS': {
        title: 'Tiny OS',
        desc: 'A tiny operating system for the Raspberry Pi written purely in C, with the bootloader in assembly.',
        techStack: 'C, Assembly',
        link: 'https://github.com/Mustafa-khann/TinyOS',
        image: '/assets/tinyos.jpeg',
      },
      'Tiny Compiler': {
        title: 'Tiny Compiler',
        desc: 'A tiny compiler for C like language, with a complete lexer, parser, and code generator.',
        techStack: 'C',
        link: 'https://github.com/Mustafa-khann/TinyCompiler',
        image: '/assets/tinycompiler.jpeg',
      },
      'MNIST Digit Recognizer Neural Network in C': {
        title: 'MNIST Digit Recognizer Neural Network in C',
        desc: 'A MNIST digit recognizer neural network purely written in C. Yeilds 90% accuracy.',
        techStack: 'C',
        link: 'https://github.com/Mustafa-khann/MNIST-Digit-Recognizer-in-C',
        image: '/assets/digitrecognizer.jpeg',
      },
    };
    
    const projects = {
      'Tiny OS': {
        title: 'Tiny OS',
        desc: 'A tiny operating system for the Raspberry Pi written purely in C, with the bootloader in assembly.',
        techStack: 'C, Assembly',
        link: 'https://github.com/Mustafa-khann/TinyOS',
        image: '/assets/tinyos.png',
      },
      'Tiny Compiler': {
        title: 'Tiny Compiler',
        desc: 'A tiny compiler for C like language, with a complete lexer, parser, and code generator.',
        techStack: 'C',
        link: 'https://github.com/Mustafa-khann/TinyCompiler',
        image: '/assets/tinycompiler.png',
      },
      'Urdu Text Generation Using GAN Architecture': {
        title: 'Urdu Text Generation Using GAN Architecture',
        desc: 'Developed a GAN-based Urdu text generator, leveraging transformer architecture to overcome long-range text dependencies.',
        techStack: 'Python, Transformer',
      },
      'Rusty Transformer': {
        desc: 'The Transformer architecture implemented in Rust',
        techStack: 'Rust',
        link: 'https://github.com/Mustafa-khann/rusty-transformer',
      },
      'LLama 3.0 Resume Analyzer': {
        desc: 'LLama 3.0 based resume analyzer that analyzes your resume and gives you a score and suggestions on how to improve it.',
        techStack: 'Python, Nodejs, Ollama',
      },
      'Sign Language Recognizer Neural Network in C': {
        title: 'Sign Language Recognizer Neural Network in C',
        desc: 'A sign language recognizer neural network purely written in C. Yeilds 73% accuracy on the MNIST Sign Language Dataset.',
        techStack: 'C',
        link: 'https://github.com/Mustafa-khann/Sign-Language-Recognizer',
      },
      'CNN Architecture from Scratch in C': {
        title: 'CNN Architecture from Scratch in C',
        desc: 'Built a convolutional neural network in C, implementing convolutions, pooling, and backpropagation to understand how CNNs process images.',
        techStack: 'C',
        link: 'https://github.com/Mustafa-khann/CNN-Architecture-from-Scratch-in-C',
      },
      'Video Stabilizing tool in C++': {
        title: 'Video Stabilizer Tool leveraging OpenCV',
        desc: 'A basic level Video Stabilizing tool written in C++ leveraging the OpenCV library for all the mathy work! ',
        techStack: 'C++',
        link: 'https://github.com/Mustafa-khann/Video-Stabilizer',
      },
    };

    return (
      <div id='projects'>
        <div className='projects-container'>
          <div className='section-header'>
            <span className='section-title'>Featured Projects</span>
            <div className='section-line'></div>
          </div>
          
          <div className='projects-intro'>
            <h2 className='projects-heading'>
              Turning Ideas 
              <span className='highlight'> Into Systems</span>
            </h2>
            <p className='projects-subtitle'>
              From AI apps to hardware prototypes, these projects reflect my drive to take concepts off the page and make them real.
            </p>
          </div>


          <div className='spotlight-section'>
            <h3 className='spotlight-title'>Spotlight Projects</h3>
            <div className='carousel-container'>
              <Carousel className='project-carousel'>
                {Object.keys(spotlightProjects).map((key, i) => (
                  <Carousel.Item key={i}>
                    <div className='carousel-item-container'>
                      <img className='carousel-image' src={spotlightProjects[key]['image']} alt={key} />
                      <div className='carousel-overlay'>
                        <div className='carousel-content'>
                          <h3 className='carousel-project-title'>
                            {spotlightProjects[key]['title']}
                          </h3>
                          <p className='carousel-project-desc'>
                            {spotlightProjects[key]['desc']}
                          </p>
                          <div className='carousel-tech-stack'>
                            {spotlightProjects[key]['techStack']}
                          </div>
                          {spotlightProjects[key]['link'] && (
                            <div className='carousel-links'>
                              <a 
                                href={spotlightProjects[key]['link']} 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='carousel-link'
                              >
                                <GitHubIcon />
                                <span>View Code</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>

          <div className='all-projects-section'>
            <h3 className='all-projects-title'>All Projects</h3>
            <div className='projects-grid'>
              {Object.keys(projects).map((key, i) => (
                <FadeInSection delay={`${i * 100}ms`} key={i}>
                  <div className='project-card'>
                    <div className='project-card-header'>
                      <div className='project-folder-icon'>
                        <FolderOpenRoundedIcon />
                      </div>
                      <div className='project-links'>
                        {projects[key]['link'] && (
                          <a 
                            href={projects[key]['link']} 
                            target='_blank' 
                            rel='noopener noreferrer'
                            className='project-link'
                          >
                            <GitHubIcon />
                          </a>
                        )}
                        {projects[key]['open'] && (
                          <a 
                            href={projects[key]['open']} 
                            target='_blank' 
                            rel='noopener noreferrer'
                            className='project-link'
                          >
                            <LaunchIcon />
                          </a>
                        )}
                      </div>
                    </div>

                    <h4 className='project-title'>
                      {projects[key]['title'] || key}
                    </h4>
                    
                    <p className='project-description'>
                      {projects[key]['desc']}
                    </p>
                    
                    <div className='project-tech-stack'>
                      {projects[key]['techStack']}
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
