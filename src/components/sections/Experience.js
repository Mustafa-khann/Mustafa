import React from 'react';
import JobList from '../JobList';
import '../../styles/Experience.css';
import FadeInSection from '../common/FadeInSection';
import WorkIcon from '@material-ui/icons/Work';
import TimelineIcon from '@material-ui/icons/Timeline';
import BusinessIcon from '@material-ui/icons/Business';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

class Experience extends React.Component {
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
      <div id='experience'>
        <div className='experience-container'>
          <FadeInSection>
            <div className='section-header'>
              <span className='section-title'>Professional Experience</span>
              <div className='section-line'></div>
            </div>
            
            <div className='experience-intro'>
              <div className='experience-icon'>
                <WorkIcon />
              </div>
              <h2 className='experience-heading'>
                Engineering the Future, 
                <span className='highlight'> Project by Project</span>
              </h2>
              <p className='experience-subtitle'>
                Every build adds a new layer of skill; from software to hardware, shaping me into an engineer who thrives across the stack.
              </p>

            </div>
            
            <div className='experience-content'>
              <JobList />
            </div>
            
          </FadeInSection>
        </div>
      </div>
    );
  }
}

export default Experience;
