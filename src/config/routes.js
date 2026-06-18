import { lazy } from 'react';
import HomePage from '../pages/HomePage';

const loadNotesPage = () => import('../pages/NotesPage');
const loadNoteDetail = () => import('../pages/NoteDetail');
const loadBooksPage = () => import('../pages/BooksPage');
const loadBookDetailPage = () => import('../pages/BookDetailPage');
const loadProjectsPage = () => import('../pages/ProjectsPage');
const loadProjectDetailPage = () => import('../pages/ProjectDetailPage');
const loadIdeasPage = () => import('../pages/IdeasPage');
const loadPaperDetail = () => import('../pages/PaperDetail');

const NotesPage = lazy(loadNotesPage);
const NoteDetail = lazy(loadNoteDetail);
const BooksPage = lazy(loadBooksPage);
const BookDetailPage = lazy(loadBookDetailPage);
const ProjectsPage = lazy(loadProjectsPage);
const ProjectDetailPage = lazy(loadProjectDetailPage);
const IdeasPage = lazy(loadIdeasPage);
const PaperDetail = lazy(loadPaperDetail);

const preloadCache = new Map();
const preload = (loadPage) => {
  if (!preloadCache.has(loadPage)) {
    preloadCache.set(loadPage, loadPage().catch((error) => {
      preloadCache.delete(loadPage);
      throw error;
    }));
  }
  return preloadCache.get(loadPage);
};

const scheduleIdle = (callback) => {
  if (typeof window === 'undefined') return undefined;
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, { timeout: 2500 });
  }
  return window.setTimeout(callback, 1200);
};

const cancelIdle = (id) => {
  if (typeof window === 'undefined' || id === undefined) return;
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    window.clearTimeout(id);
  }
};

const preloadOrder = [
  loadNotesPage,
  loadProjectsPage,
  loadIdeasPage,
  loadBooksPage,
  loadNoteDetail,
  loadProjectDetailPage,
  loadPaperDetail,
  loadBookDetailPage,
];

export const preloadRouteForPath = (pathname) => {
  if (pathname === '/posts') return preload(loadNotesPage);
  if (pathname.startsWith('/posts/')) return preload(loadNoteDetail);
  if (pathname === '/projects') return preload(loadProjectsPage);
  if (pathname.startsWith('/projects/')) return preload(loadProjectDetailPage);
  if (pathname === '/ideas') return preload(loadIdeasPage);
  if (pathname.startsWith('/ideas/')) return preload(loadPaperDetail);
  if (pathname === '/books') return preload(loadBooksPage);
  if (pathname.startsWith('/books/')) return preload(loadBookDetailPage);
  return undefined;
};

export const scheduleRoutePreloading = () => {
  let cancelled = false;
  let idleId;
  let index = 0;

  const runNext = () => {
    if (cancelled || index >= preloadOrder.length) return;
    preload(preloadOrder[index]).catch(() => {});
    index += 1;
    idleId = scheduleIdle(runNext);
  };

  idleId = scheduleIdle(runNext);

  return () => {
    cancelled = true;
    cancelIdle(idleId);
  };
};

// Route configuration
export const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
    title: 'Mustafa Khan',
  },
  {
    path: '/posts',
    exact: true,
    component: NotesPage,
    title: 'Articles',
  },
  {
    path: '/posts/:slug',
    component: NoteDetail,
    title: 'Post',
  },
  {
    path: '/books',
    exact: true,
    component: BooksPage,
    title: 'Books',
  },
  {
    path: '/books/:slug',
    component: BookDetailPage,
    title: 'Book',
  },
  {
    path: '/projects',
    exact: true,
    component: ProjectsPage,
    title: 'Projects',
  },
  {
    path: '/projects/:slug',
    component: ProjectDetailPage,
    title: 'Project',
  },
  {
    path: '/ideas',
    exact: true,
    component: IdeasPage,
    title: 'Ideas',
  },
  {
    path: '/ideas/:slug',
    component: PaperDetail,
    title: 'Idea',
  },
];
