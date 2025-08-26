import React from 'react';
import { SEO } from '../components/common';

const DisclosurePage = () => {
  return (
    <div className='disclosure-page' style={{ padding: '24px' }}>
      <SEO title='Affiliate Disclosure' description='Affiliate link disclosure and policy.' url='/disclosure' type='website' />
      <h1>Affiliate Disclosure</h1>
      <p>
        Some of the links on this site are affiliate links. This means that if you click on the link and purchase the item, I may receive a small commission at no additional cost to you. These commissions help support my work and allow me to keep creating content.
      </p>
      <p>
        I only recommend products or services that I have used personally or believe will add value. My opinions are my own and are not influenced by any affiliate partnerships.
      </p>
      <p>
        If you have any questions about this disclosure, please contact me.
      </p>
    </div>
  );
};

export default DisclosurePage;


