# Image Placeholders

These image files are placeholders for the XL:UK Radio website. In a production environment, you would replace these with actual optimized images.

## Image Usage

- `app.jpg` - Used for the mobile app news article
- `award.jpg` - Used for award-related news
- `charity.jpg` - Used for charity event news
- `dj.jpg` - Used for DJ-related news
- `dj1.jpg`, `dj2.jpg` - Used for DJ profiles
- `event1.jpg`, `event2.jpg` - Used for event listings
- `festival.jpg` - Used for festival news and events
- `hero-bg.jpg` - Used as the hero background image
- `show1.jpg`, `show2.jpg`, `show3.jpg` - Used for radio show listings
- `studio.jpg` - Used for studio-related news

## Benefits of Local Images

Using locally hosted images instead of external URLs from services like Unsplash or Pexels provides several benefits:

1. **No CORB (Cross-Origin Read Blocking) issues** - Prevents browser security mechanisms from blocking image loading
2. **No third-party cookie warnings** - Eliminates warnings about SameSite cookie attributes
3. **Improved performance** - Reduces external HTTP requests
4. **Better reliability** - No dependency on external services that might change or become unavailable
5. **Full control over optimization** - Allows for proper image optimization for your specific use case

## Image Optimization

For production, consider optimizing these images using tools like:
- [Sharp](https://sharp.pixelplumbing.com/)
- [Squoosh](https://squoosh.app/)
- [TinyPNG](https://tinypng.com/)

Optimized images should be:
- Appropriately sized for their display dimensions
- Compressed to reduce file size
- Provided in modern formats like WebP where supported
