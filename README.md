# Lajoc_devs — Portfolio

A personal portfolio for a frontend developer and technical writer based in Ibadan, Nigeria. It showcases projects, published articles, work experience, skills and certifications in a warm, mobile-first single-page layout.

**Live site:** https://funmilola.vercel.app

## Features

- Intro "curtain" animation on first visit (skipped for the rest of the session)
- Word-by-word headline reveal, floating hero blobs and a scroll progress bar
- Scroll-triggered reveal animations and active-section highlighting in the nav
- Count-up stats in the hero section
- 3D tilt and shine effect on project cards, plus a cursor sparkle trail (mouse devices only)
- Responsive layout with a collapsible mobile menu
- Respects `prefers-reduced-motion` (animations are switched off)
- Project cards with "View on GitHub" and "View live" links
- Published articles section (Medium)
- Experience timeline, skills grid, education and certificates
- Contact section with email, GitHub, Medium and LinkedIn links

## Tech stack

- HTML5
- CSS3 (custom properties, flexbox, grid, media queries)
- Vanilla JavaScript (no frameworks or build step)
- Google Fonts: Fraunces and Figtree

## Project structure

```
Portfolio/
├── index.html            # Main page
├── css/
│   └── style.css         # All styles
├── js/
│   └── jscript.js        # Menu, scroll reveal, counters, headline split, effects
└── images/
    └── photo.jpg         # Portrait shown in the hero section
```

## Getting started

No installation is needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/f-lajoc/Portfolio.git
   cd Portfolio
   ```
2. Open `index.html` in your browser, or serve the folder locally:
   ```bash
   npx serve .
   ```

## Customising

- **Photo:** replace `images/photo.jpg` with your own image (same file name). If the image is missing, the initials placeholder is shown instead.
- **Intro curtain text:** edit the `<span>` inside the `.curtain` element near the top of `index.html`.
- **Stats:** edit the numbers inside the `.stat b` elements in the hero (for example `3+`). The script reads the number and suffix from the text and counts up to it.
- **Projects and articles:** copy an existing `<article class="card">` block in the `#work` section and update the content and links.
- **Colours and fonts:** adjust the CSS custom properties at the top of `css/style.css`.

## Deployment

The site is static, so it can be hosted anywhere. It is currently deployed on Vercel: import the repository, leave the build command empty and set the output directory to the project root.

## Connect

- GitHub: https://github.com/f-lajoc
- Medium: https://medium.com/@lajoc_
- LinkedIn: https://www.linkedin.com/in/funmilola-b-b4044b13b
