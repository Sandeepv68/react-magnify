![reactmagnifier-logo](https://i.ibb.co/ZWKGhTm/logo.png)

<div align="center">

[![npm version](https://img.shields.io/npm/v/@sandeepv68/react-magnifier?style=flat-square&logo=npm&logoColor=white&label=version)](https://www.npmjs.com/package/@sandeepv68/react-magnifier)
[![npm downloads](https://img.shields.io/npm/dm/@sandeepv68/react-magnifier?style=flat-square&logo=npm&logoColor=white&label=downloads&color=%2324852F)](https://www.npmjs.com/package/@sandeepv68/react-magnifier)
[![license](https://img.shields.io/npm/l/@sandeepv68/react-magnifier?style=flat-square&color=%234a90e2)](LICENSE)
[![bundle size](https://img.shields.io/bundlejs/size/@sandeepv68/react-magnifier?style=flat-square&label=bundle%20size&color=%23ff6b35)](https://bundlephobia.com/package/@sandeepv68/react-magnifier)

<img src="example/badge.png" alt="react-magnifier-badge" width="200"/>

</div>

# ReactMagnifier v1.2.0

A modern, accessible React 19 component for image magnification with TypeScript support, built with Vite and tested with Vitest.

![demo](example/demo.gif)

> **Note:** The npm package is `@sandeepv68/react-magnifier`

## Features

* **Modern Stack**: React 19 with hooks, TypeScript 5.3, Vite 5
* **Styled Components**: CSS-in-JS via styled-components — no external stylesheet required
* **Small Bundle**: 13.92 kB ESM (3.49 kB gzipped), 7.51 kB UMD (2.74 kB gzipped)
* **Fully Typed**: TypeScript with strict mode enabled
* **Accessible**: WCAG 2.1 Level AA - keyboard navigation, ARIA attributes, screen reader support
* **Zero Runtime Dependencies**: React is a peer dependency only; styled-components is the sole runtime dependency
* **Keyboard Navigation**: Arrow keys to move magnifier, Escape to close
* **Touch Support**: Works on mobile devices and touch screens
* **Custom Events**: Listen to magnifier state changes (initialized, moved, visible, invisible)
* **Customizable Styling**: Full CSS customization support
* **100% Backward Compatible**: Drop-in replacement for v0.x
* **Fully Tested**: 49 comprehensive test cases covering all functionality
* **Performance Optimized**: React.memo and useCallback for optimal rendering

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Keyboard Navigation](#keyboard-navigation)
- [Accessibility](#accessibility)
- [API Documentation](#api-documentation)
  - [Props](#props)
  - [Custom Events](#custom-events)
- [Examples](#examples)
- [Migration Guide](#migration-guide-from-v004)
- [Project Summary](#project-summary)
- [Contributing](#contributing)
- [License](#license)
- [Changelog](#changelog)

## Installation

Install the package from NPM:

```bash
npm install @sandeepv68/react-magnifier
```

Or with yarn:

```bash
yarn add @sandeepv68/react-magnifier
```

## Quick Start

```jsx
import ReactMagnifier from '@sandeepv68/react-magnifier'

export default function App() {
  return (
    <ReactMagnifier
      imageUrl="https://example.com/image.jpg"
      imageAltText="Product image"
      zoomSize={2.5}
      magnifierHeight={200}
      magnifierWidth={200}
    />
  )
}
```

## Keyboard Navigation

The magnifier supports full keyboard navigation for improved accessibility:

| Key | Action |
|-----|--------|
| **Arrow Up** | Move magnifier 10px up |
| **Arrow Down** | Move magnifier 10px down |
| **Arrow Left** | Move magnifier 10px left |
| **Arrow Right** | Move magnifier 10px right |
| **Escape** | Close magnifier |

**Note**: Keyboard navigation is active when the magnifier is visible (after hovering or focusing on the image).

## Accessibility

ReactMagnifier is built with accessibility as a core feature, meeting **WCAG 2.1 Level AA** standards:

### Features

- ✅ **Keyboard Navigation** - Full keyboard support with arrow keys and Escape
- ✅ **ARIA Labels** - Proper ARIA attributes for screen readers
- ✅ **Screen Reader Support** - Status updates announced to screen readers
- ✅ **Focus Management** - Proper focus handling and tabindex
- ✅ **Semantic HTML** - Proper semantic structure
- ✅ **Visual Focus Indicators** - Clear focus indicators for keyboard users

### Example with Accessibility

```jsx
<ReactMagnifier
  imageUrl="image.jpg"
  imageAltText="Product description for screen readers"
  getMagnifier={(container) => {
    console.log('Magnifier container:', container)
  }}
/>
```

## API Documentation

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUrl` | `string` | *required* | URL of the image to magnify |
| `imageAltText` | `string` | `"react-magnifier-image"` | Alt text for the image (accessibility) |
| `imageWidth` | `number \| string` | `"auto"` | Width of the image element |
| `imageHeight` | `number \| string` | `"auto"` | Height of the image element |
| `magnifierWidth` | `number` | `100` | Width of magnifier glass in pixels |
| `magnifierHeight` | `number` | `100` | Height of magnifier glass in pixels |
| `magnifierRadius` | `number` | `50` | Border radius of magnifier glass (0-100 %) |
| `magnifierBorderColor` | `string` | `"#000"` | Border color of magnifier glass |
| `magnifierBorderStyle` | `string` | `"solid"` | Border style (solid, dashed, dotted, etc.) |
| `magnifierBorderWidth` | `number` | `3` | Border width in pixels |
| `magnifierShadow` | `boolean` | `true` | Whether to show drop shadow |
| `cursor` | `string` | `"none"` | CSS cursor style |
| `zoomSize` | `number` | `2` | Magnification zoom level |
| `getMagnifier` | `(container: HTMLDivElement \| null) => void` | `() => {}` | Callback when magnifier initializes |
| `customImgStyles` | `string` | `""` | Custom CSS class for image |
| `customContainerStyles` | `string` | `""` | Custom CSS class for container |

### Custom Events

The component dispatches custom DOM events for magnifier state changes:

```jsx
const containerRef = useRef(null)

useEffect(() => {
  const container = containerRef.current
  if (!container) return

  const handleMagnifierInitialized = () => console.log('Magnifier initialized')
  const handleMagnifierMoved = () => console.log('Magnifier moved')
  const handleMagnifierVisible = () => console.log('Magnifier visible')
  const handleMagnifierInvisible = () => console.log('Magnifier invisible')

  container.addEventListener('magnifier-initialized', handleMagnifierInitialized)
  container.addEventListener('magnifier-moved', handleMagnifierMoved)
  container.addEventListener('magnifier-visible', handleMagnifierVisible)
  container.addEventListener('magnifier-invisible', handleMagnifierInvisible)

  return () => {
    container.removeEventListener('magnifier-initialized', handleMagnifierInitialized)
    container.removeEventListener('magnifier-moved', handleMagnifierMoved)
    container.removeEventListener('magnifier-visible', handleMagnifierVisible)
    container.removeEventListener('magnifier-invisible', handleMagnifierInvisible)
  }
}, [])
```

**Event Names:**
- `magnifier-initialized` - Fired when magnifier is initialized
- `magnifier-moved` - Fired when magnifier position changes
- `magnifier-visible` - Fired when magnifier becomes visible
- `magnifier-invisible` - Fired when magnifier becomes hidden

## Examples

### Basic Example

```jsx
<ReactMagnifier imageUrl="image.jpg" />
```

### E-commerce Product View

```jsx
<ReactMagnifier
  imageUrl="product-image.jpg"
  imageAltText="Blue wireless headphones"
  imageWidth={500}
  imageHeight={500}
  magnifierWidth={200}
  magnifierHeight={200}
  magnifierRadius={100}
  zoomSize={3}
  magnifierShadow={true}
  getMagnifier={(container) => {
    console.log('Product magnifier loaded')
  }}
/>
```

### Custom Styling

```jsx
<ReactMagnifier
  imageUrl="image.jpg"
  magnifierBorderColor="#ff6b6b"
  magnifierBorderWidth={2}
  magnifierBorderStyle="dashed"
  cursor="crosshair"
  customContainerStyles="product-magnifier"
  customImgStyles="product-image"
/>
```

### With Event Listeners

```jsx
import { useRef, useEffect } from 'react'
import ReactMagnifier from '@sandeepv68/react-magnifier'

export default function ProductImage() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMagnifierVisible = () => {
      console.log('User started magnifying image')
    }

    container.addEventListener('magnifier-visible', handleMagnifierVisible)
    return () => container.removeEventListener('magnifier-visible', handleMagnifierVisible)
  }, [])

  return (
    <div ref={containerRef}>
      <ReactMagnifier
        imageUrl="product.jpg"
        zoomSize={2.5}
      />
    </div>
  )
}
```

## Migration Guide from v0.0.4

ReactMagnifier v1.1.1 is **100% backward compatible** with v0.0.4. No code changes are required, but you can take advantage of new features:

### What's New in v1.0.0

1. **React 19 Support** - Now uses React 19 hooks internally
2. **Keyboard Navigation** - Arrow keys and Escape key support
3. **Improved Accessibility** - WCAG 2.1 Level AA compliant
4. **Smaller Bundle** - 6.29 kB gzipped (vs 18 KB previously)
5. **Better Performance** - React.memo and useCallback optimizations
6. **Full TypeScript** - Strict mode enabled for type safety
7. **Improved Testing** - 49 test cases with 100% coverage target
8. **Modern Build** - Vite instead of Webpack for faster builds

### Upgrading from v0.0.4

Simply update your package:

```bash
npm update @sandeepv68/react-magnifier
```

Your existing code will continue to work without any changes. To enable keyboard navigation, just press arrow keys or Escape when the magnifier is active.

## Project Summary

ReactMagnifier v1.2.0 is a production-ready modernization that combines:

- React 19 functional component architecture
- Vite 5 build tooling with dual ESM and UMD bundles
- TypeScript 5.3 strict typing and declaration generation (via `vite-plugin-dts`)
- WCAG 2.1 Level AA accessibility with keyboard and screen reader support
- Vitest testing with a 100% coverage target
- Zero runtime dependencies bundled — React, ReactDOM, and styled-components are all peer dependencies

### Release Highlights

- React 19 ready with hooks and `React.memo`
- Keyboard navigation: arrow keys + Escape
- Custom DOM events for magnifier lifecycle states
- Build output: `dist/react-magnifier.js` and `dist/react-magnifier.umd.cjs`
- Source maps and `.d.ts` declarations included

### Performance Snapshot

- ESM bundle: **13.92 kB** minified, **3.49 kB** gzipped
- UMD bundle: **7.51 kB** minified, **2.74 kB** gzipped
- Build time: **~4s** with Vite + vite-plugin-dts
- 100% test coverage target with **49** test cases
- Zero runtime dependencies (React, ReactDOM, styled-components are peer dependencies)

### Publication & Verification

Recommended pre-publication checks:

```bash
npm run build
npm run type-check
npm run lint
npm test -- --run
```

Publication steps:

```bash
git add .
git commit -m "feat: v1.0.0 - React 19 modernization"
git tag -a v1.0.0 -m "ReactMagnifier v1.0.0 release"
git push origin main
git push origin v1.0.0
npm publish --access public
```

### Documentation & Links

- [NPM Publication Guide](./NPM_PUBLICATION_GUIDE.md)
- [Performance Optimization](./PERFORMANCE_OPTIMIZATION.md)
- [Project Docs](./PROJECT_DOCS.md)
- [Release Notes](./RELEASE_NOTES.md)

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.

## License

MIT License - see LICENSE file for details

## Technologies Used

- **React**: 19.0.0
- **TypeScript**: 5.3.3
- **Vite**: 5.0.8
- **Vitest**: 1.1.0
- **styled-components**: 6.4.4 (peer dependency)
- **@testing-library/react**: 15.0.7

## Changelog

### v1.2.0 - 2026-07-27

**🔒 Production Readiness Fixes**

#### 🐛 Critical Fixes

**Bundle Externalization**
- Externalized `styled-components` and `react/jsx-runtime` from the Vite build — consumers no longer get duplicate copies
- ESM bundle reduced from 25.25 kB to 13.92 kB; UMD from 12.08 kB to 7.51 kB
- UMD bundle no longer ships development-mode JSX runtime

**Type Declarations**
- Added `vite-plugin-dts` to generate `.d.ts` files in `dist/` during build
- TypeScript consumers can now import the package without errors

**Console Warning Fix**
- Changed `console.log` to `console.warn` in `logMagnifierError()` — errors now use proper severity level

#### 🧹 Cleanup & Fixes

- Moved `styled-components` from `dependencies` to `peerDependencies` — consumers control the version
- Removed `@types/styled-components` (v6 ships its own types)
- Removed unused `debounce` utility function
- Scoped global `* { box-sizing: border-box }` reset to `.react-magnifier-glass` only
- Fixed `.gitignore` and `.npmignore` source map patterns (`*.map.js` → `*.map`)
- Removed invalid `./dist/style.css` export entry
- Added `"sideEffects": false` for tree-shaking support
- Fixed React peer dependency to support `^18.0.0 || ^19.0.0`
- Fixed dev React dependency to stable `^19.0.0` (was RC)

#### 📦 Dependency Updates

- Added `vite-plugin-dts` as a dev dependency for type declaration generation
- `styled-components` is now a peer dependency, not a runtime dependency

#### 📝 Documentation

- Added demo GIF to README
- Updated bundle size stats throughout docs

---

### v1.1.1 - 2026-07-25

**🐛 Bug Fixes & Documentation Cleanup**

#### 🐛 Bug Fixes

**Keyboard Navigation Background Sync**
- Fixed keyboard arrow key handlers (↑ ↓ ← →) to update `backgroundPosition` alongside glass position
- Previously, moving the magnifier with keyboard would shift the glass but the zoomed content would not follow
- Added `updateBackgroundPosition()` helper that derives logical coordinates from the glass element's DOM position

**Event Name Consistency**
- Fixed misspelled custom event names (`magnfier-*` → `magnifier-*`) across all consumer code
- The component dispatches correctly-spelled events, but stories, tests, and documentation referenced misspelled versions, meaning event listeners would never fire
- Fixed in: `ReactMagnifier.styled.ts`, `ReactMagnifier.stories.tsx`, `ReactMagnifier.memory.test.tsx`, `README.md`, `CHANGELOG.md`, `RELEASE_NOTES.md`, `TECHNICAL_DOCS.md`

#### 🧹 Code Cleanup

- Deleted `src/ReactMagnifier/style.css` — redundant since v1.1.0 migrated to styled-components
- Removed non-existent `index.css` imports from `src/index.tsx` and stories

#### 🧪 Test Improvements

- Replaced fragile `await new Promise(resolve => setTimeout(resolve, N))` with `waitFor` from `@testing-library/react` in `ReactMagnifier.test.tsx`
- Fixed syntax error in `ReactMagnifier.memory.test.tsx:269` (statement, eslint-disable, and expect were collapsed onto one line)
- All **49 tests** passing

#### 📝 Documentation Fixes

- "Zero Dependencies" → "Minimal runtime dependencies (styled-components is the sole runtime dependency)"
- "17 comprehensive test cases" → "49 comprehensive test cases"
- Removed references to non-existent npm scripts (`build-tsc`, `build-dev`, `build-prod`)
- "Jest testing library" → "Vitest testing library"
- Updated test count from "50+" to accurate "49"

---

### v1.1.0 - 2026-07-20

**🎨 CSS-in-JS Migration via styled-components**

#### ✨ What's New

**styled-components Integration**
- Component styles are now co-located with the component — no external stylesheet import required
- New `ReactMagnifier.styled.ts` exports three styled primitives:
  - `ImageContainer` — styled `div` replacing `.react-magnifier-image-container`
  - `SrOnly` — styled `div` for screen-reader status announcements
  - `MagnifierGlobalStyles` — `createGlobalStyle` block for the imperatively-created magnifier glass (`.react-magnifier-glass`, `.show-magnifier`, `.hide-magnifier`)
- The class name `react-magnifier-image-container` is still applied explicitly for full backward compatibility with external CSS overrides and existing tests

#### 📦 Dependency Updates

- Added `styled-components` as a runtime dependency
- Added `@types/styled-components` as a dev dependency

#### ✅ Backward Compatibility

All v1.0.0 props, events, and behaviors are fully supported. No breaking changes.

---

### v1.0.0 - 2026-07-18

**🎉 Major Release - Complete Modernization & Accessibility Overhaul**

#### ✨ What's New

**React 19 & Modern Architecture**
- Complete migration from React 16 class components to React 19 functional components with hooks
- React.memo, useCallback, useMemo, useRef, useEffect throughout

**Keyboard Navigation** ⌨️
- Arrow keys (↑ ↓ ← →) to move magnifier glass (10px per keypress)
- Escape key to close/hide magnifier

**Accessibility Enhancements** 🎯
- WCAG 2.1 Level AA compliance
- ARIA attributes: `role="group"`, `aria-label`, `aria-describedby`, `aria-live`
- Screen reader support with dynamic status announcements
- Visual focus indicators via `:focus-visible`

**Custom Events System**
- `magnifier-initialized`, `magnifier-moved`, `magnifier-visible`, `magnifier-invisible`

**Build System**
- Vite 5.0.8 replacing Webpack 3 — 10x faster builds (~589ms)
- Dual ESM + UMD output with TypeScript declarations and source maps

**Testing**
- Vitest 1.1.0 with 49 tests across unit, performance, and memory-leak suites

#### 🚀 Performance Metrics (v0.0.4 → v1.2.0)

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Bundle (gzipped) | ~18 KB | **3.49 KB** | **-81%** |
| Build time | ~5000ms | **~4s** | **-92%** |
| React version | 16.12 | **19.0** | Latest |
| Accessibility | Basic | **WCAG AA** | Full compliance |
| Runtime Dependencies | 0 | **0** (all peer) | Zero bundled |

#### ✅ Backward Compatibility

100% backward compatible with v0.0.4 — no breaking changes.

---

## Previous Versions

**v1.1.1** - Bug fixes, documentation cleanup, test improvements
**v1.1.0** - CSS-in-JS migration via styled-components
**v1.0.0** - Major modernization to React 19
**v0.0.4** - Previous stable release

---

## Acknowledgements

This modernized version builds upon the original React Magnifier concept, bringing it to 2026 standards with React 19, enhanced accessibility, improved performance, and comprehensive testing. Special thanks to all contributors and users who have supported this project.

Made with ❤️ by Sandeep Vattapparambil and the React Community.

---

## Contributing

All suggestions and pull requests are welcome! Please read the [CODE_OF_CONDUCT](https://github.com/SandeepVattapparambil/react-magnify/blob/master/CODE_OF_CONDUCT.md) and [CONTRIBUTING](https://github.com/SandeepVattapparambil/react-magnify/blob/master/CONTRIBUTING.md) files before contributing.

Clone and contribute:
```bash
git clone https://github.com/SandeepVattapparambil/react-magnify.git
cd react-magnify
npm install
npm run dev      # Start development server
npm test         # Run tests
npm run build    # Build for production
```

See [NPM_PUBLICATION_GUIDE.md](./NPM_PUBLICATION_GUIDE.md) for publishing instructions.

* Create production build for react source
```sh
npm run build
```

* Run type checking
```sh
npm run type-check
```

* Run linting
```sh
npm run lint
```

You need to have `Nodejs` ,`npm` in your system as development dependency.

## Tests

This project includes unit tests written in `Vitest` testing library. Tests can be run by the npm script
```sh
npm run test
```
## Technologies Used

![technologies-used](https://i.ibb.co/3vf5Td1/tech-stack.png)

## License

MIT License

Copyright (c) 2020 Sandeep Vattapparambil [http://www.sandeepv.in](http://www.sandeepv.in)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgements

This project is inspired from [Blowup.js](https://paulkr.github.io/blowup.js/), but not copied or does not include any or part of it in this project.

Made with :heart: by [Sandeep Vattapparambil](https://github.com/SandeepVattapparambil).

All images used in demos and documentations are from [Unsplash.com](https://unsplash.com)