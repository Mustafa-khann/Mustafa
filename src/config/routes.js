import { lazy } from 'react';

// Lazy load pages for better performance
const HomePage = lazy(() => import('../pages/HomePage'));
const BooksPage = lazy(() => import('../pages/BooksPage'));
const PostsPage = lazy(() => import('../pages/PostsPage'));
const PostDetail = lazy(() => import('../components/PostDetail'));
const IdeasPage = lazy(() => import('../pages/IdeasPage'));
const IdeaDetail = lazy(() => import('../components/IdeaDetail'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const ProjectDetail = lazy(() => import('../components/ProjectDetail'));
const DisclosurePage = lazy(() => import('../pages/DisclosurePage'));

// Route configuration
export const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
    title: 'Home',
  },
  {
    path: '/books',
    exact: true,
    component: BooksPage,
    title: 'Books',
  },
  {
    path: '/posts',
    exact: true,
    component: PostsPage,
    title: 'Posts',
  },
  {
    path: '/posts/:title',
    component: PostDetail,
    title: 'Post Detail',
  },
  {
    path: '/ideas',
    exact: true,
    component: IdeasPage,
    title: 'Ideas',
  },
  {
    path: '/ideas/:title',
    component: IdeaDetail,
    title: 'Idea Detail',
  },
  {
    path: '/projects',
    exact: true,
    component: ProjectsPage,
    title: 'Projects',
  },
  {
    path: '/projects/:title',
    component: ProjectDetail,
    title: 'Project Detail',
  },
  {
    path: '/disclosure',
    exact: true,
    component: DisclosurePage,
    title: 'Affiliate Disclosure',
  },
];

// Navigation links for the navbar
export const navigationLinks = [
  { path: '/', label: 'Home', icon: 'HomeIcon' },
  { path: '/books', label: 'Books' },
  { path: '/posts', label: 'Posts' },
  { path: '/ideas', label: 'Ideas' },
  { path: '/projects', label: 'Projects' },
];

// Social media links
export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/mustafa-khann',
    icon: 'GitHubIcon',
  },
  {
    name: 'Twitter',
    url: 'https://x.com/oprydai',
    icon: 'TwitterIcon',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mustafa-kh4n/',
    icon: 'LinkedInIcon',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/oprydai/',
    icon: 'InstagramIcon',
  },
];

// Helper function to get route by path
export const getRouteByPath = path => {
  return routes.find(route => route.path === path);
};

// Helper function to check if path is active
export const isActivePath = (currentPath, routePath) => {
  if (routePath === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(routePath);
};
