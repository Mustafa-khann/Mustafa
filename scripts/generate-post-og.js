#!/usr/bin/env node

const { generateAndSaveOGImage } = require('./generate-og-images');
const path = require('path');

// Simple CLI interface for generating post OG images
async function generatePostOG() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🎨 Post Open Graph Image Generator');
    console.log('');
    console.log('Usage: node scripts/generate-post-og.js "Post Title" "Category" "Abstract" [Author] [Date] [ReadingTime]');
    console.log('');
    console.log('Example:');
    console.log('  node scripts/generate-post-og.js "My New Post" "TUTORIAL" "This is a description of my post" "Mustafa Khan" "September 2, 2025" "6"');
    console.log('');
    return;
  }
  
  const [title, category, abstract, author = 'Mustafa Khan', date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }), readingTime = '5'] = args;
  
  const postData = {
    title,
    category: category.toUpperCase(),
    abstract,
    author,
    date,
    readingTime,
    excerpt: abstract
  };
  
  console.log('🎨 Generating Open Graph image for post...');
  console.log(`📝 Title: ${title}`);
  console.log(`🏷️  Category: ${category}`);
  console.log(`✍️  Author: ${author}`);
  console.log(`📅 Date: ${date}`);
  console.log(`⏱️  Reading Time: ${readingTime} min`);
  console.log('');
  
  const postSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const outputPath = path.join(__dirname, `../public/assets/og-images/post-${postSlug}.png`);
  
  try {
    await generateAndSaveOGImage(postData, outputPath);
    console.log('✅ Success! Open Graph image generated.');
    console.log(`📁 Saved to: public/assets/og-images/post-${postSlug}.png`);
    console.log('');
    console.log('💡 Tip: The image will automatically be used when sharing this post on social media!');
  } catch (error) {
    console.error('❌ Error generating image:', error.message);
    process.exit(1);
  }
}

// Run the script
generatePostOG().catch(console.error);
