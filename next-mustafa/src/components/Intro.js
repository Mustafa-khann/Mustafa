"use client";

import React, { useState, useEffect } from "react";
import "../styles/Intro.css";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import FadeInSection from "./FadeInSection";
// We'll need to adapt or replace RoboticArm if it's complex
// import RoboticArm from "./RoboticArm";

const Intro = () => {
  const [text, setText] = useState("");
  const fullText = "hi, ";
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let index = 0;
    // Type the intro text
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setShowContent(true);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="intro" style={{ paddingTop: 10 }}>
      {/* <RoboticArm /> */}
      <div className="Typist">
        {text}
        {showContent && (
          <span className="intro-title">
            <span className="intro-name">{"Mustafa"}</span>
            {" here."}
          </span>
        )}
        <span className="Cursor--blinking">|</span>
      </div>
      <FadeInSection>
        <div className="intro-subtitle">I engineer.</div>
        <div className="intro-desc">
          I'm Mustafa Khan, an Embedded Systems Engineer and Robotics enthusiast
          focused on AI-driven automation, industrial robotics, and large-scale
          manufacturing.
        </div>
        <a href="mailto:mustafakhann050@gmail.com" className="intro-contact">
          <EmailRoundedIcon />
          {" Say hi!"}
        </a>
      </FadeInSection>
    </div>
  );
};

export default Intro; 