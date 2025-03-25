import React from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";

class Credits extends React.Component {
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
    return (
      <FadeInSection>
        <div id="credits">
          <div className="ending-credits">
            <div>Design by Gazi Jarin</div>
            <div><a href="https://www.gazijarin.com/" target="_blank" rel="noopener noreferrer">gazijarin.com</a> </div>
          </div>
        </div>
      </FadeInSection>
    );
  }
}

export default Credits;
