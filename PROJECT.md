# Sachin Raut — Freelance Web Developer & QA Specialist
## Project Documentation

**Owner:** Sachin Raut  
**Email:** sachinraut0310@gmail.com  
**Website:** sachinraut.in  
**Location:** Mumbai, Maharashtra, India  
**Built with:** HTML5 · CSS3 · Vanilla JavaScript  

---

## 📁 Project File Structure

```
getdeveloper/
│
├── index.html                        ← Main landing page (homepage)
├── web-development.html              ← Web Development service page
├── seo.html                          ← Technical SEO service page
├── qa-testing.html                   ← QA Testing service page
├── thank-you.html                    ← Form submission success page
├── privacy-policy.html               ← Privacy Policy page
├── terms-and-conditions.html         ← Terms & Conditions page
│
├── navbar.js                         ← Shared navbar injected on all subpages
│
├── sachin-raut-logo.svg              ← Full logo (SR badge + name + tagline)
├── favicon.svg                       ← Browser tab icon (SR badge only)
│
├── SETUP-GUIDE.md                    ← EmailJS + Google Sheet setup guide
└── PROJECT.md                        ← This file
```

---

## 🌐 Pages Overview

### 1. `index.html` — Main Landing Page
The primary lead generation page. Single-file HTML/CSS/JS.

**Sections (top to bottom):**
| # | Section | ID | Purpose |
|---|---|---|---|
| 1 | Navbar | — | Sticky, blur on scroll, hamburger on mobile |
| 2 | Hero | — | Headline, typed text, trust counters, lead form (right side) |
| 3 | Marquee | — | Infinite scrolling services ticker |
| 4 | Services | `#services` | 5 service cards with glassmorphism |
| 5 | Web Development | `#webdev` | Deep-dive: process steps + delivery snapshot card |
| 6 | Technical SEO | `#seo` | Deep-dive: audit report visual + 6 steps |
| 7 | QA Testing | `#qa` | Deep-dive: 4 steps + sample bug report card |
| 8 | Tech Stack | `#tech` | 13 technology cards with zoom-in animation |
| 9 | Process | `#process` | 4-step timeline (Discovery → Launch) |
| 10 | Testimonials | `#testimonials` | 3 client review cards (incl. Sachin Raut) |
| 11 | Portfolio | `#work` | 3 project case study cards with metrics |
| 12 | FAQ | `#faq` | 7 accordion questions |
| 13 | Contact Form | `#contact` | Full lead form with smart checkboxes |
| 14 | Footer | — | Logo, links, copyright |
| 15 | Sticky Buttons | — | WhatsApp · Call (mobile only) · Email |

---

### 2. `thank-you.html` — Submission Success Page
Shown after form is submitted successfully.

**Features:**
- Animated SVG checkmark (draws on load)
- "Submission Received" badge
- 3 info cards (email, 24hr response, free audit)
- Back to Home + View Portfolio buttons
- 8-second auto-redirect countdown bar → returns to `index.html`
- Particle background, same dark theme

---

### 3. `privacy-policy.html` — Privacy Policy
Full privacy policy page.

**Sections:** Overview, Information Collected, How We Use It, Cookies, Information Sharing, Data Security  
**Contact:** sachinraut0310@gmail.com

---

### 4. `terms-and-conditions.html` — Terms & Conditions
Full T&C page.

**Sections:** Overview, Services, User Responsibilities, Intellectual Property, Limitation of Liability, Payment Terms, Changes to Terms  
**Contact:** sachinraut0310@gmail.com

---

### 5. `web-development.html` — Web Development Service Page
Dedicated service page for Website Development.

**Sections:** Hero (stats: 95+ PageSpeed, 4 wks, 100% ownership, 15+ sites), 5-step process, perks grid, tech stack (12 cards), CTA  
**Theme accent:** Purple gradient (`#7c3aed → #a855f7 → #06b6d4`)

---

### 6. `seo.html` — Technical SEO Service Page
Dedicated service page for Technical SEO.

**Sections:** Hero (stats: +180% traffic, 50+ keywords, 100 CWV, 48h delivery), 6-step process, live audit report visual card (bars, score, issues), CTA  
**Theme accent:** Yellow gradient (`#f59e0b → #fbbf24`)

---

### 7. `qa-testing.html` — QA Testing Service Page
Dedicated service page for Manual QA Testing.

**Sections:** Hero (stats: 47+ test cases, 48h delivery, 5+ browsers, 0 bugs), 4-step process, sample bug report card, 6 "What's Included" cards, CTA  
**Theme accent:** Green gradient (`#10b981 → #06b6d4`)

---

## 🧩 Shared Components

### `navbar.js` — Universal Navbar
A self-contained IIFE that injects the full navbar (CSS + HTML + JS) into every subpage. Keeps the header consistent across all pages without duplicating code.

**How it works:**
- Detects current page via `window.location.pathname`
- On homepage (`index.html`): navbar starts transparent, gets backdrop blur on scroll
- On all subpages: navbar is always solid (`.scrolled` class applied immediately)
- Injects: mobile menu overlay, nav links, theme toggle button, "Get Free Audit" CTA
- Active link detection: highlights the current page's nav link
- Theme functions exposed globally: `window.toggleTheme`, `window.applyTheme`, `window.toggleMenu`

