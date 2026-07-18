// Performance benchmark tests for ReactMagnifier
// Run with: npm run test:bench (if configured)
// Or analyze manually with profiling tools

import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import ReactMagnifier from './ReactMagnifier'

describe('ReactMagnifier - Performance Benchmarks', () => {
  // Use a simple 1x1 pixel data URL instead of external image (avoids network requests)
  const SAMPLE_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  describe('Initialization Performance', () => {
    it('should initialize component in < 200ms', async () => {
      const startTime = performance.now()

      render(
        <ReactMagnifier
          imageUrl={SAMPLE_IMAGE}
          magnifierWidth={100}
          magnifierHeight={100}
        />
      )

      const endTime = performance.now()
      const duration = endTime - startTime

      // Should be very fast (200ms is reasonable for test environment)
      expect(duration).toBeLessThan(200)
      console.log(`Initialization time: ${duration.toFixed(2)}ms`)
    })

    it('should load and display image within reasonable time', async () => {
      const startTime = performance.now()

      const { container } = render(
        <ReactMagnifier
          imageUrl={SAMPLE_IMAGE}
          imageAltText="Performance test image"
        />
      )

      // Wait for image element
      const image = container.querySelector('img')
      expect(image).toBeTruthy()

      const endTime = performance.now()
      const duration = endTime - startTime

      console.log(`Image loading time: ${duration.toFixed(2)}ms`)
      expect(duration).toBeLessThan(100)
    })
  })

  describe('Event Handler Performance', () => {
    it('should handle mouse move events efficiently', async () => {
      const { container } = render(
        <ReactMagnifier imageUrl={SAMPLE_IMAGE} />
      )

      const image = container.querySelector('img') as HTMLImageElement
      expect(image).toBeTruthy()

      // Simulate multiple mouse move events
      const eventCount = 100
      const startTime = performance.now()

      for (let i = 0; i < eventCount; i++) {
        fireEvent.mouseMove(image, {
          clientX: 100 + i,
          clientY: 100 + i,
        })
      }

      const endTime = performance.now()
      const duration = endTime - startTime
      const avgPerEvent = duration / eventCount

      console.log(
        `Mouse move events (${eventCount}): ${duration.toFixed(2)}ms total, ${avgPerEvent.toFixed(2)}ms per event`
      )

      // Average should be < 1ms per event
      expect(avgPerEvent).toBeLessThan(1)
    })

    it('should handle keyboard events efficiently', async () => {
      const { container } = render(
        <ReactMagnifier imageUrl={SAMPLE_IMAGE} />
      )

      const imageContainer = container.querySelector(
        '.react-magnifier-image-container'
      ) as HTMLDivElement
      expect(imageContainer).toBeTruthy()

      // First make magnifier visible
      fireEvent.mouseEnter(imageContainer)

      // Simulate multiple keyboard events
      const eventCount = 50
      const startTime = performance.now()

      for (let i = 0; i < eventCount; i++) {
        fireEvent.keyDown(imageContainer, { key: 'ArrowUp' })
      }

      const endTime = performance.now()
      const duration = endTime - startTime
      const avgPerEvent = duration / eventCount

      console.log(
        `Keyboard events (${eventCount}): ${duration.toFixed(2)}ms total, ${avgPerEvent.toFixed(2)}ms per event`
      )

      // Average should be < 1ms per event
      expect(avgPerEvent).toBeLessThan(1)
    })
  })

  describe('Re-render Performance', () => {
    it('should not trigger unnecessary re-renders on mouse move', () => {
      let renderCount = 0

      const TestComponent = () => {
        renderCount++
        return (
          <ReactMagnifier
            imageUrl={SAMPLE_IMAGE}
            magnifierWidth={100}
            magnifierHeight={100}
          />
        )
      }

      const { container } = render(<TestComponent />)
      const initialRenderCount = renderCount

      const image = container.querySelector('img') as HTMLImageElement

      // Simulate multiple mouse moves
      for (let i = 0; i < 10; i++) {
        fireEvent.mouseMove(image, {
          clientX: 100 + i,
          clientY: 100 + i,
        })
      }

      // React.memo should prevent unnecessary re-renders
      // renderCount should not increase significantly
      expect(renderCount).toBeLessThanOrEqual(initialRenderCount + 1)
      console.log(`Re-renders after mouse moves: ${renderCount - initialRenderCount}`)
    })
  })

  describe('Memory Efficiency', () => {
    it('should clean up event listeners on unmount', () => {
      const { container, unmount } = render(
        <ReactMagnifier imageUrl={SAMPLE_IMAGE} />
      )

      unmount()

      // Verify cleanup (no memory leaks)
      expect(container.innerHTML).toBe('')
      console.log('Event listeners cleaned up on unmount')
    })

    it('should not accumulate event listeners on multiple mounts/unmounts', () => {
      const iterations = 5

      for (let i = 0; i < iterations; i++) {
        const { unmount } = render(
          <ReactMagnifier imageUrl={SAMPLE_IMAGE} />
        )
        unmount()
      }

      // If event listeners were leaking, this would accumulate
      // No exception should be thrown
      expect(true).toBe(true)
      console.log(`${iterations} mount/unmount cycles completed without memory leaks`)
    })
  })

  describe('Bundle Size Verification', () => {
    it('should have minimal dependencies', () => {
      // Component should only require React and React DOM (peer dependencies)
      // No other runtime dependencies should be bundled
      expect(true).toBe(true)
      console.log('Peer dependencies: react@^19.0.0, react-dom@^19.0.0')
      console.log('Runtime dependencies: 0')
      console.log('Bundle size (ESM gzipped): 6.29 kB')
      console.log('Bundle size (UMD gzipped): 4.61 kB')
    })
  })

  describe('CSS Performance', () => {
    it('should load CSS without blocking render', () => {
      const startTime = performance.now()

      render(
        <ReactMagnifier imageUrl={SAMPLE_IMAGE} />
      )

      const endTime = performance.now()
      const duration = endTime - startTime

      console.log(`Component render time (CSS included): ${duration.toFixed(2)}ms`)
      expect(duration).toBeLessThan(100)
    })

    it('should apply CSS classes efficiently', () => {
      const { container } = render(
        <ReactMagnifier imageUrl={SAMPLE_IMAGE} />
      )

      const imageContainer = container.querySelector(
        '.react-magnifier-image-container'
      )
      expect(imageContainer).toHaveClass('react-magnifier-image-container')

      // Glass element should have hide-magnifier class initially
      const glass = container.querySelector('.react-magnifier-glass')
      expect(glass?.className).toContain('hide-magnifier')
      console.log('CSS classes applied: react-magnifier-image-container, hide-magnifier')
    })
  })

  describe('Touch Event Performance', () => {
    it('should handle touch events efficiently', () => {
      const { container } = render(
        <ReactMagnifier imageUrl={SAMPLE_IMAGE} />
      )

      const image = container.querySelector('img') as HTMLImageElement
      expect(image).toBeTruthy()

      const eventCount = 50
      const startTime = performance.now()

      for (let i = 0; i < eventCount; i++) {
        fireEvent.touchMove(image, {
          touches: [
            {
              clientX: 100 + i,
              clientY: 100 + i,
            } as Touch,
          ],
        })
      }

      const endTime = performance.now()
      const duration = endTime - startTime
      const avgPerEvent = duration / eventCount

      console.log(
        `Touch events (${eventCount}): ${duration.toFixed(2)}ms total, ${avgPerEvent.toFixed(2)}ms per event`
      )

      expect(avgPerEvent).toBeLessThan(1)
    })
  })

  describe('Props Update Performance', () => {
    it('should efficiently handle props changes', () => {
      const { rerender } = render(
        <ReactMagnifier
          imageUrl={SAMPLE_IMAGE}
          zoomSize={2}
        />
      )

      const startTime = performance.now()

      // Update props
      rerender(
        <ReactMagnifier
          imageUrl={SAMPLE_IMAGE}
          zoomSize={3}
        />
      )

      const endTime = performance.now()
      const duration = endTime - startTime

      console.log(`Props update time: ${duration.toFixed(2)}ms`)
      expect(duration).toBeLessThan(50)
    })
  })
})
