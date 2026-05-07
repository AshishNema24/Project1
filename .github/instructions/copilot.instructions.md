---
description: Describe when these instructions should be loaded by the agent based on task context
applyTo: '**/*'
---

Project overview:
- This is a small static frontend website built with plain HTML, CSS, and JavaScript.
- The project contains a main page (`index.html`), a secondary page (`Hello.html`), global styling in `styles.css`, and client-side script logic in `app.js`.
- There is no framework, bundler, package manager, or runtime environment setup; the app should run directly in a browser.

Architecture details:
- Presentation layer: HTML pages define structure and content for the site.
- Styling layer: `styles.css` provides visual layout and styling rules.
- Behavior layer: `app.js` holds interactive front-end logic and page scripting.
- Navigation: The website is likely simple page-to-page navigation rather than a client-side routed application.
- Deployment model: Static hosting is expected, with files served as plain static assets.

Current workspace files:
- `app.js`
- `index.html`
- `Hello.html`
- `styles.css`
- `.github/instructions/copilot.instructions.md`
- `AGENTS.md` (empty)

Guidelines for AI assistance:
- Treat this project as a plain HTML/CSS/JavaScript website.
- Prefer vanilla JavaScript and simple markup/styles.
- Do not introduce frameworks, build tools, package managers, or external dependencies unless explicitly requested.
- Keep changes minimal and focused on the user’s request.
- Preserve existing file structure and naming conventions.
- If modifying behavior, update only the relevant files and avoid unrelated refactors.
- Explain edits clearly and concisely, referencing the current file names.
- When reviewing or suggesting code, use the existing project context and keep solutions lightweight.
