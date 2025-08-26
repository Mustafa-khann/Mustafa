import React from 'react';
import { Helmet } from 'react-helmet';
import { APP_CONFIG } from '../../../constants';

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
  url,
  image,
  type = 'article',
  publishedTime,
  modifiedTime,
  tags = [],
}) => {
  const metaTitle = title ? `${title} — ${APP_CONFIG.NAME}` : APP_CONFIG.NAME;
  const metaDescription = description || APP_CONFIG.DESCRIPTION;
  const canonicalUrl = absoluteUrl(url || (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const imageUrl = image ? absoluteUrl(image) : absoluteUrl('/assets/mustafa.jpeg');

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={APP_CONFIG.NAME} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {publishedTime && <meta property="article:published_time" content={new Date(publishedTime).toISOString()} />}
      {modifiedTime && <meta property="article:modified_time" content={new Date(modifiedTime).toISOString()} />}
      {Array.isArray(tags) && tags.map((t) => (
        <meta key={t} property="article:tag" content={t} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;


