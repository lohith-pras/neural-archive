# Neural Archive - Architecture Documentation

> A premium scrollytelling thought-vault exploring the architecture of consciousness.

## 📐 Project Overview

Neural Archive is an interactive web experience that combines scroll-based animation with thought capture functionality. The project uses frame-by-frame canvas rendering to create a "mind-bloom" effect as users scroll through different thought categories.

## 🏗️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion 12
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
neural-archive/
├── app/                      # Next.js App Router
│   ├── globals.css          # Global styles & CSS variables
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
│
├── components/              # React components
│   ├── MindBloomScroll.tsx # Canvas-based frame animation
│   ├── NeuralNav.tsx       # Navigation header
│   ├── ScrollProgress.tsx  # Scroll progress indicator
│   └── ThoughtInteraction.tsx # Thought capture modal
│
├── data/                    # Static data
│   └── thoughts.ts         # Thought categories configuration
│
├── types/                   # TypeScript type definitions
│   └── thoughts.ts         # ThoughtCategory, SavedThought types
│
├── lib/                     # Utility functions
│   └── utils.ts            # Helper functions (cn, preload, debounce)
│
├── hooks/                   # Custom React hooks
│   ├── useImagePreloader.ts # Image preloading with progress
│   └── useReducedMotion.ts # Accessibility: motion preference
│
├── public/                  # Static assets
│   └── images/
│       └── blooms/
│           └── gold/        # 192 animation frames (001-192.jpg)
│
└── design-system/           # Design system documentation
    └── neural-archive/
        ├── MASTER.md       # Global design rules
        └── pages/          # Page-specific overrides
```

## 🎨 Design System

The project follows a comprehensive design system located in `design-system/neural-archive/MASTER.md`.

### Key Design Decisions

**Color Palette:**

- Primary: `#FFD700` (Electric Gold)
- Dim Gold: `#B8860B`
- Background: `#050a14` (Deep obsidian)
- Foreground: `#ededed`

**Typography:**

- Primary: Space Grotesk (300-700)
- System Fallback: Arial, Helvetica, sans-serif

**Animation Principles:**

- Smooth transitions: 150-300ms
- Respects `prefers-reduced-motion`
- GPU-accelerated canvas rendering
- Debounced resize handlers

**Accessibility:**

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus states with visible outlines
- Screen reader friendly
- Proper semantic HTML

## 🔧 Core Features

### 1. Mind-Bloom Animation

**Component**: `MindBloomScroll.tsx`

- **Frame Count**: 192 frames per thought category
- **Trigger**: Scroll-based (0-100% scroll → frame 1-192)
- **Canvas Rendering**: Maintains aspect ratio with object-fit cover
- **Preloading**: Progressive with percentage indicator
- **Performance**: Debounced resize, efficient render loop

**Technical Details:**

```typescript
// Scroll to frame mapping
const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

// Canvas rendering maintains aspect ratio
const canvasRatio = canvas.width / canvas.height;
const imgRatio = img.width / img.height;
```

### 2. Thought Capture System

**Component**: `ThoughtInteraction.tsx`

- **Trigger**: Appears at 85-100% scroll
- **Storage**: LocalStorage (`captured_thoughts` key)
- **Data Structure**:
  ```typescript
  {
    id: number; // Timestamp
    text: string; // User input
    timestamp: string; // ISO format
  }
  ```

### 3. Image Preloading

**Hook**: `useImagePreloader.ts`

- **Progressive Loading**: Tracks individual frame loading
- **Progress Reporting**: Returns percentage (0-100)
- **Error Handling**: Continues if individual frames fail
- **Cleanup**: Cancels loading on unmount

## 🎯 Key Files Explained

### `lib/utils.ts`

Utility functions for common operations:

- `cn()` - Merge Tailwind classes with proper precedence
- `generateFramePaths()` - Create frame path arrays
- `preloadImages()` - Async image preloading
- `debounce()` - Performance optimization
- `prefersReducedMotion()` - Accessibility check

### `types/thoughts.ts`

