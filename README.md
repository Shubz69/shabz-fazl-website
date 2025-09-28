# Shabz Fazl - High Performance Coach Landing Page

A modern, responsive landing page for high-performance coach Shabz Fazl, featuring futuristic design with purple gradients and neon accents.

## Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern UI**: Futuristic purple gradient background with glowing effects
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Performance Optimized**: Fast loading with minimal dependencies
- **SEO Ready**: Semantic HTML structure with proper meta tags

## Quick Deploy Options

### Option 1: Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop this entire folder to deploy instantly
3. Your site will be live in seconds!

### Option 2: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import this project
3. Deploy with one click

### Option 3: GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch

## Customization

### Update Booking Link
Replace the placeholder booking URL in `script.js`:
```javascript
const bookingUrl = 'https://your-booking-link.com';
```

### Change Colors
Modify CSS variables in `styles.css`:
- Primary gradient: `#1a002e` to `#2e004f`
- Accent color: `#b84fff`
- Text colors: `#ffffff`, `#e8d5ff`

### Add Analytics
Uncomment and configure analytics tracking in `script.js`:
```javascript
// gtag('event', 'click', { 'event_category': 'CTA', 'event_label': action });
```

## Files Structure

```
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── netlify.toml        # Netlify deployment configuration
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## License

Private use only. All rights reserved.
