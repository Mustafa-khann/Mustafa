// OpenGraph Image Configuration
export const OPENGRAPH_IMAGES = {
  // Main sections
  home: '/assets/og-home.jpg',
  about: '/assets/og-about.jpg',
  projects: '/assets/og-projects.jpg',
  posts: '/assets/og-posts.jpg',
  books: '/assets/og-books.jpg',
  ideas: '/assets/og-ideas.jpg',
  experience: '/assets/og-experience.jpg',
  
  // Default fallback
  default: '/assets/mustafa.jpeg',
  
  // Category-specific images
  categories: {
    software: '/assets/og-software.jpg',
    research: '/assets/og-research.jpg',
    robotics: '/assets/og-robotics.jpg',
    ai: '/assets/og-ai.jpg',
    engineering: '/assets/og-engineering.jpg',
    technology: '/assets/og-technology.jpg',
    science: '/assets/og-science.jpg',
    philosophy: '/assets/og-philosophy.jpg',
    literature: '/assets/og-literature.jpg',
  }
};

// Get appropriate OpenGraph image based on content type and category
export const getOpenGraphImage = (type, category = null, customImage = null) => {
  if (customImage) return customImage;
  
  if (category && OPENGRAPH_IMAGES.categories[category.toLowerCase()]) {
    return OPENGRAPH_IMAGES.categories[category.toLowerCase()];
  }
  
  if (OPENGRAPH_IMAGES[type]) {
    return OPENGRAPH_IMAGES[type];
  }
  
  return OPENGRAPH_IMAGES.default;
};

// Generate OpenGraph data for different content types
export const generateOpenGraphData = (content) => {
  const {
    type = 'website',
    title,
    description,
    image,
    category,
    tags = [],
    publishedTime,
    modifiedTime,
    author = 'Mustafa Khan',
    url
  } = content;

  return {
    title,
    description,
    image: getOpenGraphImage(type, category, image),
    url,
    type,
    author,
    publishedTime,
    modifiedTime,
    tags,
    section: category
  };
};

// Utility functions for Open Graph images

/**
 * Generate the Open Graph image URL for a post
 * @param {Object} post - The post object
 * @returns {string} The URL to the Open Graph image
 */
export const getPostOGImage = (post) => {
  if (!post) return null;
  
  // Check if we have a custom OG image for this specific post
  const postSlug = post.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  
  // For the hardware post, use the specific image
  if (post.title === 'So You Want to Build Hardware?') {
    return '/assets/og-images/post-hardware.png';
  }
  
  // For other posts, generate a generic path
  // You can run npm run generate-og to create these images
  return `/assets/og-images/post-${postSlug}.png`;
};

/**
 * Generate the Open Graph image URL for a project
 * @param {Object} project - The project object
 * @returns {string} The URL to the Open Graph image
 */
export const getProjectOGImage = (project) => {
  if (!project) return null;
  
  const projectSlug = project.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `/assets/og-images/project-${projectSlug}.png`;
};

/**
 * Generate the Open Graph image URL for a book
 * @param {Object} book - The book object
 * @returns {string} The URL to the Open Graph image
 */
export const getBookOGImage = (book) => {
  if (!book) return null;
  
  const bookSlug = book.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `/assets/og-images/book-${bookSlug}.png`;
};

/**
 * Generate the Open Graph image URL for an idea
 * @param {Object} idea - The idea object
 * @returns {string} The URL to the Open Graph image
 */
export const getIdeaOGImage = (idea) => {
  if (!idea) return null;
  
  const ideaSlug = idea.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `/assets/og-images/idea-${ideaSlug}.png`;
};

/**
 * Get the homepage Open Graph image
 * @returns {string} The URL to the homepage Open Graph image
 */
export const getHomeOGImage = () => {
  return '/assets/og-images/home.png';
};

/**
 * Get the default Open Graph image
 * @returns {string} The URL to the default Open Graph image
 */
export const getDefaultOGImage = () => {
  return '/assets/mustafa.jpeg';
};

/**
 * Get the appropriate Open Graph image based on content type
 * @param {string} contentType - The type of content (post, project, book, idea, home)
 * @param {Object} content - The content object
 * @returns {string} The URL to the appropriate Open Graph image
 */
export const getContentOGImage = (content, contentType) => {
  switch (contentType) {
    case 'post':
      return getPostOGImage(content);
    case 'project':
      return getProjectOGImage(content);
    case 'book':
      return getBookOGImage(content);
    case 'idea':
      return getIdeaOGImage(content);
    case 'home':
      return getHomeOGImage();
    default:
      return getDefaultOGImage();
  }
};

/**
 * Check if an Open Graph image exists
 * @param {string} imagePath - The path to the image
 * @returns {Promise<boolean>} Whether the image exists
 */
export const checkOGImageExists = async (imagePath) => {
  try {
    const response = await fetch(imagePath, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};
