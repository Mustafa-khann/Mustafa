import React, { lazy } from 'react';

// Lazy load components for better performance
const Intro = lazy(() => import('../components/Intro'));
const Experience = lazy(() => import('../components/Experience'));
const About = lazy(() => import('../components/About'));
const Projects = lazy(() => import('../components/Projects'));
const Credits = lazy(() => import('../components/Credits'));
const Posts = lazy(() => import('../components/Posts'));
const PostDetail = lazy(() => import('../components/PostDetail'));
const Books = lazy(() => import('../components/Books'));
const Ideas = lazy(() => import('../components/Ideas'));
const IdeaDetail = lazy(() => import('../components/IdeaDetail'));
const ProjectList = lazy(() => import('../components/ProjectList'));
const ProjectDetail = lazy(() => import('../components/ProjectDetail'));

// Home page component that combines all sections
const HomePage = () => (
  <div className="home-page">
    <Intro />
    <About />
    <Experience />
    <Projects />
    <Credits />
  </div>
);

// Route configuration
export const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
    title: 'Home'
  },
  {
    path: '/books',
    exact: true,
    component: Books,
    title: 'Books'
  },
  {
    path: '/posts',
    exact: true,
    component: Posts,
    title: 'Posts'
  },
  {
    path: '/posts/:title',
    component: PostDetail,
    title: 'Post Detail'
  },
  {
    path: '/ideas',
    exact: true,
    component: Ideas,
    title: 'Ideas'
  },
  {
    path: '/ideas/:title',
    component: IdeaDetail,
    title: 'Idea Detail'
  },
  {
    path: '/projects',
    exact: true,
    component: ProjectList,
    title: 'Projects'
  },
  {
    path: '/projects/:title',
    component: ProjectDetail,
    title: 'Project Detail'
  }
];

// Navigation links for the navbar
export const navigationLinks = [
  { path: '/', label: 'Home', icon: 'HomeIcon' },
  { path: '/books', label: 'Books' },
  { path: '/posts', label: 'Posts' },
  { path: '/ideas', label: 'Ideas' },
  { path: '/projects', label: 'Projects' }
];

// Social media links
export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/mustafa-khann',
    icon: 'GitHubIcon'
  },
  {
    name: 'Twitter',
    url: 'https://x.com/mustafa_kh4n',
    icon: 'TwitterIcon'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mustafa-kh4n/',
    icon: 'LinkedInIcon'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/mstfa.afridi/',
    icon: 'InstagramIcon'
  }
];

// Helper function to get route by path
export const getRouteByPath = (path) => {
  return routes.find(route => route.path === path);
};

// Helper function to check if path is active
export const isActivePath = (currentPath, routePath) => {
  if (routePath === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(routePath);
}; 