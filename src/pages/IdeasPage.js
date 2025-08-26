import React from 'react';
import Ideas from '../components/Ideas';
import { SEO } from '../components/common';

const IdeasPage = () => {
  return (
    <div className='ideas-page'>
      <SEO title='Ideas' description='Research notes and ideas.' url='/ideas' type='website' />
      <Ideas />
    </div>
  );
};

export default IdeasPage;
