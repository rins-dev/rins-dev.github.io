# AGENTS.md

## Project Overview
Minimal GitHub Pages site (`rins-dev.github.io`) — a bilingual (Chinese/English) static blog built with plain HTML, CSS, and JavaScript. No frameworks, no build tools.

## Structure
```
/
├── index.html              — homepage
├── blog/index.html         — blog listing
├── about/index.html        — about page
├── contact/index.html      — contact page
├── posts/hello-world/      — sample blog post
│   └── index.html
├── assets/
│   ├── css/style.css       — global styles
│   └── js/main.js          — language toggle + shared logic
├── README.md
└── AGENTS.md
```

## Build / Lint / Test
- **No build system** — GitHub Pages serves static files directly.
- **No linting or testing** configured.
- To preview: push to `main` and visit `https://rins-dev.github.io`.

## Code Style Guidelines

### HTML
- Use semantic elements (`<header>`, `<main>`, `<footer>`, `<article>`, `<nav>`).
- Include `data-zh` and `data-en` attributes on all user-facing text for language toggle.
- Indent with 2 spaces.
- Always include `lang` attribute on `<html>`.

### CSS
- Use CSS custom properties (variables) in `:root` for theming.
- Naming: kebab-case for classes (e.g., `.post-card`, `.site-header`).
- Mobile-first responsive design; breakpoint at `600px`.
- Max content width: `720px` via `--max-w`.
- No CSS frameworks — write vanilla CSS only.

### JavaScript
- Vanilla JS only, no libraries.
- Minimal footprint — currently only handles language toggle.
- Use `let`/`const`, no `var`.
- No semicolons unless needed for disambiguation.

### Naming
- Directories: lowercase kebab-case (`posts/hello-world/`).
- Files: `index.html` inside each directory for clean URLs.
- CSS classes: kebab-case, BEM-inspired (`.block-element`).

### General
- No trailing whitespace.
- End every file with a single newline.
- Commit messages: imperative mood, concise (e.g., "add hello world post").

## Adding a New Post
1. Create `posts/<slug>/index.html` (copy an existing post as template).
2. Add `data-zh` / `data-en` attributes to all text.
3. Add a link in `blog/index.html` and `index.html`.

## Agent Instructions
- Do not introduce build tools, frameworks, or package managers unless explicitly requested.
- Keep the site lightweight and dependency-free.
- No `.cursorrules`, `.cursor/rules/`, or `.github/copilot-instructions.md` exist.
