# Alpha Dogs Boston — Premium Dog Grooming Website

## Project Overview
A luxury, premium marketing homepage for Alpha Dogs Boston, a professional dog grooming studio in Boston, MA. Built as a high-converting, visually stunning single-page website that rivals award-winning boutique brand websites.

## Architecture
- **Frontend**: React + TypeScript with Vite, Wouter routing, TanStack Query
- **Backend**: Express.js (minimal, serves frontend only — no API needed for this marketing site)
- **Styling**: Tailwind CSS + custom CSS animations, Cormorant Garamond + Playfair Display (luxury typography)
- **UI Components**: Radix UI / Shadcn components + fully custom components

## Design System
### Color Palette (Refined — all warm, zero cool tones)
- Ivory Background: `#FAF7F1`
- Warm Linen (alt sections): `#F0E5D5`
- Cards/White: `#FFFFFF`
- Deep Walnut (dark sections): `#241808`
- Dark Overlay: `#1A0E06`, `#160E06`
- Primary Bronze Accent: `#9E6B28`
- Mid Bronze: `#B87A38`
- Light Bronze / Champagne: `#D4A060`
- Heading Text (light bg): `#1A1208`
- Body Text: `#2E1E0E`, `#52402E`
- Muted Text: `#7A6450`, `#A88C72`
- Cream Text (dark bg): `#F8EED6`
- Body on Dark: `#C8AE90`
- Borders: `#DDD0BC`, `#E8D8C4`

### Animation Palette Rule
- ALL animations must stay within the warm bronze/ivory palette
- NO hue-rotate in CSS animations (removed from reptile-iridescence to prevent teal/blue shift)
- Canvas particles: `rgba(184,122,56,...)` — warm bronze only

### Typography
- Display Headings: Cormorant Garamond (elegant, editorial)
- Section Headings: Playfair Display
- Body: DM Sans (clean, readable)

## Page Structure (client/src/pages/Home.tsx)
All sections are in a single page file with sub-components:
1. **Navbar** — sticky glass morphism nav, becomes opaque on scroll
2. **HeroSection** — full-screen cinematic hero with premium dog image
3. **TrustBadges** — animated stat counters on dark background
4. **ServicesSection** — 6 premium service cards with hover animations
5. **WhyChooseUs** — two-column layout with reason cards
6. **GallerySection** — image grid on dark background
7. **TestimonialsSection** — 6 client review cards
8. **CTABand** — parallax CTA with booking/call buttons
9. **AboutSection** — two-column about section with groomer photo
10. **FAQSection** — accordion FAQ with 8 questions
11. **ContactSection** — booking form + hours/location/map
12. **Footer** — full footer with navigation, contact, social links

## Images (client/public/images/)
- `hero-dog.png` — Hero section background (AI generated)
- `dog-gallery-1.png` through `dog-gallery-5.png` — Gallery images (AI generated)
- `about-groomer.png` — About section image (AI generated)

## Custom CSS (client/src/index.css)
- Scroll reveal animations (`.reveal`, `.reveal-left`, `.reveal-right`)
- Luxury shadow utilities (`.luxury-shadow`, `.luxury-shadow-lg`)
- Bronze gradient buttons (`.cta-button-primary`, `.cta-button-outline`)
- Glass morphism navbar (`.glass-nav`)
- Gallery hover effects, service card hover, testimonial card hover
- Animated counters, FAQ accordion

## Business Info
- Phone: (617) 555-0192
- Address: 147 Newbury St, Suite 2, Boston, MA 02116
- Hours: Mon–Fri 8am–7pm, Sat 8am–6pm, Sun 10am–4pm

## Key Features
- Sticky transparent navbar → solid on scroll
- Cinematic hero with overlay gradients
- Animated counting stats
- Service cards with hover reveal effect
- Scroll-triggered reveal animations throughout
- FAQ accordion
- Working contact/booking form (shows success state)
- Google Maps embed
- Fully responsive mobile-first design
- Premium SEO meta tags
