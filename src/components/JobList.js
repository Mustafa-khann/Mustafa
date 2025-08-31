import React from 'react';
import PropTypes from 'prop-types';
import FadeInSection from './common/FadeInSection';
import WorkIcon from '@material-ui/icons/Work';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const JobList = () => {
  const [activeJob, setActiveJob] = React.useState(0);

  const experienceItems = [
    {
      company: 'Self Employed',
      jobTitle: 'Software Engineer',
      duration: 'JUN 2025 - PRESENT',
      location: 'On-site',
      desc: [
        'Building AI-powered web and mobile applications with React, React Native, and MERN stack.',
        'Designing and integrating intelligent agents (LLMs, LangChain) to automate workflows and enhance user experience.',
        'Developing custom APIs and backend systems in Node.js/Golang with scalable database solutions (MongoDB, PostgreSQL).',
        'Helping startups and businesses turn ideas into production-ready products, from MVPs to full-scale deployments.',
      ],
    },
    {
      company: 'VeevoTech',
      jobTitle: 'Software Engineer',
      duration: 'APR 2025 - May 2025',
      location: 'On-site',
      desc: [
        'Designing touch screen user interfaces and developing embedded system firmware using C/C++/Arduino.',
        'Conducting R&D to address product design challenges and enhance efficiency/performance of various components.',
        'Learning to design circuitry, create 3D models for product casings, and researching potential game-changing ICs.',
      ],
    },
    {
      company: 'AntonX',
      jobTitle: 'Software Engineer',
      duration: 'SEP 2024 - APR 2025',
      location: 'On-Site',
      desc: [
        'Collaborating with senior engineers to design and implement features across the full tech stack, ensuring seamless functionality and user experience.',
        'Writing clean, efficient, and well-documented code in Javascript & PHP Laravel to meet project requirements and improve overall system performance.',
        'Testing and debugging applications, resolving issues, and ensuring the delivery of high-quality, reliable software.',
      ],
    },
  ];

  return (
    <div className='joblist-container'>
      <div className='joblist-header'>
        <h3 className='joblist-title'>Work Experience</h3>
        <p className='joblist-subtitle'>My professional journey in software engineering</p>
      </div>
      
      <div className='joblist-content'>
        <div className='job-cards'>
          {experienceItems.map((job, index) => (
            <FadeInSection delay={`${index * 200}ms`} key={index}>
              <div 
                className={`job-card ${activeJob === index ? 'active' : ''}`}
                onClick={() => setActiveJob(index)}
              >
                <div className='job-card-header'>
                  <div className='job-company-info'>
                    <h4 className='job-company'>{job.company}</h4>
                    <div className='job-meta'>
                      <div className='job-meta-item'>
                        <WorkIcon />
                        <span>{job.jobTitle}</span>
                      </div>
                      <div className='job-meta-item'>
                        <CalendarTodayIcon />
                        <span>{job.duration}</span>
                      </div>
                      <div className='job-meta-item'>
                        <LocationOnIcon />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className='job-status'>
                    {activeJob === index && <div className='active-indicator'></div>}
                  </div>
                </div>
                
                {activeJob === index && (
                  <div className='job-details'>
                    <div className='job-description'>
                      <ul className='job-responsibilities'>
                        {job.desc.map((item, itemIndex) => (
                          <li key={itemIndex} className='responsibility-item'>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
