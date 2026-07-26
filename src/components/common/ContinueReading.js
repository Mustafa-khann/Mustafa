import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const Cell = ({ item, label, align = 'left' }) => {
    if (!item) return <span className="hidden sm:block bg-white" />;

    const isRight = align === 'right';

    return (
        <Link
            to={item.to}
            className={`group no-underline block bg-white p-5 transition-colors hover:bg-neutral-50 ${isRight ? 'sm:text-right' : ''}`}
        >
            <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">
                {isRight ? `${label} →` : `← ${label}`}
            </span>
            <span className="block text-sm font-bold leading-snug text-neutral-800 group-hover:text-neutral-900 transition-colors">
                {item.title}
            </span>
            {item.meta && (
                <span className="block mt-2 font-mono text-[10px] text-neutral-400">{item.meta}</span>
            )}
        </Link>
    );
};

/**
 * The end of a page is the part people remember, and until now every article
 * here ended in white space with its only navigation scrolled far off the top.
 * This gives the reader somewhere to go at the exact moment they finish.
 */
const ContinueReading = ({
    previous,
    next,
    previousLabel = 'Previous',
    nextLabel = 'Next',
    allTo,
    allLabel,
}) => (
    <Reveal as="nav" className="mt-20 pt-8 border-t border-neutral-100" aria-label="Continue reading">
        {(previous || next) && (
            <div className="grid sm:grid-cols-2 gap-px bg-neutral-100 border border-neutral-100 mb-8">
                <Cell item={previous} label={previousLabel} />
                <Cell item={next} label={nextLabel} align="right" />
            </div>
        )}

        <Link to={allTo} className="back-link">
            ← {allLabel}
        </Link>
    </Reveal>
);

export default ContinueReading;
