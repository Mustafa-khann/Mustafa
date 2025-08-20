import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { posts, researchPapers } from '../data/data';
import { projectDetails } from '../data/projects';

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_POSTS: 'SET_POSTS',
  SET_RESEARCH_PAPERS: 'SET_RESEARCH_PAPERS',
  SET_PROJECTS: 'SET_PROJECTS',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
};

// Initial state
const initialState = {
  posts: [],
  researchPapers: [],
  projects: [],
  loading: false,
  error: null,
  filters: {
    category: 'all',
    dateRange: 'all',
  },
  search: '',
};

// Reducer function
const dataReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTIONS.SET_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case ACTIONS.SET_RESEARCH_PAPERS:
      return { ...state, researchPapers: action.payload, loading: false };
    case ACTIONS.SET_PROJECTS:
      return { ...state, projects: action.payload, loading: false };
    case ACTIONS.SET_FILTER:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case ACTIONS.SET_SEARCH:
      return { ...state, search: action.payload };
    default:
      return state;
  }
};

// Create context
const DataContext = createContext();

// Provider component
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });

        // Simulate async loading (in real app, this would be API calls)
        await new Promise(resolve => setTimeout(resolve, 100));

        dispatch({ type: ACTIONS.SET_POSTS, payload: posts });
        dispatch({ type: ACTIONS.SET_RESEARCH_PAPERS, payload: researchPapers });
        dispatch({ type: ACTIONS.SET_PROJECTS, payload: projectDetails });
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
    };

    loadData();
  }, []);

  // Computed values
  const filteredPosts = React.useMemo(() => {
    let filtered = state.posts;

    if (state.search) {
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(state.search.toLowerCase()) ||
          post.content.toLowerCase().includes(state.search.toLowerCase())
      );
    }

    return filtered.sort((a, b) => b.id - a.id);
  }, [state.posts, state.search]);

  const filteredResearchPapers = React.useMemo(() => {
    let filtered = state.researchPapers;

    if (state.search) {
      filtered = filtered.filter(
        paper =>
          paper.title.toLowerCase().includes(state.search.toLowerCase()) ||
          paper.abstract.toLowerCase().includes(state.search.toLowerCase())
      );
    }

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [state.researchPapers, state.search]);

  const filteredProjects = React.useMemo(() => {
    let filtered = state.projects;

    if (state.search) {
      filtered = filtered.filter(
        project =>
          project.title.toLowerCase().includes(state.search.toLowerCase()) ||
          project.abstract.toLowerCase().includes(state.search.toLowerCase()) ||
          project.techStack.toLowerCase().includes(state.search.toLowerCase())
      );
    }

    return filtered.sort((a, b) => a.id - b.id);
  }, [state.projects, state.search]);

  // Helper functions
  const getPostBySlug = slug => {
    return state.posts.find(post => slugify(post.title) === slug);
  };

  const getResearchPaperBySlug = slug => {
    return state.researchPapers.find(paper => slugify(paper.title) === slug);
  };

  const getProjectBySlug = slug => {
    return state.projects.find(project => slugify(project.title) === slug);
  };

  const setSearch = searchTerm => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: searchTerm });
  };

  const setFilter = (filterType, value) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: { [filterType]: value } });
  };

  const value = {
    ...state,
    filteredPosts,
    filteredResearchPapers,
    filteredProjects,
    getPostBySlug,
    getResearchPaperBySlug,
    getProjectBySlug,
    setSearch,
    setFilter,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Helper function for slugification
function slugify(title) {
  if (!title) return '';
  return String(title)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}
