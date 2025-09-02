import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getPostOGImage, getProjectOGImage, getDefaultOGImage } from '../../../utils/openGraphImages';

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  author = 'Mustafa Khan',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  post, // Add post object for better OG image handling
  project // Add project object for better OG image handling
}) => {
  const siteName = 'Mustafa Khan';
  const siteUrl = 'https://www.mustafakhan.xyz'; // Replace with your actual domain
  const defaultImage = getDefaultOGImage();
  const twitterHandle = '@oprydai'; // Replace with your actual handle
  
  // Ensure all values are strings and handle undefined/null cases
  const safeTitle = String(title || '');
  const safeDescription = String(description || '');
  const safeAuthor = String(author || 'Mustafa Khan');
  const safeType = String(type || 'website');
  const safeSection = section ? String(section) : '';
  const safePublishedTime = publishedTime ? String(publishedTime) : '';
  const safeModifiedTime = modifiedTime ? String(modifiedTime) : '';
  const safeTags = Array.isArray(tags) ? tags.map(tag => String(tag)) : [];
  
  const fullTitle = safeTitle ? `${safeTitle} | ${siteName}` : siteName;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  
  // Determine the best image to use
  let fullImage;
  if (image) {
    fullImage = `${siteUrl}${image}`;
    console.log('🔍 SEO: Using provided image:', fullImage);
  } else if (post) {
    const postOGImage = getPostOGImage(post);
    fullImage = postOGImage ? `${siteUrl}${postOGImage}` : `${siteUrl}${defaultImage}`;
    console.log('🔍 SEO: Post detected, OG image:', postOGImage, 'Full URL:', fullImage);
  } else if (project) {
    const projectOGImage = getProjectOGImage(project);
    fullImage = projectOGImage ? `${siteUrl}${projectOGImage}` : `${siteUrl}${defaultImage}`;
    console.log('🔍 SEO: Project detected, OG image:', projectOGImage, 'Full URL:', fullImage);
  } else {
    fullImage = `${siteUrl}${defaultImage}`;
    console.log('🔍 SEO: Using default image:', fullImage);
  }
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={safeDescription} />
      <meta name="author" content={safeAuthor} />
      
      {/* OpenGraph Meta Tags */}
      <meta property="og:type" content={safeType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={safeDescription} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific meta tags (avoid React Fragments inside Helmet) */}
      {safeType === 'article' && <meta property="article:author" content={safeAuthor} />}
      {safeType === 'article' && <meta property="article:section" content={safeSection} />}
      {safeType === 'article' && safePublishedTime && (
        <meta property="article:published_time" content={safePublishedTime} />
      )}
      {safeType === 'article' && safeModifiedTime && (
        <meta property="article:modified_time" content={safeModifiedTime} />
      )}
      {safeType === 'article' &&
        Array.isArray(safeTags) &&
        safeTags.map((tag, index) => (
          <meta key={`article-tag-${index}`} property="article:tag" content={tag} />
        ))}
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={safeDescription} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Debug logging for meta tags */}
      <script type="application/json" id="seo-debug">
        {JSON.stringify({
          title: fullTitle,
          description: safeDescription,
          image: fullImage,
          url: fullUrl,
          type: safeType,
          post: !!post,
          project: !!project
        })}
      </script>
    </Helmet>
  );
  
  // Debug effect to verify meta tags are applied
  useEffect(() => {
    console.log('🔍 SEO Component Rendered - Meta Tags Applied:');
    console.log('Title:', fullTitle);
    console.log('Description:', safeDescription);
    console.log('Image:', fullImage);
    console.log('URL:', fullUrl);
    console.log('Type:', safeType);
    
    // Verify meta tags are in the DOM
    setTimeout(() => {
      const ogImage = document.querySelector('meta[property="og:image"]');
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      
      console.log('🔍 DOM Meta Tags Found:');
      console.log('og:image:', ogImage?.getAttribute('content'));
      console.log('og:title:', ogTitle?.getAttribute('content'));
      console.log('og:description:', ogDescription?.getAttribute('content'));
      
      // Fallback: manually set meta tags if they're missing
      if (!ogImage) {
        console.log('⚠️ og:image missing, manually setting...');
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.setAttribute('content', fullImage);
        document.head.appendChild(meta);
      }
      
      if (!ogTitle) {
        console.log('⚠️ og:title missing, manually setting...');
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.setAttribute('content', fullTitle);
        document.head.appendChild(meta);
      }
      
      if (!ogDescription) {
        console.log('⚠️ og:description missing, manually setting...');
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.setAttribute('content', safeDescription);
        document.head.appendChild(meta);
      }
    }, 100);
  }, [fullTitle, safeDescription, fullImage, fullUrl, safeType]);
};

export default SEO;


