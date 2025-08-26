import React from 'react';

import '../../styles/Intro.css';
import { TypeAnimation } from 'react-type-animation';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import FadeInSection from '../common/FadeInSection';
import RoboticArm from '../features/RoboticArm';

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: '1',
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
      <div id='intro' style={{ paddingTop: 10 }}>
        {/* <RoboticArm></RoboticArm> */}
        {/* <TypeAnimation
          sequence={['hi, Mustafa here.']}
          wrapper='span'
          speed={50}
          className='intro-title'
          cursor={false}
        /> */}
        <h1 className='intro-title'>hi, Mustafa here.</h1>
        <FadeInSection>
          <div className='intro-subtitle'>I build apps.</div>
          <div className='intro-desc'>
            I'm Mustafa Khan; a Full-Stack Engineer who builds AI-powered Web and Mobile
            applications. I combine engineering depth with creativity, whether it’s crafting smooth
            user experiences, integrating intelligent agents, or taking an idea from MVP to
            production.
          </div>
          <a href='mailto:mustafakhann050@gmail.com' className='intro-contact'>
            <EmailRoundedIcon></EmailRoundedIcon>
            {" Let's talk!"}
          </a>
        </FadeInSection>
      </div>
    );
  }
}

export default Intro;
