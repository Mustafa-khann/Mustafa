// Utility functions for content processing

/**
 * Calculate reading time for content
 * @param {string} content - HTML content string
 * @param {number} wordsPerMinute - Average reading speed (default: 200)
 * @returns {number} Reading time in minutes
 */
export const calculateReadingTime = (content, wordsPerMinute = 200) => {
  if (!content) return 1;
  
  // Remove HTML tags and get text content
  const textContent = content.replace(/<[^>]*>/g, '').trim();
  
  // Count words (split by whitespace and filter out empty strings)
  const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
  
  // Calculate reading time
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
};

/**
 * Extract excerpt from content
 * @param {string} content - HTML content string
 * @param {number} maxLength - Maximum length of excerpt (default: 150)
 * @returns {string} Excerpt text
 */
export const extractExcerpt = (content, maxLength = 150) => {
  if (!content) return '';
  
  // Remove HTML tags and get text content
  const textContent = content.replace(/<[^>]*>/g, '').trim();
  
  if (textContent.length <= maxLength) {
    return textContent;
  }
  
  // Truncate and add ellipsis, ensuring we don't cut in the middle of a word
  const truncated = textContent.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
};

/**
 * Format date for display
 * @param {string} dateString - Date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

/**
 * Get estimated word count
 * @param {string} content - HTML content string
 * @returns {number} Word count
 */
export const getWordCount = (content) => {
  if (!content) return 0;
  
  const textContent = content.replace(/<[^>]*>/g, '').trim();
  return textContent.split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Clean HTML content for safe display
 * @param {string} content - HTML content string
 * @returns {string} Cleaned HTML content
 */
export const cleanHtmlContent = (content) => {
  if (!content) return '';
  
  // Remove any potentially dangerous scripts
  return content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}; 