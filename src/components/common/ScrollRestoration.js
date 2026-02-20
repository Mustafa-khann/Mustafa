import { useEffect, useRef, useLayoutEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const STORAGE_KEY = 'scroll_positions';

// Helper to get/set scroll positions from sessionStorage
const getScrollPositions = () => {
    try {
        const data = sessionStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
};

const saveScrollPosition = (path, position) => {
    try {
        const positions = getScrollPositions();
        positions[path] = position;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
    } catch {
        // Ignore storage errors
    }
};

const getScrollPosition = (path) => {
    const positions = getScrollPositions();
    return positions[path];
};

const ScrollRestoration = () => {
    const location = useLocation();
    const history = useHistory();
    const prevPathRef = useRef(location.pathname);
    const isRestoringRef = useRef(false);

    // Disable browser's native scroll restoration
    useLayoutEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    // Save scroll position on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!isRestoringRef.current) {
                saveScrollPosition(location.pathname, window.scrollY);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            // Save final position before leaving
            if (!isRestoringRef.current) {
                saveScrollPosition(location.pathname, window.scrollY);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    // Handle navigation with scroll restoration
    useEffect(() => {
        const isPop = history.action === 'POP';
        const currentPath = location.pathname;
        const previousPath = prevPathRef.current;

        // Disable smooth scroll for restoration
        const disableSmoothScroll = () => {
            document.documentElement.style.scrollBehavior = 'auto';
            document.body.style.scrollBehavior = 'auto';
        };

        const enableSmoothScroll = () => {
            document.documentElement.style.scrollBehavior = '';
            document.body.style.scrollBehavior = '';
        };

        if (isPop) {
            // Back/forward navigation - restore scroll position
            const savedPosition = getScrollPosition(currentPath);

            if (savedPosition !== undefined && savedPosition > 0) {
                isRestoringRef.current = true;
                disableSmoothScroll();

                // Retry logic to wait for content to render
                let attempts = 0;
                const maxAttempts = 20;

                const tryRestore = () => {
                    const maxScroll = Math.max(0, document.body.scrollHeight - window.innerHeight);

                    if (maxScroll >= savedPosition || attempts >= maxAttempts) {
                        window.scrollTo(0, Math.min(savedPosition, maxScroll));

                        setTimeout(() => {
                            enableSmoothScroll();
                            isRestoringRef.current = false;
                        }, 50);
                    } else {
                        attempts++;
                        requestAnimationFrame(tryRestore);
                    }
                };

                // Start restoration after a small delay for React to render
                setTimeout(tryRestore, 10);
            }
        } else if (previousPath !== currentPath) {
            // New navigation - scroll to top
            disableSmoothScroll();
            window.scrollTo(0, 0);
            setTimeout(enableSmoothScroll, 50);
        }

        prevPathRef.current = currentPath;
    }, [location.pathname, location.key, history.action]);

    return null;
};

export default ScrollRestoration;
