import React from 'react';
import { Intro, About, Experience, Projects, Credits } from '../components/sections';
import { SEO } from '../components/common';

const HomePage = () => {
  return (
    <div className='home-page'>
      <SEO 
        title='Home' 
        description='Software Engineer & Researcher - Essays, projects, and ideas on technology, robotics, and philosophy.' 
        url='/' 
        type='website'
        contentType='home'
        author='Mustafa Khan'
      />
      <Intro />
      <About />
      <Experience />
      <Projects />
      <Credits />
    </div>
  );
};

export default HomePage;