Type definitions for the thought system:

- `ThoughtCategory` - Main thought data structure
- `ThoughtStat` - Statistical metadata
- `ContentSection` - Content blocks
- `SavedThought` - User-captured thoughts

### `data/thoughts.ts`

Configuration for thought categories. Currently contains:

- **Philosophy** category with gold color scheme
- 192 animation frames
- Metadata: Depth 9/10, Daily frequency, Abstract type

## 🚀 Performance Optimizations

1. **Image Preloading**: All frames loaded before animation starts
2. **Canvas Rendering**: Hardware-accelerated 2D context
3. **Debounced Resize**: 100ms debounce on window resize
4. **Framer Motion**: GPU-accelerated transforms
5. **Progressive Loading**: Percentage-based feedback
6. **Cleanup**: Proper unmount handlers prevent memory leaks

## ♿ Accessibility Features

- ✅ ARIA labels on all interactive elements
- ✅ `role` attributes for semantic meaning
- ✅ Keyboard navigation support
- ✅ Focus states with visible outlines
- ✅ Screen reader announcements (`aria-live`, `sr-only`)
- ✅ `prefers-reduced-motion` support
- ✅ Proper heading hierarchy
- ✅ Alt text for visual elements
- ✅ Dialog modal with `aria-modal`

## 🎨 Styling Architecture

### CSS Variables

Defined in `app/globals.css`:

```css
:root {
  --background: #050a14;
  --foreground: #ededed;
  --gold: #ffd700;
  --gold-dim: #b8860b;
}
```

### Tailwind Configuration

- **Version**: Tailwind CSS v4
- **Theme**: Inline theme with CSS variables
- **Custom Colors**: `gold`, `gold-dim`, `background`, `foreground`
- **Fonts**: Space Grotesk with variable font support

## 🔄 Data Flow

```
User Scroll
    ↓
ScrollProgress (Framer Motion)
    ↓
frameIndex calculation
    ↓
Canvas render (useMotionValueEvent)
    ↓
Visual feedback

User Interaction (Thought Capture)
    ↓
Modal opens (AnimatePresence)
    ↓
User input
    ↓
LocalStorage save
    ↓
Modal closes with confirmation
```

## 📝 Adding New Thought Categories

1. **Add frames** to `public/images/blooms/[color]/`
2. **Update** `data/thoughts.ts`:
   ```typescript
   {
     id: "new-category",
     title: "New Category",
     folderPath: "/images/blooms/[color]",
     frameCount: 192,
     themeColor: "#YOUR_COLOR",
     // ... other fields
   }
   ```
3. **Test** scroll behavior and loading
4. **(Optional)** Create page-specific design override in `design-system/neural-archive/pages/`

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🎯 Future Enhancements

### Planned Features

- [ ] Multi-category navigation
- [ ] Thought gallery/archive viewer
- [ ] Export thoughts as JSON/Markdown
- [ ] Share thought links
- [ ] WebGL particle effects
- [ ] Audio integration
- [ ] Mobile-optimized controls
- [ ] Progressive Web App (PWA)

### Performance Improvements

- [ ] Lazy load frames (load on demand)
- [ ] WebP/AVIF format support
- [ ] Virtual scrolling for long archives
- [ ] Service Worker caching
- [ ] Image compression pipeline

### Accessibility Enhancements

- [ ] Keyboard shortcuts guide
- [ ] Skip links for navigation
- [ ] High contrast mode
- [ ] Font size controls
- [ ] Voice navigation support

## 📚 Resources

- [Design System](./design-system/neural-archive/MASTER.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion API](https://www.framer.com/motion/)
- [Tailwind CSS v4](https://tailwindcss.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🤝 Contributing

When adding new features:

1. Follow the established folder structure
2. Use TypeScript for type safety
3. Add accessibility features (ARIA, keyboard support)
4. Update this documentation
5. Test on multiple devices/browsers
6. Respect the design system

## 📄 License

[Add your license here]

---

**Last Updated**: February 11, 2026
**Version**: 0.1.0
