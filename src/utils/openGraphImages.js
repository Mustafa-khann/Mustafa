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
