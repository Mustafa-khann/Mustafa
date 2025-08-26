import React from 'react';
import { Intro, About, Experience, Projects, Credits } from '../components/sections';
import { SEO } from '../components/common';

const HomePage = () => {
  return (
    <div className='home-page'>
      <SEO title='Home' description='Essays, projects and ideas by Mustafa Khan.' url='/' type='website' />
      <Intro />
      <About />
      <Experience />
      <Projects />
      <Credits />
    </div>
  );
};

export default HomePage;
