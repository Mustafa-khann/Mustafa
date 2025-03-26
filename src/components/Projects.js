import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-bootstrap/Carousel";
import ExternalLinks from "./ExternalLinks";

class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1"
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }
  render() {
    const spotlightProjects = {
      "HermesX - Autonomous Drone for Package Delivery": {
        title: "HermesX - Autonomous Drone for Package Delivery",
        desc: "Built a fully functional prototype that delivers a first aid kit to a specific GPS location via a mobile app in emergency situations",
        techStack: "Pixhawk, ROS, Python, C++, React Native",
        image: "/assets/drone-1080.jpg"
      },
      "Anky - 5 DoF Robotic Arm": {
        title: "Anky - 5 DoF Robotic Arm",
        desc: "A desktop-scale 3D Printed 5-DoF robotic arm with precision control for pick-and-place operations. Features inverse kinematics implementation for intuitive positioning, and a user-friendly control interface. Capable of automated sequence programming and manual control via joystick.",
        techStack: "Arduino, C++, Servo Control, Inverse Kinematics",
        image: "/assets/arm-1080.jpeg"
      },
      "Tiny OS": {
        title: "Tiny OS",
        desc: "A tiny operating system for the Raspberry Pi written purely in C, with the bootloader in assembly.",
        techStack: "C, Assembly",
        link: "https://github.com/Mustafa-khann/TinyOS",
        image: "/assets/tinyos.jpeg"
      },
      "Tiny Compiler": {
        title: "Tiny Compiler",
        desc: "A tiny compiler for C like language, with a complete lexer, parser, and code generator.",
        techStack: "C",
        link: "https://github.com/Mustafa-khann/TinyCompiler",
        image: "/assets/tinycompiler.jpeg"
      },
      "MNIST Digit Recognizer Neural Network in C": {
        title: "MNIST Digit Recognizer Neural Network in C",
        desc: "A MNIST digit recognizer neural network purely written in C. Yeilds 90% accuracy.",
        techStack: "C",
        link: "https://github.com/Mustafa-khann/MNIST-Digit-Recognizer",
        image: "/assets/digitrecognizer.jpeg"
      },
    }
    const projects = {
      "Tiny OS": {
        title: "Tiny OS",
        desc: "A tiny operating system for the Raspberry Pi written purely in C, with the bootloader in assembly.",
        techStack: "C, Assembly",
        link: "https://github.com/Mustafa-khann/TinyOS",
        image: "/assets/tinyos.png"
      },
      "Tiny Compiler": {
        title: "Tiny Compiler",
        desc: "A tiny compiler for C like language, with a complete lexer, parser, and code generator.",
        techStack: "C",
        link: "https://github.com/Mustafa-khann/TinyCompiler",
        image: "/assets/tinycompiler.png"
      },
      "Urdu Text Generation Using GAN Architecture": {
        title: "Urdu Text Generation Using GAN Architecture",
        desc:
          "Developed a GAN-based Urdu text generator, leveraging transformer architecture to overcome long-range text dependencies.",
        techStack: "Python, PyTorch, Transformer",
      },
      "Rusty Transformer": {
        desc:
          "The Transformer architecture implemented in Rust",
        techStack: "Rust",
        link:
          "https://github.com/Mustafa-khann/rusty-transformer"
      },
      "LLama 3.0 Resume Analyzer": {
        desc:
          "LLama 3.0 based resume analyzer that analyzes your resume and gives you a score and suggestions on how to improve it.",
        techStack: "Python, Nodejs, Ollama",
      },
      "Sign Language Recognizer Neural Network in C": {
        title: "Sign Language Recognizer Neural Network in C",
        desc: "A sign language recognizer neural network purely written in C. Yeilds 73% accuracy on the MNIST Sign Language Dataset.",
        techStack: "C",
        link: "https://github.com/Mustafa-khann/Sign-Language-Recognizer",
      },
      "CNN Architecture from Scratch in C": {
        title: "CNN Architecture from Scratch in C",
        desc: "Built a convolutional neural network in C, implementing convolutions, pooling, and backpropagation to understand how CNNs process images.",
        techStack: "C",
        link: "https://github.com/Mustafa-khann/CNN-Architecture-from-Scratch-in-C",
      }
    };

    return (
      <div id="projects">
        <div className="section-header ">
          <span className="section-title">/ pet projects</span>
        </div>
        <Carousel>
          {Object.keys(spotlightProjects).map((key, i) => (
            <Carousel.Item key={i}>
              <img
                className="d-block w-100"
                src={spotlightProjects[key]["image"]}
                alt={key}
              />
              <div className="caption-bg">
                <Carousel.Caption className="carousel-caption-centered">
                  <h3 style={{ color: "var(--lightest-slate)" }}>{spotlightProjects[key]["title"]}</h3>
                  <p>
                    {spotlightProjects[key]["desc"]}
                    <p className="techStack">
                      {spotlightProjects[key]["techStack"]}
                    </p>
                  </p>
                  <ExternalLinks
                    githubLink={spotlightProjects[key]["link"]}
                    openLink={spotlightProjects[key]["open"]}
                  ></ExternalLinks>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="project-container">
          <ul className="projects-grid">
            {Object.keys(projects).map((key, i) => (
              <FadeInSection delay={`${i + 1}00ms`}>
                <li className="projects-card">
                  <div className="card-header">
                    <div className="folder-icon">
                      <FolderOpenRoundedIcon
                        style={{ fontSize: 35 }}
                      ></FolderOpenRoundedIcon>
                    </div>
                    <ExternalLinks
                      githubLink={projects[key]["link"]}
                      openLink={projects[key]["open"]}
                    ></ExternalLinks>
                  </div>

                  <div className="card-title" style={{ color: "var(--green-bright)" }}>{key}</div>
                  <div className="card-desc">{projects[key]["desc"]}</div>
                  <div className="card-tech">{projects[key]["techStack"]}</div>
                </li>
              </FadeInSection>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Projects;
