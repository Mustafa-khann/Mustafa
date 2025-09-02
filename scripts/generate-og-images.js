const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage, registerFont } = require('canvas');

// Register custom fonts if available
try {
  registerFont(path.join(__dirname, '../public/fonts/NTR-Regular.ttf'), { family: 'NTR' });
  registerFont(path.join(__dirname, '../public/fonts/SourceSerifPro-Regular.ttf'), { family: 'Source Serif Pro' });
} catch (error) {
  console.log('Custom fonts not found, using system fonts');
}

// Configuration for Open Graph images
const ogImageConfig = {
  dimensions: { width: 1200, height: 630 },
  colors: {
    background: '#0a192f',
    card: '#112240',
    text: '#ccd6f6',
    textSecondary: '#8892b0',
    accent: '#64ffda',
    border: 'rgba(100, 255, 218, 0.2)',
    categoryBg: 'rgba(100, 255, 218, 0.1)'
  },
  fonts: {
    title: 'NTR, Arial, sans-serif',
    body: 'Source Serif Pro, Georgia, serif',
    category: 'Arial, sans-serif'
  }
};

// Function to generate post Open Graph image
async function generatePostOGImage(postData) {
  const canvas = createCanvas(ogImageConfig.dimensions.width, ogImageConfig.dimensions.height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = ogImageConfig.colors.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Create main card background
  const cardPadding = 60;
  const cardWidth = canvas.width - (cardPadding * 2);
  const cardHeight = canvas.height - (cardPadding * 2);
  
  // Card background with glass effect
  ctx.fillStyle = ogImageConfig.colors.card;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 10;
  ctx.fillRect(cardPadding, cardPadding, cardWidth, cardHeight);
  
  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Add subtle border
  ctx.strokeStyle = ogImageConfig.colors.border;
  ctx.lineWidth = 2;
  ctx.strokeRect(cardPadding, cardPadding, cardWidth, cardHeight);

  // Category tag
  const category = postData.category || 'ARTICLE';
  ctx.fillStyle = ogImageConfig.colors.categoryBg;
  ctx.strokeStyle = ogImageConfig.colors.accent;
  ctx.lineWidth = 1;
  
  const categoryX = cardPadding + 40;
  const categoryY = cardPadding + 40;
  const categoryWidth = 120;
  const categoryHeight = 40;
  
  // Category background
  ctx.fillRect(categoryX, categoryY, categoryWidth, categoryHeight);
  ctx.strokeRect(categoryX, categoryY, categoryWidth, categoryHeight);
  
  // Category text
  ctx.fillStyle = ogImageConfig.colors.accent;
  ctx.font = `bold 16px ${ogImageConfig.fonts.category}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(category, categoryX + categoryWidth/2, categoryY + categoryHeight/2);

  // Title
  ctx.fillStyle = ogImageConfig.colors.text;
  ctx.font = `bold 48px ${ogImageConfig.fonts.title}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  const titleX = cardPadding + 40;
  const titleY = categoryY + categoryHeight + 30;
  const maxTitleWidth = cardWidth - 80;
  
  // Wrap title if too long
  const titleLines = wrapText(ctx, postData.title, maxTitleWidth);
  titleLines.forEach((line, index) => {
    ctx.fillText(line, titleX, titleY + (index * 60));
  });

  // Visual element placeholder (right side)
  const visualX = cardPadding + cardWidth - 300;
  const visualY = titleY;
  const visualSize = 280;
  
  // Visual background
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(visualX, visualY, visualSize, visualSize);
  
  // Add some visual elements (dots pattern)
  ctx.fillStyle = ogImageConfig.colors.accent;
  for (let i = 0; i < 20; i++) {
    const x = visualX + Math.random() * visualSize;
    const y = visualY + Math.random() * visualSize;
    const radius = Math.random() * 3 + 1;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Introductory text (below title, left side)
  const introX = titleX;
  const introY = titleY + (titleLines.length * 60) + 40;
  const introWidth = cardWidth - 400;
  
  ctx.fillStyle = ogImageConfig.colors.textSecondary;
  ctx.font = `20px ${ogImageConfig.fonts.body}`;
  ctx.textAlign = 'left';
  
  const introText = postData.abstract || postData.excerpt || 'Post content preview...';
  const introLines = wrapText(ctx, introText, introWidth);
  introLines.forEach((line, index) => {
    ctx.fillText(line, introX, introY + (index * 28));
  });

  // Metadata section (below intro text)
  const metadataY = introY + (introLines.length * 28) + 30;
  
  const metadata = [
    { label: 'By', value: postData.author || 'Mustafa Khan', highlight: true },
    { label: 'Published on', value: postData.date || 'Date' },
    { label: 'Last Updated on', value: postData.date || 'Date' },
    { label: '', value: `${postData.readingTime || '5'} min read` }
  ];

  metadata.forEach((item, index) => {
    const y = metadataY + (index * 25);
    
    // Label
    if (item.label) {
      ctx.fillStyle = ogImageConfig.colors.textSecondary;
      ctx.font = `16px ${ogImageConfig.fonts.body}`;
      ctx.fillText(item.label, introX, y);
    }
    
    // Value
    ctx.fillStyle = item.highlight ? ogImageConfig.colors.accent : ogImageConfig.colors.text;
    ctx.font = item.highlight ? `bold 16px ${ogImageConfig.fonts.body}` : `16px ${ogImageConfig.fonts.body}`;
    const valueX = item.label ? introX + 120 : introX;
    ctx.fillText(item.value, valueX, y);
  });

  // Summary text at bottom
  const summaryY = metadataY + (metadata.length * 25) + 30;
  ctx.fillStyle = ogImageConfig.colors.textSecondary;
  ctx.font = `italic 18px ${ogImageConfig.fonts.body}`;
  
  const summaryLines = wrapText(ctx, introText, introWidth);
  summaryLines.forEach((line, index) => {
    ctx.fillText(line, introX, summaryY + (index * 26));
  });

  return canvas;
}

// Helper function to wrap text
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

// Function to generate and save Open Graph image
async function generateAndSaveOGImage(postData, outputPath) {
  try {
    const canvas = await generatePostOGImage(postData);
    const buffer = canvas.toBuffer('image/png');
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Generated Open Graph image: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`❌ Error generating Open Graph image: ${error.message}`);
    return null;
  }
}

// Example usage for a post
const samplePost = {
  title: 'So You Want to Build Hardware?',
  category: 'ARTICLE',
  abstract: 'Good choice. Software is fun, but hardware is where things get real. It\'s the moment when lines of code turn into blinking LEDs, buzzing motors, and actual machines.',
  author: 'Mustafa Khan',
  date: 'August 28, 2025',
  readingTime: '4',
  excerpt: 'Good choice. Software is fun, but hardware is where things get real. It\'s the moment when lines of code turn into blinking LEDs, buzzing motors, and actual machines.'
};

// Generate sample image
async function main() {
  console.log('🎨 Generating Open Graph images...');
  
  // Generate the hardware post image
  const outputPath = path.join(__dirname, '../public/assets/og-images/post-hardware.png');
  await generateAndSaveOGImage(samplePost, outputPath);
  
  // You can add more posts here
  const additionalPosts = [
    {
      title: 'Getting Started with Robotics',
      category: 'TUTORIAL',
      abstract: 'Learn the fundamentals of robotics programming and hardware integration.',
      author: 'Mustafa Khan',
      date: 'August 30, 2025',
      readingTime: '8',
      excerpt: 'Learn the fundamentals of robotics programming and hardware integration.'
    },
    {
      title: 'Understanding Neural Networks',
      category: 'RESEARCH',
      abstract: 'Deep dive into the mathematics and implementation of neural networks.',
      author: 'Mustafa Khan',
      date: 'September 2, 2025',
      readingTime: '12',
      excerpt: 'Deep dive into the mathematics and implementation of neural networks.'
    }
  ];
  
  // Generate images for additional posts
  for (const post of additionalPosts) {
    const postSlug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const postOutputPath = path.join(__dirname, `../public/assets/og-images/post-${postSlug}.png`);
    await generateAndSaveOGImage(post, postOutputPath);
  }
  
  console.log('✨ Open Graph image generation complete!');
  console.log('📁 Images saved to: public/assets/og-images/');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  generatePostOGImage,
  generateAndSaveOGImage
};
