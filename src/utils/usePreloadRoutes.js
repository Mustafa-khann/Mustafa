import { useEffect } from 'react';

/**
 * Preloads all lazy-loaded route chunks in the background after the
 * component mounts. Uses requestIdleCallback (with setTimeout fallback)
 * so the initial paint is never blocked.
 */
const usePreloadRoutes = () => {
    useEffect(() => {
        const preload = () => {
            const pages = [
                () => import('../pages/NotesPage'),
                () => import('../pages/NoteDetail'),
                () => import('../pages/BooksPage'),
                () => import('../pages/BookDetailPage'),
                () => import('../pages/ProjectsPage'),
                () => import('../pages/IdeasPage'),
                () => import('../pages/PaperDetail'),
            ];

            pages.forEach((load) => load().catch(() => { }));
        };

        // Use requestIdleCallback if available, otherwise setTimeout
        if ('requestIdleCallback' in window) {
            const id = window.requestIdleCallback(preload);
            return () => window.cancelIdleCallback(id);
        } else {
            const id = setTimeout(preload, 1500);
            return () => clearTimeout(id);
        }
    }, []);
};

export default usePreloadRoutes;
