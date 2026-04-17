# Valentine's Day Gift Shop - Assignment 2

A responsive Valentine's Day landing page with dual-mode (Couple/Single) toggle, dynamic product integration via Shopify Storefront API, and category filtering.

## Features Implemented

### Mode Toggle Animation
- **Couple Mode**: Red/warm theme with "This Valentine's Gift Comfort" headline
- **Single Mode**: Dark/black theme with "Be Your Own Bae" headline
- Smooth sliding animation inspired by Blinkit, Zepto, Swiggy Instamart apps
- Uses `cubic-bezier(0.34, 1.56, 0.64, 1)` easing for snappy transitions

### Video Banners
- Couple Mode video: `https://cdn.shopify.com/videos/c/o/v/c102dc6ee2be49fc9935403b43e413bb.mp4`
- Single Mode video: `https://cdn.shopify.com/videos/c/o/v/452bedba47694a96a7e5684c79a0eeb3.mp4`

### Shopify Storefront API Integration
- Dynamic product fetching by category tags
- Product cards display: image, name, original price, sale price, discount badge, Add to Cart button
- Fallback mock data when Shopify credentials are not configured

### Category Filter Tabs
- Couple Mode: Sleep, Travel, WFH, GYM
- Single Mode: Mom, Dad, BFF, Kids
- Dynamic filtering via Shopify tags

### Interactive Elements
- **Shop Now**: Smooth scroll to products section
- **View Collections**: Smooth scroll to products section
- **Add to Cart**: Visual feedback with "Added!" confirmation
- Category tabs with active state animations

## Tech Stack

- Next.js 16 with TypeScript
- Tailwind CSS 4
- Lucide React icons
- Shopify Storefront API

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL=https://your-store.myshopify.com/api/2024-01/graphql.json
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

## Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Building for Production

```bash
npm run build
```

Static files will be output to the `dist/` directory.

## Deployment on Render

1. Push code to GitHub
2. Connect repository on [Render.com](https://render.com)
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Deploy!

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main landing page
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles
├── components/
│   ├── HeroSection.tsx   # Hero with mode toggle and videos
│   ├── ModeToggle.tsx    # Animated toggle component
│   ├── ProductCard.tsx   # Product display card
│   ├── ProductGrid.tsx   # Grid with category filtering
│   ├── CategoryTabs.tsx  # Category filter tabs
│   └── Footer.tsx        # Footer component
├── lib/
│   ├── shopify.ts        # Shopify API integration
│   └── utils.ts          # Utility functions (cn)
└── types/
    └── product.ts        # TypeScript interfaces
```

## Assignment Requirements Checklist

- [x] Mode Toggle Animation (Couple/Single)
- [x] Couple Mode with red/warm theme and "This Valentine's Gift Comfort"
- [x] Single Mode with dark/black theme and "Be Your Own Bae"
- [x] Video banners from provided Shopify CDN URLs
- [x] Shopify Storefront API integration for products
- [x] Product cards with image, name, prices, discount badge, Add to Cart
- [x] Category Filter Tabs (Sleep, Travel, WFH, GYM / Mom, Dad, BFF, Kids)
- [x] Dynamic product filtering via tags
- [x] Responsive design for mobile and desktop
- [x] Interactive click actions

## Links

- **Live Demo**: https://vlgifts.onrender.com/
- **GitHub Repo**: https://github.com/omkar0605shelar/valentines-landing-page
