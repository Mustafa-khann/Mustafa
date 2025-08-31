/**
 * OpenGraph Image Utility
 * Provides intelligent image selection for different content types
 */

/**
 * Content type specific fallback images
 */
export const CONTENT_FALLBACKS = {
  home: '/assets/mustafa.jpeg',
  posts: '/assets/factory.jpeg', // Professional industrial theme
  ideas: '/assets/mustafa.jpeg', // Personal/intellectual theme
  projects: '/assets/drone-1080.jpg', // Engineering/technical theme
  books: '/assets/og-fallback-books.svg', // Generated book-specific theme
  default: '/assets/mustafa.jpeg'
};

/**
 * Extract representative image from post content
 * @param {string} content - HTML content string
 * @returns {string|null} - First suitable image URL found or null
 */
export const extractImageFromContent = (content) => {
  if (!content) return null;
  
  // Match img tags with src attributes
  const imgMatches = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
  
  if (imgMatches && imgMatches.length > 0) {
    // Extract all src attributes
    const sources = imgMatches.map(imgTag => {
      const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
      return srcMatch ? srcMatch[1] : null;
    }).filter(Boolean);
    
    // Prefer images that seem like main content images (not tiny icons)
    const preferredSrc = sources.find(src => {
      const filename = src.toLowerCase();
      // Skip likely icon/small images
      if (filename.includes('icon') || filename.includes('logo') || 
          filename.includes('avatar') || filename.includes('thumb')) {
        return false;
      }
      // Prefer larger or main content images
      return filename.includes('1080') || filename.includes('large') || 
             filename.includes('cover') || filename.includes('main') ||
             src.includes('/assets/'); // Local assets are likely main images
    });
    
    const selectedSrc = preferredSrc || sources[0];
    
    // Return absolute URLs as-is, make relative URLs absolute
    if (selectedSrc.startsWith('http')) {
      return selectedSrc;
    }
    
    // Handle relative paths - make them absolute
    return selectedSrc.startsWith('/') ? selectedSrc : `/${selectedSrc}`;
  }
  
  return null;
};

/**
 * Get the best OpenGraph image for a given content item
 * @param {Object} item - Content item (post, project, book, idea)
 * @param {string} contentType - Type of content ('post', 'project', 'book', 'idea', 'page')
 * @returns {string} - Absolute URL for OpenGraph image
 */
export const getOpenGraphImage = (item, contentType) => {
  if (!item && !contentType) {
    return CONTENT_FALLBACKS.default;
  }

  // If no item provided but have content type, use type fallback
  if (!item) {
    return CONTENT_FALLBACKS[contentType] || CONTENT_FALLBACKS.default;
  }

  switch (contentType) {
    case 'project':
      // Projects already have image property
      return item.image || CONTENT_FALLBACKS.projects;

    case 'book':
      // Books have cover property
      return item.cover || CONTENT_FALLBACKS.books;

    case 'post':
      // Try to extract image from content, otherwise use post fallback
      const postImage = extractImageFromContent(item.content);
      return postImage || CONTENT_FALLBACKS.posts;

    case 'idea':
      // Try to extract image from content, otherwise use ideas fallback
      const ideaImage = extractImageFromContent(item.content);
      return ideaImage || CONTENT_FALLBACKS.ideas;

    case 'page':
    case 'home':
      return CONTENT_FALLBACKS.home;

    default:
      return CONTENT_FALLBACKS.default;
  }
};

/**
 * Generate structured data for OpenGraph based on content type
 * @param {Object} item - Content item
 * @param {string} contentType - Type of content
 * @param {Object} options - Additional options
 * @returns {Object} - OpenGraph structured data
 */
export const generateOpenGraphData = (item, contentType, options = {}) => {
  const { baseUrl = 'https://mustafakhan.xyz', url } = options;
  
  const imageUrl = getOpenGraphImage(item, contentType);
  
  const baseData = {
    image: imageUrl,
    imageAlt: item?.title || `Mustafa Khan - ${contentType}`,
    url: url || baseUrl,
    siteName: 'Mustafa Khan',
    type: 'website'
  };

  switch (contentType) {
    case 'post':
    case 'idea':
      return {
        ...baseData,
        type: 'article',
        title: item?.title,
        description: item?.abstract || item?.excerpt,
        publishedTime: item?.date,
        author: item?.author || 'Mustafa Khan',
        tags: item?.tags || []
      };

    case 'project':
      return {
        ...baseData,
        type: 'article', 
        title: item?.title,
        description: item?.abstract || item?.description,
        publishedTime: item?.date,
        author: 'Mustafa Khan',
        tags: item?.technologies || []
      };

    case 'book':
      return {
        ...baseData,
        type: 'book',
        title: item?.title,
        description: `${item?.title} by ${item?.author} - Featured in Mustafa Khan's book recommendations`,
        author: item?.author,
        imageAlt: `${item?.title} book cover`
      };

    default:
      return baseData;
  }
};

/**
 * Get OpenGraph image for list pages
 * @param {string} contentType - Type of content list
 * @returns {string} - Image URL for the list page
 */
export const getListPageImage = (contentType) => {
  switch (contentType) {
    case 'posts':
      return CONTENT_FALLBACKS.posts;
    case 'ideas': 
      return CONTENT_FALLBACKS.ideas;
    case 'projects':
      return CONTENT_FALLBACKS.projects;
    case 'books':
      return CONTENT_FALLBACKS.books;
    default:
      return CONTENT_FALLBACKS.home;
  }
};

/**
 * Validate and ensure image URL is properly formatted
 * @param {string} imageUrl - Image URL to validate
 * @returns {string} - Validated and formatted image URL
 */
export const validateImageUrl = (imageUrl) => {
  if (!imageUrl) return CONTENT_FALLBACKS.default;
  
  // If already absolute URL, return as-is
  if (/^https?:\/\//.test(imageUrl)) {
    return imageUrl;
  }
  
  // Make relative URLs absolute
  const base = 'https://mustafakhan.xyz';
  return imageUrl.startsWith('/') ? `${base}${imageUrl}` : `${base}/${imageUrl}`;
};