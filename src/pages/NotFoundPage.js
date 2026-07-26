import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SiteIndex from '../components/sections/SiteIndex';

/**
 * A 404 is a moment of mild frustration, which makes it one of the better
 * places on a site to be useful. This one says what happened, then offers the
 * whole index rather than a single "Return" link back to the top of the funnel.
 *
 * (It previously used `max-w-lab`, a class that was never defined, so the page
 * rendered unstyled and flush against the left edge.)
 */
const NotFoundPage = () => {
    const { pathname } = useLocation();

    return (
        <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
            <header className="pt-8 md:pt-20 mb-4">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 mb-5">
                    404
                </p>
                <h1 className="page-title">No such page</h1>
                <p className="text-neutral-500 max-w-2xl leading-relaxed">
                    There is nothing at{' '}
                    <code className="bg-neutral-100 px-1.5 py-0.5 text-sm text-neutral-800">
                        {pathname}
                    </code>{' '}
                    — it may have been renamed.
                </p>
                <Link to="/" className="back-link mt-8 inline-flex">← Back to the start</Link>
            </header>

            <SiteIndex className="pt-14 pb-4" title="Or try one of these" />
        </main>
    );
};

export default NotFoundPage;
