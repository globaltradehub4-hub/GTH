# GTH Academy Landing Page

## Project Overview
- **Name**: GTH Academy
- **Goal**: Modern, premium landing page for GTH Academy mobile app — designed to drive app downloads
- **Primary CTA**: Download GTH Academy app from Google Play & App Store
- **Tech Stack**: Hono + TypeScript + Cloudflare Pages

## URLs
- **Google Play**: https://play.google.com/store/apps/details?id=com.gthacademy
- **App Store**: https://apps.apple.com/us/app/gth-academy/id6759160682
- **Reference Website**: https://gthub.am/

## Design System
- **Color Palette**: Dark black/graphite backgrounds, red neon accents (#e8192c), white text
- **Style**: Modern premium cyber urban business-tech / neon cinematic brand style
- **Typography**: Inter (300–900 weights) via Google Fonts
- **Icons**: FontAwesome 6.5.0 via CDN
- **Animations**: CSS keyframes (float, pulse, glow), IntersectionObserver fade-ins

## Page Sections

1. **Header** — Sticky nav with GTH Academy logo, nav links, download CTA, hamburger mobile menu
2. **Hero** — Full-screen hero with phone mockup, app download buttons, stats
3. **Trusted By** — Program categories strip
4. **How It Works** — 3-step process cards
5. **Programs** — 12-program grid cards (Բիզնես 360, Menthory, and 10 more)
6. **App Features** — Feature list with phone visual
7. **Contact Form** — Name, phone, email, program dropdown, message, privacy checkbox
8. **Final CTA** — Large download section
9. **Footer** — Brand info, nav links, app download buttons, social icons
10. **Mobile Sticky Bar** — Fixed bottom CTA for mobile users

## APIs
- `GET /` — Serves the landing page
- `POST /api/contact` — Handles contact form submissions

## Features Implemented
- ✅ Fully responsive (mobile-first)
- ✅ Armenian language throughout
- ✅ Sticky header with scroll behavior
- ✅ Mobile hamburger menu
- ✅ Phone mockup with float animation
- ✅ Red neon glow effects
- ✅ Fade-in scroll animations
- ✅ Contact form with validation
- ✅ Mobile sticky download bar
- ✅ Active nav link highlighting
- ✅ All 12 programs listed
- ✅ Google Play + App Store links throughout

## Deployment
- **Platform**: Cloudflare Pages
- **Build command**: `npm run build`
- **Output dir**: `dist/`
- **Status**: Ready for deployment
- **Last Updated**: 2025-06-08
