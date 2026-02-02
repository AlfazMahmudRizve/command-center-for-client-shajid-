# Sheriff's Command Center 🤠

> A high-performance, aesthetically pleasing browser start page for the modern productivity sheriff.

![Sheriff's Command Center](public/icon128.png)

Designed and built by **[Alfaz Mahmud Rizve](https://whoisalfaz.me)**.

## 🚀 Overview

**Sheriff's Command Center** replaces your boring "New Tab" page with a powerful, comprehensive dashboard. Built with a "Glassmorphism" design philosophy, it combines productivity widgets, instant keyboard-driven search, and your most critical links into a single, beautiful view.

It is designed to be **fast**, **private** (runs entirely in your browser), and **beautiful**.

## ✨ Key Features

*   **⚡ Instant Performance**: Built with Next.js 14 and static export for zero-latency loading.
*   **🎹 Command Center (Cmd+K)**: Keyboard-first navigation. Type `/gh` for GitHub, `/yt` for YouTube, or just search Google.
*   **🍱 Bento Grid Layout**: A dynamic, responsive grid that organizes your digital life into logical "Boxes".
*   **🎨 Glassmorphism UI**: Deep charcoal backgrounds, subtle gradients, and blur effects for a premium feel.
*   **🔒 Privacy Focused**: Your Todo tasks are stored locally in your browser. No external databases.
*   **🧩 Chrome Extension**: Runs natively as a local Chrome Extension.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Language**: TypeScript

## 📦 Installation

### As a Chrome Extension (Recommended)

1.  Clone this repository or download the source.
2.  Install dependencies: `npm install`
3.  Build the project: `npm run build`
    *   *Note: This runs a custom script to patch Next.js output for Chrome.*
4.  Open Chrome and go to `chrome://extensions`.
5.  Enable **Developer mode** (top right).
6.  Click **Load unpacked**.
7.  Select the `out` directory inside the project folder.

### Local Development

```bash
npm run dev
# Open http://localhost:3000
```

## 🔧 Configuration

Customize your links, name, and search shortcuts in `config/site-config.ts`.

```typescript
export const siteConfig = {
  user: {
    name: "Sheriff", // Your name here
    // ...
  },
  // ...
}
```

## 👨‍💻 Author

**Alfaz Mahmud Rizve**
*   🌐 Website: [whoisalfaz.me](https://whoisalfaz.me)
*   🐙 GitHub: [@AlfazMahmudRizve](https://github.com/AlfazMahmudRizve)

---

*Built with ❤️ in Next.js*
