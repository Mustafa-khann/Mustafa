import { lazy } from 'react';

// Lazy load pages
const HomePage = lazy(() => import('../pages/HomePage'));
const NotesPage = lazy(() => import('../pages/NotesPage'));
const NoteDetail = lazy(() => import('../pages/NoteDetail'));
const BooksPage = lazy(() => import('../pages/BooksPage'));
const BookDetailPage = lazy(() => import('../pages/BookDetailPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const IdeasPage = lazy(() => import('../pages/IdeasPage'));
const PaperDetail = lazy(() => import('../pages/PaperDetail'));

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
    path: '/posts/:title',
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
    path: '/ideas',
    exact: true,
    component: IdeasPage,
    title: 'Ideas',
  },
  {
    path: '/ideas/:title',
    component: PaperDetail,
    title: 'Idea',
  },
];

// Navigation links
export const navigationLinks = [
  { path: '/', label: 'Home' },
  { path: '/posts', label: 'Articles' },
  { path: '/books', label: 'Books' },
  { path: '/projects', label: 'Projects' },
  { path: '/ideas', label: 'Ideas' },
];
