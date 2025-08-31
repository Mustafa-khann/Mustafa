#!/usr/bin/env node

/**
 * Professional OpenGraph Image Creation Script
 * Creates content-type specific images using existing assets and professional design
 */

const fs = require('fs');
const path = require('path');

// Create high-quality SVG templates for OpenGraph images
const createProfessionalOGSVG = (contentType, config) => {
  const { bgColor, accentColor = '#00d1b2', icon, title, subtitle } = config;
  
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Professional gradient backgrounds -->
      <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${bgColor}aa;stop-opacity:1" />
      </linearGradient>
      
      <!-- Accent gradient -->
      <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${accentColor};stop-opacity:1" />
        <stop offset="50%" style="stop-color:${accentColor};stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:${accentColor};stop-opacity:0.6" />
      </linearGradient>
      
      <!-- Text shadow filter -->
      <filter id="textShadow">
        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
      </filter>
      
      <!-- Glow effect -->
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Main background -->
    <rect width="1200" height="630" fill="url(#mainGradient)"/>
    
    <!-- Professional geometric elements -->
    <rect x="0" y="0" width="12" height="630" fill="url(#accentGradient)"/>
    <rect x="1188" y="0" width="12" height="630" fill="url(#accentGradient)" opacity="0.3"/>
    
    <!-- Top accent line -->
    <rect x="0" y="0" width="1200" height="4" fill="url(#accentGradient)"/>
    
    <!-- Content area -->
    <g transform="translate(80, 0)">
      <!-- Brand area -->
      <g transform="translate(0, 100)">
        <!-- Main icon/emoji with glow -->
        <text x="0" y="80" 
              font-family="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif" 
              font-size="120" 
              fill="${accentColor}"
              filter="url(#glow)">${icon}</text>
        
        <!-- Content type title -->
        <text x="160" y="30" 
              font-family="'SF Pro Display', 'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" 
              font-size="84" 
              font-weight="800" 
              fill="white"
              filter="url(#textShadow)">${title}</text>
              
        <!-- Subtitle -->
        <text x="160" y="80" 
              font-family="'SF Pro Text', 'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" 
              font-size="36" 
              font-weight="400" 
              fill="#e2e8f0">${subtitle}</text>
      </g>
      
      <!-- Author signature -->
      <g transform="translate(0, 400)">
        <text x="0" y="0" 
              font-family="'SF Pro Display', 'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" 
              font-size="48" 
              font-weight="600" 
              fill="white"
              filter="url(#textShadow)">Mustafa Khan</text>
              
        <text x="0" y="40" 
              font-family="'SF Pro Text', 'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" 
              font-size="28" 
              font-weight="400" 
              fill="#94a3b8">Software Engineer & Researcher</text>
              
        <text x="0" y="80" 
              font-family="'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace" 
              font-size="24" 
              font-weight="400" 
              fill="${accentColor}">mustafakhan.xyz</text>
      </g>
      
      <!-- Decorative professional elements -->
      <g opacity="0.15" fill="${accentColor}">
        <!-- Abstract geometric shapes -->
        <circle cx="900" cy="120" r="80"/>
        <circle cx="1000" cy="200" r="40"/>
        <rect x="880" y="300" width="200" height="6" rx="3"/>
        <rect x="920" y="320" width="120" height="4" rx="2"/>
        
        <!-- Tech-inspired grid pattern -->
        <g opacity="0.3">
          <line x1="850" y1="450" x2="1050" y2="450" stroke="${accentColor}" stroke-width="1"/>
          <line x1="850" y1="470" x2="1050" y2="470" stroke="${accentColor}" stroke-width="1"/>
          <line x1="850" y1="490" x2="1050" y2="490" stroke="${accentColor}" stroke-width="1"/>
          <line x1="900" y1="430" x2="900" y2="510" stroke="${accentColor}" stroke-width="1"/>
          <line x1="950" y1="430" x2="950" y2="510" stroke="${accentColor}" stroke-width="1"/>
          <line x1="1000" y1="430" x2="1000" y2="510" stroke="${accentColor}" stroke-width="1"/>
        </g>
      </g>
    </g>
    
    <!-- Bottom accent -->
    <rect x="0" y="626" width="1200" height="4" fill="url(#accentGradient)"/>
  </svg>`;
};

// Professional configuration for each content type
const professionalConfigs = {
  posts: {
    bgColor: '#0d1117',  // GitHub dark theme inspired
    accentColor: '#00d1b2',
    icon: '📝',
    title: 'Essays & Notes',
    subtitle: 'Technical thoughts and explorations'
  },
  ideas: {
    bgColor: '#1e1b4b',  // Deep purple for research/academic feel
    accentColor: '#8b5cf6', 
    icon: '💡',
    title: 'Research & Ideas',
    subtitle: 'Intellectual explorations and findings'
  },
  projects: {
    bgColor: '#0c0a09',  // Rich dark for engineering feel
    accentColor: '#f59e0b',
    icon: '🚀',
    title: 'Projects & Builds', 
    subtitle: 'Engineering and technical implementations'
  },
  books: {
    bgColor: '#18181b',  // Classic reading theme
    accentColor: '#ef4444',
    icon: '📚',
    title: 'Book Recommendations',
    subtitle: 'Curated reading across disciplines'
  }
};

// Generate professional SVG files
const assetsDir = path.join(__dirname, '../public/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

console.log('🎨 Generating professional OpenGraph images...\n');

Object.entries(professionalConfigs).forEach(([contentType, config]) => {
  const svg = createProfessionalOGSVG(contentType, config);
  const filename = `og-fallback-${contentType}.svg`;
  const filepath = path.join(assetsDir, filename);
  
  fs.writeFileSync(filepath, svg);
  console.log(`✅ Generated: ${filename}`);
  console.log(`   Theme: ${config.bgColor} with ${config.accentColor} accent`);
  console.log(`   Content: ${config.title} - ${config.subtitle}\n`);
});

console.log('🎉 Professional OpenGraph images generated successfully!');
console.log('\n💡 Next steps:');
console.log('   - SVG files are scalable and work well for modern browsers');
console.log('   - Consider converting to JPG/PNG if needed for better compatibility');
console.log('   - Test social media previews on Twitter, LinkedIn, Facebook');

// Also create a template for dynamic content-specific images
const createContentSpecificTemplate = () => {
  return `<!-- 
Template for generating dynamic OpenGraph images for specific content items.
This can be used to create unique images for individual posts, projects, etc.

Usage:
- Replace {{TITLE}} with actual content title
- Replace {{DESCRIPTION}} with content description
- Replace {{TYPE_COLOR}} with content type color
- Replace {{TYPE_ICON}} with content type icon

Example for generating post-specific image:
const postImage = createContentSpecificTemplate()
  .replace('{{TITLE}}', post.title)
  .replace('{{DESCRIPTION}}', post.excerpt)
  .replace('{{TYPE_COLOR}}', '#00d1b2')
  .replace('{{TYPE_ICON}}', '📝');
-->
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <!-- Template SVG for content-specific images -->
  <!-- Implementation details would go here -->
</svg>`;
};

// Save the template for future use
const templatePath = path.join(__dirname, 'og-image-template.svg');
fs.writeFileSync(templatePath, createContentSpecificTemplate());
console.log(`\n📋 Template saved: og-image-template.svg`);