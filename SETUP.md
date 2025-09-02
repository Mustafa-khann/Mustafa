# 🚀 Quick Setup Guide

## Open Graph Images for Social Media

Your blog now has beautiful, automatically generated Open Graph images that will make your posts look amazing when shared on social media!

### ✨ What You Get

- **Beautiful post headers** with category tags, titles, and metadata
- **Automatic Open Graph images** for social media sharing
- **Professional appearance** when links are shared on Twitter, Facebook, LinkedIn, etc.

### 🎯 How It Works

1. **Automatic Detection**: The SEO component automatically finds the right Open Graph image for each post
2. **Fallback System**: If no custom image exists, it uses your default profile image
3. **Social Media Ready**: Images are optimized for all social platforms (1200x630px)

### 🛠️ Quick Commands

```bash
# Generate images for all sample posts
npm run generate-og

# Generate image for a single new post
npm run generate-post-og "Post Title" "CATEGORY" "Description"

# Example
npm run generate-post-og "My New Tutorial" "TUTORIAL" "Learn how to build amazing things"
```

### 📁 Generated Images

Your Open Graph images are stored in:
```
public/assets/og-images/
├── post-hardware.png                    # Hardware post
├── post-getting-started-with-robotics.png
└── post-understanding-neural-networks.png
```

### 🔄 For New Posts

When you create a new post:

1. **Generate the OG image**:
   ```bash
   npm run generate-post-og "Your Post Title" "CATEGORY" "Your description"
   ```

2. **The image is automatically used** when you share the post link

3. **No code changes needed** - the system detects and uses the image automatically

### 🎨 Customization

- **Colors**: Edit `scripts/generate-og-images.js` → `colors` object
- **Fonts**: Modify the `fonts` object
- **Layout**: Adjust the `generatePostOGImage` function

### 📱 Test Your Images

1. **Generate an image** for your post
2. **Share the post URL** on social media
3. **See the beautiful preview** with your custom image!

### 🚨 Troubleshooting

If you get canvas installation errors:
```bash
# Ubuntu/Debian
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# Then reinstall
npm install canvas --save-dev
```

---

**🎉 You're all set!** Your posts will now look professional and engaging when shared on social media.
