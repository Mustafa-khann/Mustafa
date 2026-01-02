import React from 'react';
import Header from '../components/sections/Header';
import WhatThisIs from '../components/sections/WhatThisIs';
import HowIWork from '../components/sections/HowIWork';
import Domains from '../components/sections/Domains';
import Outputs from '../components/sections/Outputs';
import CurrentSetup from '../components/sections/CurrentSetup';
import CollaborationBoundary from '../components/sections/CollaborationBoundary';
import Footer from '../components/sections/Footer';
import '../styles/Lab.css';

const HomePage = () => {
  return (
    <main className="lab-page">
      <Header />
      <WhatThisIs />
      <HowIWork />
      <Domains />
      <Outputs />
      <CurrentSetup />
      <CollaborationBoundary />
      <Footer />
    </main>
  );
};

export default HomePage;