**To add a new page:** just add `<script src="navbar.js"></script>` as the first element inside `<body>`.

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#06060f` (deep navy-black) |
| Surface | `rgba(255,255,255,0.04)` (glassmorphism) |
| Primary Gradient | `#7c3aed → #a855f7 → #06b6d4` (purple → cyan) |
| Text | `#f1f5f9` |
| Muted Text | `#94a3b8` |
| Border | `rgba(255,255,255,0.08)` |
| Green (QA) | `#10b981` |
| Yellow (SEO) | `#f59e0b` |
| Border Radius | `16px` cards, `99px` buttons/badges |

**Fonts:**
- Headings: `Space Grotesk` (700, 800)
- Body: `Inter` (400, 500, 600, 700)

**Libraries (CDN, no install needed):**
- `AOS.js` v2.3.4 — scroll animations (used on all service pages)
- `Typed.js` v2.1.0 — hero typing effect (index.html only)
- `EmailJS` v4 — form email delivery (index.html only)

**Particle System:**
All pages share the same animated particle background — floating dots with connecting lines, fully theme-aware (dark/light). Canvas element (`id="bg-canvas"`) must be placed **before** the `<script>` tag that initializes it, or `getElementById` returns null and particles won't render.

---

## 📋 Forms

Two forms on `index.html` — both send data to EmailJS + Google Sheets:

| Form | ID | Location |
|---|---|---|
| Hero Form | `heroForm` | Right side of Hero section |
| Contact Form | `contactForm` | Bottom Contact section |

**Fields:** Name · Phone · Email · Service (checkboxes) · Website URL (conditional) · Message

**Smart Checkbox Logic:**
- ☐ New Website
- ☐ SEO Audit Report
- ☐ QA Testing & Bug Report
- → If SEO or QA is checked: "Your Website URL" field slides in automatically

**On Submit:** Button shows "✅ Redirecting..." → redirects to `thank-you.html`

---

## ⚙️ Form Integration Setup

> Full step-by-step guide in `SETUP-GUIDE.md`

Edit the `CONFIG` object in `index.html` (near top of `<script>` block):

```javascript
const CONFIG = {
  EMAILJS_PUBLIC_KEY:  'YOUR_PUBLIC_KEY',
  EMAILJS_SERVICE_ID:  'YOUR_SERVICE_ID',
  EMAILJS_TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
  GOOGLE_SHEET_URL:    'YOUR_GOOGLE_APPS_SCRIPT_URL'
};
```

**EmailJS:** Free — 200 emails/month → https://www.emailjs.com  
**Google Sheets:** Free, unlimited rows via Apps Script web app

---

## 📱 Responsive Breakpoints

| Breakpoint | Target Devices |
|---|---|
| `1200px` | Large tablets, small laptops |
| `1024px` | Tablet landscape |
| `768px` | Tablet portrait, large phones |
| `480px` | Standard phones |
| `375px` | Small phones (iPhone SE etc.) |

---

## 🔘 Sticky Floating Buttons (Right Side)

| Button | Color | Visibility |
|---|---|---|
| WhatsApp | Green `#25d366` | All devices |
| Call | Purple gradient | Mobile only (`≤768px`) |
| Email | Cyan gradient | All devices |

**To update phone number:** Search `+919876543210` in `index.html` and replace with your actual number (appears in WhatsApp link and Call link).

---

## 🖼️ Logo & Favicon

| File | Size | Use |
|---|---|---|
| `sachin-raut-logo.svg` | Full (420×110) | Navbar, footer, all pages |
| `favicon.svg` | Square (100×100) | Browser tab icon |

Both are SVG — infinitely scalable, no quality loss at any size.

---

## ✅ Deployment Checklist

Before going live:

- [ ] Replace `+919876543210` with your actual phone number (WhatsApp + Call links)
- [ ] Fill in `CONFIG` object with EmailJS keys and Google Sheet URL (see `SETUP-GUIDE.md`)
- [ ] Test both forms — check email notification + Google Sheet row
- [ ] Upload all files to your hosting (Hostinger / Vercel / Netlify etc.)
- [ ] Point domain `sachinraut.in` to your hosting
- [ ] Test all pages: index, web-development, seo, qa-testing, thank-you, privacy-policy, terms-and-conditions
- [ ] Test on mobile — sticky buttons, responsive layout, hamburger menu
- [ ] Submit sitemap to Google Search Console

---

## 📞 Contact

**Sachin Raut**  
Email: sachinraut0310@gmail.com  
Website: sachinraut.in  
Location: Mumbai, Maharashtra, India

---

---

## 📝 Changelog

### Session — April 2026
- Added 3 dedicated service pages: `web-development.html`, `seo.html`, `qa-testing.html`
- Created `navbar.js` — shared navbar injected via JS on all subpages (single source of truth)
- Fixed navbar `position: sticky` → `position: fixed` bug (header was rendering lower on subpages)
- Added `margin-top: 72px` to `.page-hero` on subpages to compensate for fixed navbar
- Added particle background (`#bg-canvas`) to all pages — dark & light theme aware
- Fixed light theme particle visibility (opacity `0.15` → `0.65`, alpha multiplier `0.45` → `0.85`)
- Fixed broken JS syntax (`);` orphan lines) across all subpages — `AOS.init()` was never running, causing all `data-aos` content to stay invisible
- Fixed canvas placement bug on web-development, seo, qa-testing pages — canvas was placed after `<script>` tag, causing `getElementById('bg-canvas')` to return null
- Fixed broken CSS fragment in `thank-you.html` (`translateX(-50%)` leftover from removed animation)
- Rebuilt `privacy-policy.html` and `terms-and-conditions.html` with full particle system and navbar.js

---

*© 2026 Sachin Raut. All rights reserved.*
