import React from 'react';
import Header from '../components/sections/Header';
import WhatThisIs from '../components/sections/WhatThisIs';
import Outputs from '../components/sections/Outputs';
import LabLog from '../components/sections/LabLog';
import HowIWork from '../components/sections/HowIWork';
import Domains from '../components/sections/Domains';
import CollaborationBoundary from '../components/sections/CollaborationBoundary';
import Footer from '../components/sections/Footer';

/**
 * Ordered as the reader's questions arrive: who is this, is anything real here,
 * is it still running, how do they think, what's the scope, can I work with
 * them.
 *
 * Evidence comes second rather than fifth. The first scroll is a contract test
 * — a visitor is deciding whether there is anything behind the claims — and
 * three sections of methodology is the wrong answer to that question.
 *
 * There is exactly one set of navigation, in the header. A second copy at the
 * bottom said the same four things again four screens later, which is the kind
 * of thing that makes a short site feel long.
 *
 * Spacing is set here rather than inside each section because rhythm is a page
 * concern: the wider gaps mark the three movements, and proximity does the
 * grouping that identically-weighted headings cannot.
 */
const HomePage = () => (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <Header />
        <WhatThisIs className="pt-2 pb-12" />

        <Outputs className="pt-14 md:pt-20 pb-12" />
        <LabLog className="pt-12 pb-12" />

        <HowIWork className="pt-14 md:pt-20 pb-12" />
        <Domains className="pt-12 pb-12" />

        <CollaborationBoundary className="pt-14 md:pt-20 pb-4" />

        <Footer />
    </main>
);

export default HomePage;
