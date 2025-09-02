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
    // Modern color palette
    backgrounds: {
      tech: '#0f172a',      // Dark blue
      creative: '#1e1b4b',  // Dark purple
      science: '#0c4a6e',   // Dark cyan
      philosophy: '#581c87', // Dark violet
      engineering: '#1c1917', // Dark gray
      default: '#0f172a'    // Default dark blue
    },
    accents: {
      tech: '#06b6d4',      // Cyan
      creative: '#8b5cf6',  // Purple
      science: '#10b981',   // Emerald
      philosophy: '#f59e0b', // Amber
      engineering: '#ef4444', // Red
      default: '#06b6d4'    // Default cyan
    },
    text: {
      primary: '#f8fafc',   // Light gray
      secondary: '#cbd5e1',  // Medium gray
      muted: '#64748b'      // Dark gray
    }
  },
  fonts: {
    title: 'NTR, Arial, sans-serif',
    body: 'Source Serif Pro, Georgia, serif',
    category: 'Arial, sans-serif'
  }
};

// Function to get color scheme based on content type
function getColorScheme(contentType, category = null) {
  const schemes = {
    'post': {
      background: category === 'robotics' ? ogImageConfig.colors.backgrounds.engineering :
                 category === 'ai' ? ogImageConfig.colors.backgrounds.science :
                 category === 'philosophy' ? ogImageConfig.colors.backgrounds.philosophy :
                 category === 'creative' ? ogImageConfig.colors.backgrounds.creative :
                 ogImageConfig.colors.backgrounds.tech,
      accent: category === 'robotics' ? ogImageConfig.colors.accents.engineering :
             category === 'ai' ? ogImageConfig.colors.accents.science :
             category === 'philosophy' ? ogImageConfig.colors.accents.philosophy :
             category === 'creative' ? ogImageConfig.colors.accents.creative :
             ogImageConfig.colors.accents.tech
    },
    'project': {
      background: ogImageConfig.colors.backgrounds.engineering,
      accent: ogImageConfig.colors.accents.engineering
    },
    'book': {
      background: ogImageConfig.colors.backgrounds.creative,
      accent: ogImageConfig.colors.accents.creative
    },
    'idea': {
      background: ogImageConfig.colors.backgrounds.philosophy,
      accent: ogImageConfig.colors.accents.philosophy
    },
    'home': {
      background: ogImageConfig.colors.backgrounds.default,
      accent: ogImageConfig.colors.accents.default
    }
  };
  
  return schemes[contentType] || schemes.default;
}

// Function to create different visual layouts
function createVisualLayout(ctx, x, y, width, height, contentType, category, accentColor) {
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  
  switch (contentType) {
    case 'post':
      if (category === 'robotics') {
        // Robotics: Circuit board pattern
        createCircuitPattern(ctx, x, y, width, height, accentColor);
      } else if (category === 'ai') {
        // AI: Neural network nodes
        createNeuralNetwork(ctx, x, y, width, height, accentColor);
      } else if (category === 'philosophy') {
        // Philosophy: Abstract geometric shapes
        createGeometricShapes(ctx, x, y, width, height, accentColor);
      } else {
        // Default: Modern tech pattern
        createTechPattern(ctx, x, y, width, height, accentColor);
      }
      break;
      
    case 'project':
      // Projects: Code/architecture visualization
      createCodeVisualization(ctx, x, y, width, height, accentColor);
      break;
      
    case 'book':
      // Books: Literary/creative elements
      createLiteraryElements(ctx, x, y, width, height, accentColor);
      break;
      
    case 'idea':
      // Ideas: Abstract thought bubbles
      createThoughtBubbles(ctx, x, y, width, height, accentColor);
      break;
      
    default:
      // Default: Modern abstract pattern
      createModernPattern(ctx, x, y, width, height, accentColor);
  }
}

