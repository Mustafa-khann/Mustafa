import React from 'react';
import '../../styles/Intro.css';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import FadeInSection from '../common/FadeInSection';
import { TypeAnimation } from 'react-type-animation';

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
      <div id='intro'>
        <div className='intro-container'>
          <FadeInSection>
            <div className='intro-content'>
              <div className='intro-greeting'>
                <span className='greeting-text'>Hello, I'm</span>
              </div>
              
              <div className='intro-name-animation'>
                <TypeAnimation
                  sequence={[
                    'Mustafa Khan',
                    2000,
                    '',
                  ]}
                  wrapper='h1'
                  speed={50}
                  className='intro-title'
                  cursor={true}
                  repeat={Infinity}
                />
              </div>
              
              <div className='intro-subtitle'>
                <span className='role-text'>Software</span>
                <span className='role-separator'>•</span>
                <span className='specialty-text'>Hardware</span>
              </div>
              
              <div className='intro-desc'>
              I make code tangible, hardware smart, and ideas real.
              </div>
              
              <div className='intro-actions'>
                <a href='mailto:mustafakhann050@gmail.com' className='intro-contact primary-btn'>
                  <EmailRoundedIcon />
                  <span>Get In Touch</span>
                </a>
                
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    );
  }
}

export default Intro;
