import React from 'react';
import Header from '../components/sections/Header';
import WhatThisIs from '../components/sections/WhatThisIs';
import Outputs from '../components/sections/Outputs';
import LabLog from '../components/sections/LabLog';
import HowIWork from '../components/sections/HowIWork';
import Domains from '../components/sections/Domains';
import CollaborationBoundary from '../components/sections/CollaborationBoundary';
import SiteIndex from '../components/sections/SiteIndex';
import Footer from '../components/sections/Footer';

/**
 * Ordered as the reader's questions arrive: who is this, is anything real here,
 * is it still running, how do they think, what's the scope, can I work with
 * them, where do I go next.
 *
 * Evidence comes second rather than fifth. The first scroll is a contract test
 * — a visitor is deciding whether there is anything behind the claims — and
 * three sections of methodology is the wrong answer to that question.
 *
 * Spacing is set here rather than inside each section because rhythm is a page
 * concern: the wider gaps mark the four movements, and proximity does the
 * grouping that seven identically-weighted headings cannot.
 */
const HomePage = () => (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <Header />
        <WhatThisIs className="pt-4 pb-16" />

        <Outputs className="pt-16 md:pt-24 pb-14" />
        <LabLog className="pt-14 pb-16" />

        <HowIWork className="pt-16 md:pt-24 pb-14" />
        <Domains className="pt-14 pb-16" />

        <CollaborationBoundary className="pt-16 md:pt-24 pb-14" />
        <SiteIndex className="pt-14 pb-4" />

        <Footer />
    </main>
);

export default HomePage;