// Visual pattern functions
function createCircuitPattern(ctx, x, y, width, height, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  
  // Draw circuit paths
  for (let i = 0; i < 8; i++) {
    const startX = x + Math.random() * width;
    const startY = y + Math.random() * height;
    const endX = x + Math.random() * width;
    const endY = y + Math.random() * height;
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // Add circuit nodes
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(startX, startY, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createNeuralNetwork(ctx, x, y, width, height, color) {
  const nodes = 12;
  const nodePositions = [];
  
  // Generate node positions
  for (let i = 0; i < nodes; i++) {
    nodePositions.push({
      x: x + Math.random() * width,
      y: y + Math.random() * height
    });
  }
  
  // Draw connections
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.6;
  
  for (let i = 0; i < nodes; i++) {
    for (let j = i + 1; j < nodes; j++) {
      if (Math.random() > 0.5) {
        ctx.beginPath();
        ctx.moveTo(nodePositions[i].x, nodePositions[i].y);
        ctx.lineTo(nodePositions[j].x, nodePositions[j].y);
        ctx.stroke();
      }
    }
  }
  
  // Draw nodes
  ctx.globalAlpha = 1;
  ctx.fillStyle = color;
  nodePositions.forEach(pos => {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function createGeometricShapes(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.3;
  
  // Draw various geometric shapes
  for (let i = 0; i < 6; i++) {
    const shapeX = x + Math.random() * width;
    const shapeY = y + Math.random() * height;
    const size = 20 + Math.random() * 40;
    
    if (i % 3 === 0) {
      // Circle
      ctx.beginPath();
      ctx.arc(shapeX, shapeY, size, 0, Math.PI * 2);
      ctx.fill();
    } else if (i % 3 === 1) {
      // Rectangle
      ctx.fillRect(shapeX - size/2, shapeY - size/2, size, size);
    } else {
      // Triangle
      ctx.beginPath();
      ctx.moveTo(shapeX, shapeY - size/2);
      ctx.lineTo(shapeX - size/2, shapeY + size/2);
      ctx.lineTo(shapeX + size/2, shapeY + size/2);
      ctx.closePath();
      ctx.fill();
    }
  }
  
  ctx.globalAlpha = 1;
}

function createTechPattern(ctx, x, y, width, height, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.4;
  
  // Draw tech grid pattern
  for (let i = 0; i < 20; i++) {
    const x1 = x + (i * width / 20);
    const y1 = y;
    const x2 = x1;
    const y2 = y + height;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  
  for (let i = 0; i < 15; i++) {
    const x1 = x;
    const y1 = y + (i * height / 15);
    const x2 = x + width;
    const y2 = y1;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  
  ctx.globalAlpha = 1;
}

function createCodeVisualization(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.font = '14px monospace';
  
  // Draw code-like structure
  const codeLines = [
    'function build() {',
    '  const vision = create();',
    '  const execution = implement();',
    '  return vision + execution;',
    '}'
  ];
  
  codeLines.forEach((line, index) => {
    ctx.fillText(line, x + 20, y + 30 + (index * 25));
  });
  
  // Add syntax highlighting dots
  for (let i = 0; i < 15; i++) {
    const dotX = x + width - 50 + Math.random() * 30;
    const dotY = y + 20 + Math.random() * (height - 40);
    const radius = 2 + Math.random() * 3;
    
    ctx.beginPath();
    ctx.arc(dotX, dotY, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createLiteraryElements(ctx, x, y, width, height, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  
  // Draw book pages
  for (let i = 0; i < 5; i++) {
    const pageX = x + 20 + (i * 15);
    const pageY = y + 20;
    const pageWidth = 80;
    const pageHeight = height - 40;
    
    ctx.strokeRect(pageX, pageY, pageWidth, pageHeight);
    
    // Add text lines
    ctx.fillStyle = color;
    ctx.font = '12px serif';
    for (let j = 0; j < 8; j++) {
      const lineY = pageY + 25 + (j * 15);
      ctx.fillText('Lorem ipsum', pageX + 10, lineY);
    }
  }
}

function createThoughtBubbles(ctx, x, y, width, height, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  
  // Draw thought bubbles
  for (let i = 0; i < 4; i++) {
    const bubbleX = x + 30 + (i * 80);
    const bubbleY = y + 30 + (i * 40);
    const bubbleSize = 30 + Math.random() * 20;
    
    // Main bubble
    ctx.beginPath();
    ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
    ctx.stroke();
    
    // Smaller connecting bubbles
    for (let j = 0; j < 3; j++) {
      const smallX = bubbleX + bubbleSize + 10 + (j * 8);
      const smallY = bubbleY - 10 + (j * 5);
      const smallSize = 5 + Math.random() * 8;
      
      ctx.beginPath();
      ctx.arc(smallX, smallY, smallSize, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

function createModernPattern(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.2;
  
  // Create modern abstract pattern
  for (let i = 0; i < 25; i++) {
    const patternX = x + Math.random() * width;
    const patternY = y + Math.random() * height;
    const patternSize = 10 + Math.random() * 30;
    
    ctx.beginPath();
    ctx.arc(patternX, patternY, patternSize, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.globalAlpha = 1;
}

// Main function to generate Open Graph image
async function generateOGImage(contentData) {
  const canvas = createCanvas(ogImageConfig.dimensions.width, ogImageConfig.dimensions.height);
  const ctx = canvas.getContext('2d');
  
  const contentType = contentData.type || 'post';
  const category = contentData.category || 'general';
  const colorScheme = getColorScheme(contentType, category);
  
  // Fill background
  ctx.fillStyle = colorScheme.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Create main card background with glass effect
  const cardPadding = 60;
  const cardWidth = canvas.width - (cardPadding * 2);
  const cardHeight = canvas.height - (cardPadding * 2);
  
  // Card background
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
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
  ctx.strokeStyle = colorScheme.accent;
  ctx.lineWidth = 2;
  ctx.strokeRect(cardPadding, cardPadding, cardWidth, cardHeight);
  
  // Category tag
  const categoryText = contentData.category || contentType.toUpperCase();
  ctx.fillStyle = colorScheme.accent;
  ctx.strokeStyle = colorScheme.accent;
  ctx.lineWidth = 1;
  
  const categoryX = cardPadding + 40;
  const categoryY = cardPadding + 40;
  const categoryWidth = 120;
  const categoryHeight = 40;
  
  // Category background
  ctx.fillStyle = `${colorScheme.accent}20`;
  ctx.fillRect(categoryX, categoryY, categoryWidth, categoryHeight);
  ctx.strokeRect(categoryX, categoryY, categoryWidth, categoryHeight);
  
  // Category text
  ctx.fillStyle = colorScheme.accent;
  ctx.font = `bold 16px ${ogImageConfig.fonts.category}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(categoryText, categoryX + categoryWidth/2, categoryY + categoryHeight/2);
  
  // Title
  ctx.fillStyle = ogImageConfig.colors.text.primary;
  ctx.font = `bold 48px ${ogImageConfig.fonts.title}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  const titleX = cardPadding + 40;
  const titleY = categoryY + categoryHeight + 30;
  const maxTitleWidth = cardWidth - 400;
  
  // Wrap title if too long
  const titleLines = wrapText(ctx, contentData.title, maxTitleWidth);
  titleLines.forEach((line, index) => {
    ctx.fillText(line, titleX, titleY + (index * 60));
  });
  
  // Visual element (right side)
  const visualX = cardPadding + cardWidth - 300;
  const visualY = titleY;
  const visualSize = 280;
  
  // Create visual layout based on content type
  createVisualLayout(ctx, visualX, visualY, visualSize, visualSize, contentType, category, colorScheme.accent);
  
  // Introductory text (below title, left side)
  const introX = titleX;
  const introY = titleY + (titleLines.length * 60) + 40;
  const introWidth = cardWidth - 400;
  
  ctx.fillStyle = ogImageConfig.colors.text.secondary;
  ctx.font = `20px ${ogImageConfig.fonts.body}`;
  ctx.textAlign = 'left';
  
  const introText = contentData.abstract || contentData.excerpt || 'Content preview...';
  const introLines = wrapText(ctx, introText, introWidth);
  introLines.forEach((line, index) => {
    ctx.fillText(line, introX, introY + (index * 28));
  });
  
  // Metadata section (below intro text)
  const metadataY = introY + (introLines.length * 28) + 30;
  
  const metadata = [
    { label: 'By', value: contentData.author || 'Mustafa Khan', highlight: true },
    { label: 'Published on', value: contentData.date || 'Date' },
    { label: 'Last Updated on', value: contentData.date || 'Date' },
    { label: '', value: `${contentData.readingTime || '5'} min read` }
  ];
  
  metadata.forEach((item, index) => {
    const y = metadataY + (index * 25);
    
    // Label
    if (item.label) {
      ctx.fillStyle = ogImageConfig.colors.text.muted;
      ctx.font = `16px ${ogImageConfig.fonts.body}`;
      ctx.fillText(item.label, introX, y);
    }
    
    // Value
    ctx.fillStyle = item.highlight ? colorScheme.accent : ogImageConfig.colors.text.primary;
    ctx.font = item.highlight ? `bold 16px ${ogImageConfig.fonts.body}` : `16px ${ogImageConfig.fonts.body}`;
    const valueX = item.label ? introX + 120 : introX;
    ctx.fillText(item.value, valueX, y);
  });
  
  // Summary text at bottom
  const summaryY = metadataY + (metadata.length * 25) + 30;
  ctx.fillStyle = ogImageConfig.colors.text.muted;
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
async function generateAndSaveOGImage(contentData, outputPath) {
  try {
    const canvas = await generateOGImage(contentData);
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

// Sample content data for different types
const sampleContent = {
  posts: [
    {
      title: 'So You Want to Build Hardware?',
      category: 'robotics',
      abstract: 'Good choice. Software is fun, but hardware is where things get real. It\'s the moment when lines of code turn into blinking LEDs, buzzing motors, and actual machines.',
      author: 'Mustafa Khan',
      date: 'August 28, 2025',
      readingTime: '4',
      excerpt: 'Good choice. Software is fun, but hardware is where things get real. It\'s the moment when lines of code turn into blinking LEDs, buzzing motors, and actual machines.',
      type: 'post'
    },
    {
      title: 'Understanding Neural Networks',
      category: 'ai',
      abstract: 'Deep dive into the mathematics and implementation of neural networks.',
      author: 'Mustafa Khan',
      date: 'September 2, 2025',
      readingTime: '12',
      excerpt: 'Deep dive into the mathematics and implementation of neural networks.',
      type: 'post'
    },
    {
      title: 'The Philosophy of Technology',
      category: 'philosophy',
      abstract: 'Exploring the deeper questions about our relationship with technology.',
      author: 'Mustafa Khan',
      date: 'September 5, 2025',
      readingTime: '8',
      excerpt: 'Exploring the deeper questions about our relationship with technology.',
      type: 'post'
    }
  ],
  projects: [
    {
      title: 'Robotic Arm Controller',
      category: 'engineering',
      abstract: 'A sophisticated control system for robotic arms with computer vision integration.',
      author: 'Mustafa Khan',
      date: 'August 2025',
      readingTime: '15',
      excerpt: 'A sophisticated control system for robotic arms with computer vision integration.',
      type: 'project'
    },
    {
      title: 'AI-Powered Code Analyzer',
      category: 'ai',
      abstract: 'Machine learning system that analyzes code quality and suggests improvements.',
      author: 'Mustafa Khan',
      date: 'July 2025',
      readingTime: '20',
      excerpt: 'Machine learning system that analyzes code quality and suggests improvements.',
      type: 'project'
    }
  ],
  books: [
    {
      title: 'Design Patterns in Software',
      category: 'creative',
      abstract: 'Comprehensive guide to software design patterns and best practices.',
      author: 'Mustafa Khan',
      date: 'June 2025',
      readingTime: '25',
      excerpt: 'Comprehensive guide to software design patterns and best practices.',
      type: 'book'
    }
  ],
  ideas: [
    {
      title: 'Future of Human-Computer Interaction',
      category: 'philosophy',
      abstract: 'Exploring the next generation of interfaces and how we\'ll interact with technology.',
      author: 'Mustafa Khan',
      date: 'September 2025',
      readingTime: '10',
      excerpt: 'Exploring the next generation of interfaces and how we\'ll interact with technology.',
      type: 'idea'
    }
  ]
};

// Main function to generate all Open Graph images
async function main() {
  console.log('🎨 Generating Open Graph images for all content types...');
  
  // Generate images for posts
  for (const post of sampleContent.posts) {
    const postSlug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const outputPath = path.join(__dirname, `../public/assets/og-images/post-${postSlug}.png`);
    await generateAndSaveOGImage(post, outputPath);
  }
  
  // Generate images for projects
  for (const project of sampleContent.projects) {
    const projectSlug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const outputPath = path.join(__dirname, `../public/assets/og-images/project-${projectSlug}.png`);
    await generateAndSaveOGImage(project, outputPath);
  }
  
  // Generate images for books
  for (const book of sampleContent.books) {
    const bookSlug = book.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const outputPath = path.join(__dirname, `../public/assets/og-images/book-${bookSlug}.png`);
    await generateAndSaveOGImage(book, outputPath);
  }
  
  // Generate images for ideas
  for (const idea of sampleContent.ideas) {
    const ideaSlug = idea.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const outputPath = path.join(__dirname, `../public/assets/og-images/idea-${ideaSlug}.png`);
    await generateAndSaveOGImage(idea, outputPath);
  }
  
  // Generate homepage image
  const homeData = {
    title: 'Mustafa Khan',
    category: 'portfolio',
    abstract: 'Software Engineer & Researcher — essays, projects, and ideas by Mustafa Khan.',
    author: 'Mustafa Khan',
    date: '2025',
    readingTime: '1',
    excerpt: 'Software Engineer & Researcher — essays, projects, and ideas by Mustafa Khan.',
    type: 'home'
  };
  
  const homeOutputPath = path.join(__dirname, '../public/assets/og-images/home.png');
  await generateAndSaveOGImage(homeData, homeOutputPath);
  
  console.log('✨ Open Graph image generation complete!');
  console.log('📁 Images saved to: public/assets/og-images/');
  console.log('🎨 Each content type now has unique, beautiful visual designs!');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  generateOGImage,
  generateAndSaveOGImage
};
