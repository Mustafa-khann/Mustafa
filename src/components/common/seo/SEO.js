import React from 'react';
import { Helmet } from 'react-helmet';
import { APP_CONFIG } from '../../../constants';
import { getOpenGraphImage, generateOpenGraphData, validateImageUrl } from '../../../utils/openGraphImages';

const absoluteUrl = (pathOrUrl) => {
  if (!pathOrUrl) return APP_CONFIG.WEBSITE;
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  const base = APP_CONFIG.WEBSITE?.replace(/\/$/, '') || '';
  const path = String(pathOrUrl).startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
};

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  author = 'Mustafa Khan',
  publishedTime,
  modifiedTime,
  tags = [],
  // New props for enhanced OpenGraph support
  contentType,
  contentItem,
  author,
}) => {
  const metaTitle = title ? `${title} — ${APP_CONFIG.NAME}` : APP_CONFIG.NAME;
  const metaDescription = description || APP_CONFIG.DESCRIPTION;
  const canonicalUrl = absoluteUrl(url || (typeof window !== 'undefined' ? window.location.pathname : '/'));
  
  // Enhanced image selection using OpenGraph utilities
  let imageUrl;
  if (image) {
    // Explicit image provided - use it
    imageUrl = validateImageUrl(image);
  } else if (contentItem && contentType) {
    // Use smart image selection for content items
    imageUrl = validateImageUrl(getOpenGraphImage(contentItem, contentType));
  } else if (contentType) {
    // Use content type fallback
    imageUrl = validateImageUrl(getOpenGraphImage(null, contentType));
  } else {
    // Default fallback
    imageUrl = validateImageUrl('/assets/mustafa.jpeg');
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      
      {/* OpenGraph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={contentItem?.title || metaTitle} />
      
      {/* Enhanced OpenGraph metadata */}
      {author && <meta property="og:author" content={author} />}
      
      {/* Article-specific metadata */}
      {publishedTime && <meta property="article:published_time" content={new Date(publishedTime).toISOString()} />}
      {modifiedTime && <meta property="article:modified_time" content={new Date(modifiedTime).toISOString()} />}
      {author && <meta property="article:author" content={author} />}
      {Array.isArray(tags) && tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Book-specific metadata */}
      {type === 'book' && contentItem?.author && (
        <meta property="book:author" content={contentItem.author} />
      )}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={contentItem?.title || metaTitle} />
      {author && <meta name="twitter:creator" content={`@${author.replace(/\s+/g, '').toLowerCase()}`} />}
    </Helmet>
  );
};

export default SEO;


