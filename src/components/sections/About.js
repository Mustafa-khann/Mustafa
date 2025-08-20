import React from 'react';
import '../../styles/About.css';
import FadeInSection from '../common/FadeInSection';

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
    const one = (
      <p>
        I’m a <b>Full-Stack Web & Mobile Developer</b> who builds apps powered by modern AI and
        intelligent agents. I design end-to-end solutions — from backend APIs and databases to
        clean, responsive frontends.
      </p>
    );

    const two = (
      <p>
        I’ve worked on projects ranging from <b>AI-powered learning platforms </b>
        to <b>habit-tracking apps</b>, with experience in React, React Native, Golang, Node.js,
        MongoDB, and LLM integrations. If you’ve got an idea, I can turn it into a working product.
      </p>
    );

    const three = (
      <p>
        Beyond code, I’m endlessly curious about how technology, psychology, and design intersect. I
        read, experiment, and sometimes sprint to clear my head — but I always come back with
        sharper ideas.
      </p>
    );

    const tech_stack = [
      'Web & Mobile: React, React Native, MERN, Laravel',
      'Backend & APIs: Node.js, Golang, Python',
      'AI & Agents: LLMs, LangChain, Python (ML/AI frameworks)',
      'Robotics/Systems: C/C++, ROS, RL',
    ];

    return (
      <div id='about'>
        <FadeInSection>
          <div className='section-header '>
            <span className='section-title'>/ about me</span>
          </div>
          <div className='about-content'>
            <div className='about-description'>
              {[one]}
              {'Here are some technologies I have been working with:'}
              <ul
                className='tech-stack'
                style={{
                  width: '520px', // Increased width for better layout
                  maxWidth: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem 2.5rem',
                  marginTop: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                {tech_stack.map(function (tech_item, i) {
                  return (
                    <FadeInSection delay={`${i + 1}00ms`} key={tech_item}>
                      <li style={{ whiteSpace: 'pre-line' }}>{tech_item}</li>
                    </FadeInSection>
                  );
                })}
              </ul>
              {[two]}
              {[three]}
            </div>
            <div className='about-image'>
              <img alt='Mustafa Khan' src={'/assets/mustafa.jpeg'} />
            </div>
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default About;
