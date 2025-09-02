import React from 'react';
import { Intro, About, Experience, Projects, Credits } from '../components/sections';
import { SEO } from '../components/common';

const HomePage = () => {
  return (
    <div className='home-page'>
      <SEO title='Mustafa Khan' description='Essays, projects and ideas by Mustafa Khan.' url='/' type='website' contentType='home' />
      <Intro />
      <About />
      <Experience />
      <Projects />
      <Credits />
    </div>
  );
};

export default HomePage;
