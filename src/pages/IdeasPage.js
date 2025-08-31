import React from 'react';
import Ideas from '../components/Ideas';
import { SEO } from '../components/common';

const IdeasPage = () => {
  return (
    <div className='ideas-page'>
      <SEO 
        title='Ideas' 
        description='Research notes, explorations, and intellectual inquiries into technology, AI, robotics, and philosophy.' 
        url='/ideas' 
        type='website'
        contentType='ideas'
      />
      <Ideas />
    </div>
  );
};

export default IdeasPage;
