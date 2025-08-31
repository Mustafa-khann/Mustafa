import React from 'react';
import '../../styles/About.css';
import FadeInSection from '../common/FadeInSection';
import CodeIcon from '@material-ui/icons/Code';
import BrushIcon from '@material-ui/icons/Brush';
import MemoryIcon from '@material-ui/icons/Memory';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import BuildIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';

class About extends React.Component {
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
    const tech_stack = [
      { category: 'Software', items: ['Full-stack Development', 'Backend Systems', 'AI Applications'] },
      { category: 'Hardware', items: ['3D Printing', 'Electronics Prototyping', 'Motion Systems'] },
      { category: 'Domains', items: ['Systems Thinking', 'Nature-inspired Design', 'Engineering at Scale'] },
      { category: 'Tools', items: ['Arduino', 'Raspberry Pi', 'Sensors & Actuators'] },
    ];
    
    const skills = [
      {
        icon: <BuildIcon />,
        title: 'Software + Hardware',
        description: 'Bridging digital and physical systems—building apps, robotics, and connected devices.'
      },
      {
        icon: <EmojiObjectsIcon />,
        title: 'Cross-Disciplinary Thinking',
        description: 'Pulling ideas from nature, psychology, and engineering to spark new approaches.'
      },
      {
        icon: <SettingsIcon />,
        title: 'Design with Constraints',
        description: 'Focusing on clarity, trade-offs, and robustness instead of feature overload.'
      }
    ];
    

    return (
      <div id='about'>
        <div className='about-container'>
          <FadeInSection>
            <div className='section-header'>
              <span className='section-title'>About Me</span>
              <div className='section-line'></div>
            </div>
            
            <div className='about-content'>
              <div className='about-text-section'>
                <div className='about-intro'>
                  <h2 className='about-heading'>
                    Engineering Ideas into 
                    <span className='highlight'> Reality</span>
                  </h2>
                  
                  <div className='about-description'>
                    <p className='about-paragraph'>
                      I'm Mustafa Khan, a software engineer and builder working at the intersection of software, hardware, and systems. For me, code and circuits are just different tools for making ideas real.
                    </p>

                    <p className='about-paragraph'>
                      My focus is on turning concepts into working systems—whether that’s AI-driven apps, robotics prototypes, or design experiments inspired by nature and engineering principles.
                    </p>

                    <p className='about-paragraph'>
                      Outside of work, I spend time exploring new tools, practicing archery, and reading about systems, strategy, and history. I see engineering as art with constraints, where elegance and practicality meet.
                    </p>
                  </div>
                </div>

                <div className='skills-grid'>
                  {skills.map((skill, index) => (
                    <FadeInSection delay={`${index * 200}ms`} key={index}>
                      <div className='skill-card'>
                        <div className='skill-icon'>
                          {skill.icon}
                        </div>
                        <h3 className='skill-title'>{skill.title}</h3>
                        <p className='skill-description'>{skill.description}</p>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </div>

              <div className='about-visual-section'>
                <div className='profile-card'>
                  <div className='profile-image-container'>
                    <img alt='Mustafa Khan' src={'/assets/mustafa.jpeg'} className='profile-image' />
                    <div className='profile-overlay'></div>
                  </div>
                  
                  <div className='tech-stack-section'>
                    <h3 className='tech-stack-title'>Technologies & Interests</h3>
                    <div className='tech-categories'>
                      {tech_stack.map((category, index) => (
                        <FadeInSection delay={`${index * 100}ms`} key={category.category}>
                          <div className='tech-category'>
                            <h4 className='category-title'>{category.category}</h4>
                            <div className='tech-items'>
                              {category.items.map((item, itemIndex) => (
                                <span key={itemIndex} className='tech-item'>{item}</span>
                              ))}
                            </div>
                          </div>
                        </FadeInSection>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    );
  }
}

export default About;
