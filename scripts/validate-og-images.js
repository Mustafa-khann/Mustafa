#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of expected OG images based on the current setup
const expectedImages = [
  'home.png',
  'post-hardware.png',
  'post-so-you-want-to-build-hardware.png',
  'post-understanding-neural-networks.png',
  'post-the-philosophy-of-technology.png',
  'post-getting-started-with-robotics.png',
  'post-books-collection.png',
  'project-robotic-arm-controller.png',
  'project-ai-powered-code-analyzer.png',
  'book-design-patterns-in-software.png',
  'idea-future-of-human-computer-interaction.png'
];

async function validateOGImages() {
  console.log('🔍 Validating Open Graph images...\n');
  
  const ogImagesDir = path.join(__dirname, '../public/assets/og-images');
  
  if (!fs.existsSync(ogImagesDir)) {
    console.log('❌ OG images directory does not exist!');
    console.log('Run: npm run generate-og');
    return;
  }
  
  const existingFiles = fs.readdirSync(ogImagesDir);
  let allValid = true;
  
  console.log('📁 Expected images:');
  expectedImages.forEach(imageName => {
    const exists = existingFiles.includes(imageName);
    const filePath = path.join(ogImagesDir, imageName);
    const size = exists ? fs.statSync(filePath).size : 0;
    
    if (exists && size > 0) {
      console.log(`✅ ${imageName} (${Math.round(size / 1024)}KB)`);
    } else if (exists) {
      console.log(`⚠️  ${imageName} (0KB - empty file)`);
      allValid = false;
    } else {
      console.log(`❌ ${imageName} (missing)`);
      allValid = false;
    }
  });
  
  console.log('\n📁 Additional images found:');
  existingFiles.forEach(fileName => {
    if (!expectedImages.includes(fileName)) {
      const filePath = path.join(ogImagesDir, fileName);
      const size = fs.statSync(filePath).size;
      console.log(`ℹ️  ${fileName} (${Math.round(size / 1024)}KB)`);
    }
  });
  
  console.log('\n🌐 Testing image URLs:');
  const baseUrl = 'https://mustafakhan.xyz';
  expectedImages.forEach(imageName => {
    const url = `${baseUrl}/assets/og-images/${imageName}`;
    console.log(`🔗 ${url}`);
  });
  
  if (allValid) {
    console.log('\n✨ All Open Graph images are valid!');
    console.log('🎯 Your website should now have proper social media previews.');
  } else {
    console.log('\n⚠️  Some images are missing or invalid.');
    console.log('🔧 Run: npm run generate-og');
  }
  
  console.log('\n📱 Test your OG images:');
  console.log('1. Share a link on social media');
  console.log('2. Use https://www.opengraph.xyz to test');
  console.log('3. Check browser dev tools for meta tags');
}

if (require.main === module) {
  validateOGImages().catch(console.error);
}
