import React from 'react';
import { getPostOGImage, getDefaultOGImage } from '../utils/openGraphImages';

const TestOG = () => {
  // Test with a sample post
  const testPost = {
    title: 'So You Want to Build Hardware?',
    category: 'ARTICLE',
    abstract: 'Good choice. Software is fun, but hardware is where things get real.',
    author: 'Mustafa Khan',
    date: 'August 28, 2025',
    readingTime: '4'
  };

  const ogImage = getPostOGImage(testPost);
  const defaultImage = getDefaultOGImage();

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <h1>🔍 Open Graph Image Test</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Test Post Data:</h2>
        <pre style={{ backgroundColor: '#333', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
          {JSON.stringify(testPost, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Generated Open Graph Image:</h2>
        <p><strong>Post OG Image:</strong> {ogImage}</p>
        <p><strong>Default Image:</strong> {defaultImage}</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Image Preview:</h2>
        {ogImage && (
          <div style={{ marginBottom: '1rem' }}>
            <h3>Post OG Image:</h3>
            <img 
              src={ogImage} 
              alt="Post Open Graph" 
              style={{ maxWidth: '100%', border: '2px solid #64ffda', borderRadius: '8px' }}
              onError={(e) => {
                e.target.style.border = '2px solid #ff6b6b';
                e.target.alt = 'Image failed to load';
              }}
            />
          </div>
        )}
        
        <div>
          <h3>Default Image:</h3>
          <img 
            src={defaultImage} 
            alt="Default Open Graph" 
            style={{ maxWidth: '100%', border: '2px solid #64ffda', borderRadius: '8px' }}
            onError={(e) => {
              e.target.style.border = '2px solid #ff6b6b';
              e.target.alt = 'Image failed to load';
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Debug Information:</h2>
        <p>Check the browser console for detailed logging of the Open Graph image selection process.</p>
        <p>If images fail to load, it means they're not accessible at the current URL.</p>
      </div>

      <div style={{ backgroundColor: '#333', padding: '1rem', borderRadius: '8px' }}>
        <h3>Expected URLs:</h3>
        <ul>
          <li><strong>Post OG Image:</strong> {ogImage}</li>
          <li><strong>Default Image:</strong> {defaultImage}</li>
          <li><strong>Full Post OG URL:</strong> https://www.mustafakhan.xyz{ogImage}</li>
          <li><strong>Full Default URL:</strong> https://www.mustafakhan.xyz{defaultImage}</li>
        </ul>
      </div>

      <div style={{ backgroundColor: '#333', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
        <h3>Generated Open Graph Meta Tags:</h3>
        <pre style={{ backgroundColor: '#222', padding: '1rem', borderRadius: '8px', overflow: 'auto', fontSize: '12px' }}>
{`<meta property="og:title" content="${testPost.title} | Mustafa Khan" />
<meta property="og:description" content="${testPost.abstract}" />
<meta property="og:image" content="https://www.mustafakhan.xyz${ogImage}" />
<meta property="og:url" content="https://www.mustafakhan.xyz/posts/so-you-want-to-build-hardware" />
<meta property="og:type" content="article" />
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:title" content="${testPost.title} | Mustafa Khan" />
<meta property="twitter:description" content="${testPost.abstract}" />
<meta property="twitter:image" content="https://www.mustafakhan.xyz${ogImage}" />`}
        </pre>
      </div>
    </div>
  );
};

export default TestOG;
