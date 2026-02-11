# Neural Archive 🧠✨

> A premium scrollytelling thought-vault exploring the architecture of consciousness.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square)

## 🌟 Overview

Neural Archive is an interactive scroll-based experience that visualizes thoughts through animated "mind-blooms" - frame-by-frame canvas animations that evolve as you scroll. Capture your thoughts at the peak of inspiration with our elegant thought-capture system.

### ✨ Key Features

- 🎬 **192-Frame Canvas Animation** - Smooth scroll-driven brain visualization
- 💭 **Thought Capture System** - Save insights at the moment of inspiration
- ♿ **Fully Accessible** - WCAG compliant with screen reader support
- 🎨 **Dark Elegance** - Premium gold & obsidian color scheme
- 📱 **Responsive Design** - Optimized for all devices
- ⚡ **Performance First** - Optimized image preloading & GPU acceleration

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📖 Table of Contents

- [Features](#-key-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Architecture](#-architecture)
- [Contributing](#-contributing)

## 💻 Installation

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Setup

1. **Clone the repository**

   ```bash
   git clone [your-repo-url]
   cd neural-archive
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🎯 Usage

### Scrolling Experience

1. **Scroll down** to watch the neural bloom animation evolve
2. **Continue scrolling** until you reach ~90% of the page
3. **Click "Thought?"** button to capture your insights
4. **Type your thought** and click "Preserve" to save

### Adding New Thought Categories

1. Add frames to `public/images/blooms/[color]/`
2. Update `data/thoughts.ts`:
   ```typescript
   {
     id: "neuroscience",
     title: "Neural Pathways",
     folderPath: "/images/blooms/blue",
     frameCount: 192,
     themeColor: "#0EA5E9",
     // ... other properties
   }
   ```

## 📁 Project Structure

```
neural-archive/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── MindBloomScroll.tsx
│   ├── NeuralNav.tsx
│   ├── ScrollProgress.tsx
│   └── ThoughtInteraction.tsx
├── data/                  # Static data
│   └── thoughts.ts
├── types/                 # TypeScript types
├── lib/                   # Utilities
├── hooks/                 # Custom hooks
├── public/images/blooms/  # Animation frames
└── design-system/         # Design documentation
```

For detailed architecture, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## 🎨 Design System

The project follows a comprehensive design system with:

- **Colors**: Electric Gold (#FFD700) on Deep Obsidian (#050a14)
- **Typography**: Space Grotesk (300-700 weights)
- **Animation**: 150-300ms transitions, scroll-driven
- **Accessibility**: WCAG AA compliant

Full design guidelines: [`design-system/neural-archive/MASTER.md`](./design-system/neural-archive/MASTER.md)

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion 12
- **Icons**: Lucide React

### Core Components

| Component            | Purpose                                 |
| -------------------- | --------------------------------------- |
| `MindBloomScroll`    | Canvas-based frame animation controller |
| `NeuralNav`          | Fixed navigation header                 |
| `ScrollProgress`     | Visual scroll indicator                 |
| `ThoughtInteraction` | Modal for thought capture               |

### Custom Hooks

| Hook                | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `useImagePreloader` | Preload animation frames with progress     |
| `useReducedMotion`  | Detect motion preference for accessibility |

### Utilities

| Function               | Purpose                  |
| ---------------------- | ------------------------ |
| `cn()`                 | Merge Tailwind classes   |
| `generateFramePaths()` | Create frame path arrays |
| `preloadImages()`      | Async image loading      |
| `debounce()`           | Performance optimization |

## ♿ Accessibility

- ✅ Full keyboard navigation
- ✅ ARIA labels on all interactive elements
- ✅ Screen reader support
- ✅ Focus management
- ✅ Respects `prefers-reduced-motion`
- ✅ Semantic HTML
- ✅ Color contrast WCAG AA

## 🚀 Performance

- **Image Preloading**: Progressive loading with percentage indicator
- **Canvas Rendering**: Hardware-accelerated 2D context
- **Debounced Handlers**: Optimized resize and scroll events
- **GPU Acceleration**: Framer Motion transforms
- **Efficient Cleanup**: Prevents memory leaks

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Code Style

- Use TypeScript for all new files
- Follow existing component patterns
- Add accessibility features
- Update documentation
- Respect the design system

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📚 Resources

- [Architecture Documentation](./ARCHITECTURE.md)
- [Design System](./design-system/neural-archive/MASTER.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)

## 📄 License

[Add your license here]

## 🙏 Acknowledgments

- Animations powered by Framer Motion
- Icons from Lucide React
- Built with Next.js & Tailwind CSS

---

**Built with 🧠 and ✨**
