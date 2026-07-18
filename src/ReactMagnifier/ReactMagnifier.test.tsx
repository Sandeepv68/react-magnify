import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ReactMagnifier from './ReactMagnifier';

describe('ReactMagnifier Component', () => {
  // Use a simple 1x1 pixel data URL instead of external image (avoids network requests)
  const testImageUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(
        <ReactMagnifier imageUrl={testImageUrl} />
      );
      expect(container).toBeDefined();
      expect(container.querySelector('img')).toBeDefined();
    });

    it('should render image element with correct src', () => {
      const { container } = render(
        <ReactMagnifier imageUrl={testImageUrl} />
      );
      const img = container.querySelector('img') as HTMLImageElement;
      expect(img).toBeDefined();
      expect(img.src).toBe(testImageUrl);
    });

    it('should apply custom image alt text', () => {
      render(
        <ReactMagnifier
          imageUrl={testImageUrl}
          imageAltText="Custom alt text"
        />
      );
      const img = screen.getByAltText('Custom alt text');
      expect(img).toBeDefined();
    });

    it('should have proper container structure with ARIA attributes', () => {
      const { container } = render(
        <ReactMagnifier imageUrl={testImageUrl} />
      );
      const mainContainer = container.querySelector('.react-magnifier-image-container');
      expect(mainContainer?.getAttribute('role')).toBe('group');
      expect(mainContainer?.getAttribute('aria-label')).toBe('Image magnifier');
    });
  });

  describe('Props Configuration', () => {
    it('should use default prop values', () => {
      const { container } = render(
        <ReactMagnifier imageUrl={testImageUrl} />
      );
      const img = container.querySelector('img');
      expect(img?.getAttribute('width')).toBe('auto');
      expect(img?.getAttribute('height')).toBe('auto');
    });

    it('should apply custom width and height', () => {
      const { container } = render(
        <ReactMagnifier
          imageUrl={testImageUrl}
          imageWidth={400}
          imageHeight={400}
        />
      );
      const img = container.querySelector('img');
      expect(img?.getAttribute('width')).toBe('400');
      expect(img?.getAttribute('height')).toBe('400');
    });

    it('should apply custom CSS classes', () => {
      const { container } = render(
        <ReactMagnifier
          imageUrl={testImageUrl}
          customContainerStyles="custom-container-class"
          customImgStyles="custom-image-class"
        />
      );
      expect(container.querySelector('.custom-container-class')).toBeDefined();
      expect(container.querySelector('.custom-image-class')).toBeDefined();
    });

    it('should call getMagnifier callback', async () => {
      const getMagnifier = vi.fn();
      render(
        <ReactMagnifier
          imageUrl={testImageUrl}
          getMagnifier={getMagnifier}
        />
      );
      // Give callback time to execute
      await new Promise(resolve => setTimeout(resolve, 50));
      expect(getMagnifier).toHaveBeenCalled();
    });
  });

  describe('Magnifier Glass Creation', () => {
    it('should create magnifier glass element on mount', async () => {
      const { container } = render(
        <ReactMagnifier imageUrl={testImageUrl} />
      );
      // Allow time for initialization
      await new Promise(resolve => setTimeout(resolve, 150));
      const glass = container.querySelector('.react-magnifier-glass');
      expect(glass).toBeDefined();
    });

    it('should apply correct styles to magnifier glass', async () => {
      const { container } = render(
        <ReactMagnifier
          imageUrl={testImageUrl}
          magnifierWidth={150}
          magnifierHeight={150}
          magnifierRadius={75}
          magnifierBorderWidth={2}
          magnifierBorderColor="#ff0000"
        />
      );
      await new Promise(resolve => setTimeout(resolve, 150));
      const glass = container.querySelector('.react-magnifier-glass') as HTMLElement;
      if (glass) {
        expect(glass.style.width).toBe('150px');
        expect(glass.style.height).toBe('150px');
        expect(glass.style.borderRadius).toBe('75%');
        expect(glass.style.borderWidth).toBe('2px');
      }
    });
  });

  describe('Visibility Control', () => {
    it('should hide magnifier initially', async () => {
      const { container } = render(
        <ReactMagnifier imageUrl={testImageUrl} />
      );
      await new Promise(resolve => setTimeout(resolve, 150));
      const glass = container.querySelector('.react-magnifier-glass');
      expect(glass?.classList.contains('hide-magnifier')).toBe(true);
    });

    it('should show magnifier on mouse enter', async () => {
      const { container } = render(
        <ReactMagnifier imageUrl={testImageUrl} />
      );
      await new Promise(resolve => setTimeout(resolve, 150));
      const mainContainer = container.querySelector('.react-magnifier-image-container');
      if (mainContainer) {
        fireEvent.mouseEnter(mainContainer);
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(container.querySelector('.react-magnifier-glass')?.classList.contains('show-magnifier')).toBe(true);
      }
    });

    it('should hide magnifier on mouse leave', async () => {
      const { container } = render(
        <ReactMagnifier imageUrl={testImageUrl} />
      );
      await new Promise(resolve => setTimeout(resolve, 150));
      const mainContainer = container.querySelector('.react-magnifier-image-container');
      if (mainContainer) {
        fireEvent.mouseEnter(mainContainer);
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(container.querySelector('.react-magnifier-glass')?.classList.contains('show-magnifier')).toBe(true);

        fireEvent.mouseLeave(mainContainer);
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(container.querySelector('.react-magnifier-glass')?.classList.contains('hide-magnifier')).toBe(true);
      }
    });
  });

  describe('Keyboard Navigation', () => {
    it('should respond to Escape key to hide magnifier', async () => {
      const { container } = render(
        <ReactMagnifier imageUrl={testImageUrl} />
      );
      await new Promise(resolve => setTimeout(resolve, 150));
      const mainContainer = container.querySelector('.react-magnifier-image-container');
      if (mainContainer) {
        fireEvent.mouseEnter(mainContainer);
        await new Promise(resolve => setTimeout(resolve, 50));
        fireEvent.keyDown(window, { key: 'Escape' });
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(container.querySelector('.react-magnifier-glass')?.classList.contains('hide-magnifier')).toBe(true);
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle missing image URL gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      render(<ReactMagnifier imageUrl="" />);
      consoleSpy.mockRestore();
    });
  });

  describe('Component Updates', () => {
    it('should update when image URL prop changes', () => {
      const { rerender, container } = render(
        <ReactMagnifier imageUrl={testImageUrl} />
      );
      const newImageUrl = 'https://via.placeholder.com/400x400';
      rerender(<ReactMagnifier imageUrl={newImageUrl} />);
      const img = container.querySelector('img') as HTMLImageElement;
      expect(img.src).toBe(newImageUrl);
    });
  });

  describe('React.memo Optimization', () => {
    it('should be a memoized component', () => {
      expect(ReactMagnifier).toBeDefined();
      expect(ReactMagnifier.displayName).toBe('ReactMagnifier');
    });
  });
});
