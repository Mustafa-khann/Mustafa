# Professional OpenGraph System

This website now features a comprehensive, professional OpenGraph system that automatically generates appropriate social media preview images for all content types.

## Features

### 🎯 Content-Type Aware Images
- **Posts**: Uses industrial/technical theme (`factory.jpeg`) or extracts images from content
- **Ideas**: Uses personal/intellectual theme (`mustafa.jpeg`) or extracts research images  
- **Projects**: Uses engineering theme (`drone-1080.jpg`) or project-specific images
- **Books**: Uses custom book-themed SVG with professional typography
- **Home**: Uses main profile image

### 🖼️ Smart Image Selection
1. **Explicit images**: If an `image` prop is provided, it takes priority
2. **Content images**: Automatically extracts suitable images from post/idea content
3. **Content-specific**: Uses the item's own image property (projects, books)
4. **Type fallbacks**: Uses professional content-type specific fallbacks
5. **Ultimate fallback**: Uses main profile image

### 🎨 Professional Fallback Images
- **Posts**: Industrial factory theme - represents technical writing and engineering focus
- **Ideas**: Personal profile - represents intellectual and research content
- **Projects**: Drone/robotics theme - represents engineering and technical builds
- **Books**: Custom SVG with typography focus and book iconography

### 📋 Enhanced Metadata
- Proper OpenGraph type tags (`article`, `book`, `website`)
- Author information for articles
- Publication dates and modification times
- Tag support for categorization  
- Twitter Card optimization
- Image alt text for accessibility

## Usage

### Basic Usage (Automatic)
The enhanced SEO component automatically detects content types and selects appropriate images:

```jsx
// For detail pages
<SEO 
  title={item.title}
  description={item.description}
  contentType="post"
  contentItem={item}
  author="Mustafa Khan"
/>

// For list pages  
<SEO 
  title="Posts"
  description="Technical writings"
  contentType="posts"
/>
```

### Advanced Usage
```jsx
// Override with specific image
<SEO 
  title="Special Post"
  image="/assets/custom-image.jpg"
  contentType="post"
  contentItem={post}
/>
```

### Utility Functions
```jsx
import { getOpenGraphImage, extractImageFromContent } from '../utils/openGraphImages';

// Get best image for any content item
const imageUrl = getOpenGraphImage(post, 'post');

// Extract images from HTML content
const contentImage = extractImageFromContent(post.content);
```

## Image Selection Logic

1. **Projects**: `item.image` → project fallback → default
2. **Books**: `item.cover` → books fallback → default  
3. **Posts**: extracted from content → posts fallback → default
4. **Ideas**: extracted from content → ideas fallback → default

## Files Modified

- `src/components/common/seo/SEO.js` - Enhanced with content-type awareness
- `src/utils/openGraphImages.js` - New comprehensive image utility
- `src/components/PostDetail.js` - Updated to use enhanced SEO
- `src/components/IdeaDetail.js` - Updated to use enhanced SEO
- `src/components/ProjectDetail.js` - Updated to use enhanced SEO
- `src/pages/*.js` - All list pages updated with content-type aware SEO

## Generated Assets

- `assets/og-fallback-posts.svg` - Professional posts theme
- `assets/og-fallback-ideas.svg` - Research/academic theme  
- `assets/og-fallback-projects.svg` - Engineering theme
- `assets/og-fallback-books.svg` - Typography-focused book theme

## Testing

Test OpenGraph previews on:
- Twitter/X card validator
- Facebook sharing debugger
- LinkedIn post inspector
- Discord link previews

## Future Enhancements

1. **Dynamic text overlay**: Add title/description overlays on images
2. **API integration**: Generate images server-side for better performance
3. **Cache optimization**: Cache generated images for faster loading
4. **A/B testing**: Test different themes for engagement metrics