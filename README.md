# Bolaji Funmilola | Portfolio

A personal portfolio website for Bolaji Funmilola, a frontend developer and technical writer based in Ibadan, Nigeria. It is built with plain HTML, CSS and JavaScript, with no frameworks or build step, and has a soft, feminine design with blush, lilac and plum colours.

**Live site:** https://funmilola.vercel.app

## Features

- **Responsive layout** that works on phones, tablets and desktops
- **Mobile menu** built with a CSS checkbox, so it works even if JavaScript fails to load
- **Sections** for hero, services, projects, published articles, experience, skills, education, certificates and contact
- **Project cards** with "View on GitHub" and "View live" buttons
- **Animations:** page-load curtain, word-by-word headline reveal, floating shapes, scroll reveal, count-up stats, 3D card tilt and a cursor sparkle trail
- **Scroll progress bar** and a nav that highlights the current section
- **Accessible by default:** semantic HTML, keyboard focus styles, alt text, and all motion switched off for visitors who prefer reduced motion

## Tech stack

| Area      | Tools                                                            |
| --------- | ---------------------------------------------------------------- |
| Markup    | HTML5                                                            |
| Styling   | CSS3 (custom properties, Grid, Flexbox, keyframe animations)     |
| Behaviour | Vanilla JavaScript (IntersectionObserver, requestAnimationFrame) |
| Fonts     | Fraunces and Figtree from Google Fonts                           |

## Project structure

```
portfolio/
├── index.html        # All page content
├── css/
│   └── style.css     # Design, layout and animations
├── js/
│   └── jscript.js    # Scroll reveal, stats counter, progress bar and effects
├── images/
│   └── photo.jpg     # Profile photo (3:4 portrait)
└── README.md
```

## Run it locally

1. Clone the repository:
   ```bash
   git clone https://github.com/f-lajoc/<your-repo-name>.git
   cd <your-repo-name>
   ```
2. Open `index.html` in your browser. No install or build step is needed.

For auto-reload while editing, use the Live Server extension in VS Code.

## Deploy to GitHub Pages

1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. Your site goes live at `https://<username>.github.io/<repo-name>/` after a minute or two.

It also deploys without changes to Netlify or Vercel.

## Customise it

| To change                   | Where                                                     |
| --------------------------- | --------------------------------------------------------- |
| Name, headline, bio         | `index.html`, hero section                                |
| Stats (3+, 5+, 15+)         | `index.html`, `.stats` (the counter reads these numbers)  |
| Projects                    | `index.html`, `<section id="work">`, copy a `.card` block |
| Articles                    | `index.html`, "Things I've published"                     |
| Experience and certificates | `index.html`, `#experience` and `#skills`                 |
| Colours                     | `css/style.css`, the `:root` variables at the top         |
| Photo                       | Replace `images/photo.jpg` (3:4 portrait works best)      |

### Turning off effects

Each effect is a separate block in `js/jscript.js` and can be deleted without affecting the rest of the site:

- **Cursor sparkle trail:** the "Cursor sparkle trail" block
- **Floating shapes:** the "Floating blobs" block
- **Card tilt:** the "3D tilt" block
- **Intro curtain:** delete `<div class="curtain">…</div>` from `index.html`

## Browser support

Works in current versions of Chrome, Edge, Firefox and Safari, on desktop and mobile.

## Author

**Bolaji Funmilola**

- GitHub: [@f-lajoc](https://github.com/f-lajoc)
- Medium: [@lajoc\_](https://medium.com/@lajoc_)
- LinkedIn: [bolajifunmilola](https://www.linkedin.com/in/bolajifunmilola)
- Email: bolajifisayo80@gmail.com
