import React, { useEffect, useState } from 'react';

/**
 * A hairline at the top edge showing how far through the page you are.
 *
 * Two jobs. It answers "how long is this?" before the reader has to guess, and
 * a visible finish line pulls people toward it — the closer the end looks, the
 * more likely they are to reach it. Shares the 1px top slot with the route
 * indicator so "something is happening up there" stays a single idea.
 */
const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let frame = 0;

        const measure = () => {
            frame = 0;
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
        };

        const schedule = () => {
            if (frame) return;
            frame = window.requestAnimationFrame(measure);
        };

        measure();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);

        return () => {
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, []);

    return (
        <div className="read-progress" aria-hidden="true">
            <div className="read-progress__bar" style={{ transform: `scaleX(${progress})` }} />
        </div>
    );
};

export default ReadingProgress;
