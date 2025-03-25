import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

class About extends React.Component {
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
    const one = (
      <p>
        
         I am currently an <b>Embedded Systems R&D Engineer</b> at 
         <a href="https://www.veevotech.com/"> VeevoTech</a>, working with the System Firmware team. 
      </p>
    );
    const two = (
      <p>
        Outside of work, I explore philosophy, psychology, engineering, art and design. I also enjoy reading, experimenting with robotics, and getting lost in deep introspection. 
        <br></br>Sometimes, I sprint, to clear my mind.
        </p>
    );

    const tech_stack = [
      "C/C++",
      "Assembly",
      "Python",
      "ML & AI",
      "ROS",
      "MERN Stack"
    ];

    return (
      <div id="about">
        <FadeInSection>
          <div className="section-header ">
            <span className="section-title">/ about me</span>
          </div>
          <div className="about-content">
            <div className="about-description">
              {[one]}
              {"Here are some technologies I have been working with:"}
              <ul className="tech-stack">
                {tech_stack.map(function (tech_item, i) {
                  return (
                    <FadeInSection delay={`${i + 1}00ms`}>
                      <li>{tech_item}</li>
                    </FadeInSection>
                  );
                })}
              </ul>
              {[two]}
            </div>
            <div className="about-image">
              <img alt="Mustafa Khan" src={"/assets/mustafa.jpeg"} />
            </div>
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default About;
