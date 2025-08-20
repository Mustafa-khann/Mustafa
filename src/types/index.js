// Type definitions and prop types for the application
// This helps with documentation and IDE support

/**
 * @typedef {Object} Project
 * @property {string} id - Unique identifier
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string} image - Project image URL
 * @property {string} github - GitHub repository URL
 * @property {string} live - Live demo URL
 * @property {string[]} technologies - Array of technologies used
 * @property {string} category - Project category
 */

/**
 * @typedef {Object} Post
 * @property {string} id - Unique identifier
 * @property {string} title - Post title
 * @property {string} content - Post content
 * @property {string} date - Publication date
 * @property {string} author - Author name
 * @property {string[]} tags - Array of tags
 */

/**
 * @typedef {Object} Book
 * @property {string} id - Unique identifier
 * @property {string} title - Book title
 * @property {string} author - Book author
 * @property {string} cover - Book cover image URL
 * @property {string} description - Book description
 * @property {number} rating - Book rating (1-5)
 * @property {string} category - Book category
 */

/**
 * @typedef {Object} Idea
 * @property {string} id - Unique identifier
 * @property {string} title - Idea title
 * @property {string} content - Idea content
 * @property {string} date - Creation date
 * @property {string} author - Author name
 * @property {string[]} tags - Array of tags
 */

/**
 * @typedef {Object} NavigationLink
 * @property {string} path - Route path
 * @property {string} label - Display label
 * @property {string} [icon] - Icon name
 */

/**
 * @typedef {Object} SocialLink
 * @property {string} name - Social platform name
 * @property {string} url - Social profile URL
 * @property {string} icon - Icon name
 */

// Export types for use in JSDoc comments
export const TYPES = {
  Project: 'Project',
  Post: 'Post',
  Book: 'Book',
  Idea: 'Idea',
  NavigationLink: 'NavigationLink',
  SocialLink: 'SocialLink',
};
