import React from "react";

import "../styles/Intro.css";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import FadeInSection from "./FadeInSection";
import RoboticArm from "./RoboticArm";

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1",
      visible: true,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey,
    });
  }
  render() {
    return (
      <div id="intro" style={{ paddingTop: 10 }}>
        <RoboticArm></RoboticArm>
        <Typist avgTypingDelay={120}>
          {"hi, "}
        <span className="intro-title">
            <span className="intro-name">{"Mustafa"}</span>
            {" here."}
          </span>
        </Typist>
        <FadeInSection>
          <div className="intro-subtitle">I engineer.</div>
          <div className="intro-desc">
          I'm Mustafa Khan, an Embedded Systems Engineer and Robotics enthusiast focused on AI-driven automation, industrial robotics, and large-scale manufacturing. 
          </div>
          <a
            href="mailto:mustafakhann050@gmail.com"
            className="intro-contact"
          >
            <EmailRoundedIcon></EmailRoundedIcon>
            {" Say hi!"}
          </a>
        </FadeInSection>
      </div>
    );
  }
}

export default Intro;
