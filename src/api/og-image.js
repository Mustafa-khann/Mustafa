// Dynamic Open Graph Image Generation API
// This can be used to generate OG images on-demand for new content

const { generateAndSaveOGImage } = require('../../scripts/generate-og-images');
const path = require('path');

// Generate OG image for any content type
export const generateDynamicOGImage = async (contentData, contentType) => {
  try {
    const slug = contentData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const outputPath = path.join(process.cwd(), `public/assets/og-images/${contentType}-${slug}.png`);
    
    const data = {
      ...contentData,
      type: contentType
    };
    
    await generateAndSaveOGImage(data, outputPath);
    return `/assets/og-images/${contentType}-${slug}.png`;
  } catch (error) {
    console.error('Error generating dynamic OG image:', error);
    return null;
  }
};

// Express.js route handler (if using Express)
export const handleOGImageRequest = async (req, res) => {
  try {
    const { type, title, description, author, date } = req.query;
    
    if (!type || !title) {
      return res.status(400).json({ error: 'Missing required parameters: type, title' });
    }
    
    const contentData = {
      title,
      description: description || '',
      author: author || 'Mustafa Khan',
      date: date || new Date().toLocaleDateString(),
      abstract: description || '',
      category: type.toUpperCase()
    };
    
    const imagePath = await generateDynamicOGImage(contentData, type);
    
    if (imagePath) {
      res.json({ success: true, imagePath, fullUrl: `https://mustafakhan.xyz${imagePath}` });
    } else {
      res.status(500).json({ error: 'Failed to generate image' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// React hook for generating OG images
export const useOGImageGenerator = () => {
  const generateImage = async (contentData, contentType) => {
    try {
      const response = await fetch(`/api/og-image?type=${contentType}&title=${encodeURIComponent(contentData.title)}&description=${encodeURIComponent(contentData.description || '')}`);
      const result = await response.json();
      return result.imagePath;
    } catch (error) {
      console.error('Error generating OG image:', error);
      return null;
    }
  };
  
  return { generateImage };
};
