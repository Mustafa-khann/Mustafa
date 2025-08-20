import React from 'react';
import { Intro, About, Experience, Projects, Credits } from '../components/sections';

const HomePage = () => {
  return (
    <div className='home-page'>
      <Intro />
      <About />
      <Experience />
      <Projects />
      <Credits />
    </div>
  );
};

export default HomePage;
