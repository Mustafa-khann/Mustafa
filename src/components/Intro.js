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
        <div className="intro-subtitle">I build apps.</div>
          <div className="intro-desc">
            I'm Mustafa Khan; a Full-Stack Engineer who builds AI-powered Web and Mobile applications. 
            I combine engineering depth with creativity, whether it’s crafting smooth user experiences, 
            integrating intelligent agents, or taking an idea from MVP to production. 
          </div>
          <a
            href="mailto:mustafakhann050@gmail.com"
            className="intro-contact"
          >
            <EmailRoundedIcon></EmailRoundedIcon>
            {" Let's talk!"}
          </a>
        </FadeInSection>
      </div>
    );
  }
}

export default Intro;
