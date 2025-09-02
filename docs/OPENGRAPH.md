# Open Graph Image Generation

This system automatically generates beautiful Open Graph images for your blog posts and projects that will appear when sharing links on social media platforms like Twitter, Facebook, LinkedIn, etc.

## 🎨 What It Generates

Each Open Graph image includes:
- **Category tag** (e.g., "ARTICLE", "TUTORIAL", "RESEARCH")
- **Post title** in large, readable font
- **Visual element** (animated dots pattern)
- **Introductory text** from the post
- **Metadata** (author, publish date, reading time)
- **Summary text** at the bottom

## 🚀 How to Use

### 1. Generate Images for All Posts

```bash
npm run generate-og
```

This will create Open Graph images for:
- "So You Want to Build Hardware?" post
- Sample additional posts (customizable)

### 2. Generate Image for a Single Post

```bash
npm run generate-post-og "Post Title" "Category" "Abstract" [Author] [Date] [ReadingTime]
```

**Examples:**
```bash
# Basic usage
npm run generate-post-og "My New Post" "TUTORIAL" "This is a description of my post"

# With all parameters
npm run generate-post-og "Advanced Robotics" "RESEARCH" "Exploring the future of autonomous systems" "Mustafa Khan" "September 2, 2025" "15"

# Using the direct script
node scripts/generate-post-og.js "Quick Tip" "TUTORIAL" "A quick programming tip"
```

**Parameters:**
- `Post Title`: The title of your post
- `Category`: Post category (e.g., TUTORIAL, RESEARCH, ARTICLE)
- `Abstract`: Brief description of the post
- `Author`: Author name (defaults to "Mustafa Khan")
- `Date`: Publication date (defaults to current date)
- `ReadingTime`: Estimated reading time in minutes (defaults to 5)

### 3. Customize for Specific Posts

Edit `scripts/generate-og-images.js` and add your post data:

```javascript
const myPost = {
  title: 'Your Post Title',
  category: 'CATEGORY',
  abstract: 'Your post description...',
  author: 'Mustafa Khan',
  date: 'Date',
  readingTime: '5',
  excerpt: 'Your excerpt...'
};
```

### 3. Automatic Integration

The SEO component automatically detects and uses the appropriate Open Graph image:
- Pass the `post` object to the SEO component
- It will automatically find the matching OG image
- Falls back to default image if no custom image exists

## 📁 File Structure

```
public/assets/og-images/
├── post-hardware.png          # Hardware post
├── post-getting-started-with-robotics.png
├── post-understanding-neural-networks.png
└── ...
```

## 🎯 Customization Options

### Colors
Edit the `colors` object in the script:
```javascript
colors: {
  background: '#0a192f',      // Main background
  card: '#112240',            // Card background
  text: '#ccd6f6',            // Main text
  accent: '#64ffda',          // Accent color
  // ... more colors
}
```

### Fonts
Customize fonts in the `fonts` object:
```javascript
fonts: {
  title: 'NTR, Arial, sans-serif',
  body: 'Source Serif Pro, Georgia, serif',
  category: 'Arial, sans-serif'
}
```

### Visual Elements
Replace the dot pattern with custom images or graphics by modifying the `generatePostOGImage` function.

## 🔧 Technical Details

- **Dimensions**: 1200x630px (optimal for social media)
- **Format**: PNG with transparency support
- **Dependencies**: Node.js Canvas library
- **Performance**: Generated on-demand, cached as static files

## 📱 Social Media Preview

When you share a post link, platforms will automatically:
1. Fetch the Open Graph image
2. Display it in the preview card
3. Show the post title and description
4. Create an engaging social media experience

## 🚨 Troubleshooting

### Canvas Installation Issues
```bash
# On Ubuntu/Debian
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# On macOS
brew install pkg-config cairo pango libpng jpeg giflib librsvg

# Then reinstall canvas
npm install canvas --save-dev
```

### Font Issues
Ensure your custom fonts are available in the `public/fonts/` directory.

## 📈 Future Enhancements

- [ ] Batch generation for all posts in data files
- [ ] Custom visual elements per post category
- [ ] Dynamic color schemes based on post themes
- [ ] Integration with build process for automatic generation
