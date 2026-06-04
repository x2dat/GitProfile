# GitProfile Studio 🎨

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-glass&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-glass&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-glass&logo=vite)](https://vite.dev/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-glass)](LICENSE)

**GitProfile Studio** is an interactive, visual drag-and-drop builder designed to craft stunning GitHub Profile READMEs and web portfolios in real-time. Built with dynamic CSS themes (Dracula, Nord, Cyberpunk, Glass-Dark) and a side-by-side Live GFM Renderer, it gives developers a visual canvas to edit header animations, check-grid tech stacks, statistics cards, and social links instantly. <br> <hr>
Check it out: <a href="https://x2dat.github.io/GitProfile/" target="_blank" rel="noopener noreferrer">https://x2dat.github.io/GitProfile/</a>

<!-- Generated with GitProfile Studio -->
<p align="center">
  <a href="https://x2dat.github.io/GitProfile/">
    <img src="https://img.shields.io/badge/Generated%20with-GitProfile%20Studio-blue?style=flat-square" alt="GitProfile Studio" />
  </a>
</p>

---

## Key Features 🚀

*   🗂️ **Interactive Canvas**: Add, remove, toggle, and re-order markdown widgets visually using timeline cards.
*   🎨 **Premium Themes**: Instantly switch the editor interface between **Glassmorphism**, **Dracula**, **Nord**, and **Cyberpunk** themes.
*   🖋️ **Typing Animations**: Easily configure dynamic typing effects with customizable lines of text using pre-built Shields API templates.
*   🛠️ **Brand Icon Stack Grid**: Check frameworks, languages, databases, or cloud tools from a visual checklist to compile badges or skill layouts with official brand colors.
*   📊 **GitHub Stats Card Configs**: Customize stats, streak trackers, and language cards using your username and selected color schemes.
*   🔗 **Social Badges**: Configure links to LinkedIn, Twitter, YouTube, and portfolios using customized Shields styles (flat, flat-square, plastic).
*   🗒️ **Custom GFM Editor**: A raw Markdown section to write unique custom additions.
*   📝 **Real-time Live Preview**: View how your profile looks in a rendered HTML page or copy the GFM source code directly with one click.

---

## Tech Stack 🛠

*   **Framework**: React 19 + TypeScript 6
*   **Build Tool**: Vite 8
*   **Styling**: Vanilla CSS (CSS variables, backdrop filter blurs, flexboxes, responsive CSS grids)
*   **Icons**: Lucide React

---

## Getting Started ⚙️

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/your-username/gitprofile-studio.git
cd gitprofile-studio

# Install dependencies
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 3. Compile for Production
```bash
npm run build
```
Upload the compiled `dist/` directory files directly to GitHub Pages, Netlify, or Vercel.

---

## Under the Hood 🧠

*   **Bi-Directional State Tracking**: Dynamic configurations are tracked via state nodes. The GFM Markdown string compiler filters enabled cards in real-time, compiles badge query parameters, encodes URLs, and maps layouts.
*   **Safe Client-Side HTML Renderer**: To prevent HTML vulnerabilities and dependencies, a lightweight parser splits the GFM markdown stream, isolates block alignments, resolves custom anchors, and matches HTML header hierarchies natively.
*   **Persistent Configuration**: Widget templates and style choices are synchronized with `localStorage` so designs are retained on page refresh.

---

## License 📄
This project is licensed under the MIT License - see the LICENSE file for details.
