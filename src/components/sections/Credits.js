import React from 'react';
import '../../styles/Credits.css';
import FadeInSection from '../common/FadeInSection';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CodeIcon from '@material-ui/icons/Code';

class Credits extends React.Component {
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
    return (
      <div id='credits'>
        <div className='credits-container'>
          <FadeInSection>
            <div className='credits-content'>
              <div className='credits-icon'>
                <CodeIcon />
              </div>
              
              <h2 className='credits-heading'>
                Built with 
                <span className='highlight'> Passion</span> and Purpose
              </h2>
              
              <p className='credits-description'>
                This portfolio represents my journey in technology and my commitment to 
                creating meaningful digital experiences. Every line of code, every design 
                decision, and every interaction has been crafted with care.
              </p>
              
              <div className='credits-divider'></div>
              
              <div className='credits-footer'>                
                <div className='credits-heart'>
                  <FavoriteIcon />
                  <span>Made with love</span>
                </div>
                
                <div className='credits-year'>
                  <span>© 2025 Mustafa Khan</span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    );
  }
}

export default Credits;
