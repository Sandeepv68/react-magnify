// @ts-nocheck
// Storybook stories - optional development artifacts (not included in production bundle)
import { useRef, useEffect, useState, ReactNode } from 'react'
import type { ComponentType } from 'react'
import ReactMagnifier from './ReactMagnifier'
import '../index.css'
import './style.css'

type StoryFn = ComponentType<{ children?: ReactNode }>
type StoryConfig = React.ComponentProps<typeof ReactMagnifier> & {
  decorators?: Array<(Component: StoryFn) => React.ReactNode>
}

// Storybook metadata (for reference)
const meta = {
  title: 'Components/ReactMagnifier',
  component: ReactMagnifier,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A modern, accessible React 19 component for image magnification with keyboard navigation and WCAG 2.1 Level AA accessibility compliance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    imageUrl: {
      control: 'text',
      description: 'URL of the image to magnify',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'required' },
      },
    },
    imageAltText: {
      control: 'text',
      description: 'Alt text for accessibility',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"react-magnifier-image"' },
      },
    },
    zoomSize: {
      control: { type: 'range', min: 1, max: 10, step: 0.5 },
      description: 'Magnification zoom level',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    magnifierHeight: {
      control: { type: 'range', min: 50, max: 300, step: 10 },
      description: 'Height of magnifier glass in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    magnifierWidth: {
      control: { type: 'range', min: 50, max: 300, step: 10 },
      description: 'Width of magnifier glass in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    magnifierRadius: {
      control: { type: 'range', min: 0, max: 50, step: 5 },
      description: 'Border radius of magnifier glass',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '50' },
      },
    },
    magnifierBorderColor: {
      control: 'color',
      description: 'Border color of magnifier glass',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"#000"' },
      },
    },
    magnifierBorderWidth: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Border width in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
    magnifierBorderStyle: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'double'],
      description: 'Border style',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"solid"' },
      },
    },
    magnifierShadow: {
      control: 'boolean',
      description: 'Whether to show drop shadow',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    cursor: {
      control: 'select',
      options: ['none', 'crosshair', 'pointer', 'grab', 'zoom-in'],
      description: 'CSS cursor style',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"none"' },
      },
    },
  },
} satisfies Meta<typeof ReactMagnifier>

export default meta
type Story = StoryObj<typeof meta>

// Example image URL (high-resolution product image)
const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80'

/**
 * The default magnifier with basic configuration
 */
export const Default: StoryConfig = {
  args: {
    imageUrl: SAMPLE_IMAGE,
    imageAltText: 'Product image',
    zoomSize: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default magnifier with basic settings. Hover to see the magnifier in action.',
      },
    },
  },
}

/**
 * Large magnifier glass for better visibility
 */
export const LargeGlass: StoryConfig = {
  args: {
    imageUrl: SAMPLE_IMAGE,
    imageAltText: 'Product image with large magnifier',
    magnifierWidth: 200,
    magnifierHeight: 200,
    zoomSize: 2.5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Larger magnifier glass (200x200px) provides more detailed view of the zoomed area.',
      },
    },
  },
}

/**
 * High zoom magnification
 */
export const HighZoom: StoryConfig = {
  args: {
    imageUrl: SAMPLE_IMAGE,
    imageAltText: 'Product image with high zoom',
    zoomSize: 5,
    magnifierWidth: 150,
    magnifierHeight: 150,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Higher magnification level (5x zoom) for detailed examination. Useful for e-commerce product pages.',
      },
    },
  },
}

/**
 * Circular magnifier glass
 */
export const CircularGlass: StoryConfig = {
  args: {
    imageUrl: SAMPLE_IMAGE,
    imageAltText: 'Product image with circular magnifier',
    magnifierRadius: 50,
    magnifierWidth: 150,
    magnifierHeight: 150,
    magnifierBorderColor: '#ff6b6b',
    magnifierBorderWidth: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Circular magnifier glass (100% border radius) with custom red border.',
      },
    },
  },
}

/**
 * Dashed border style magnifier
 */
export const DashedBorder: StoryConfig = {
  args: {
    imageUrl: SAMPLE_IMAGE,
    imageAltText: 'Product image with dashed border',
    magnifierBorderStyle: 'dashed',
    magnifierBorderColor: '#4a90e2',
    magnifierBorderWidth: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Magnifier with dashed border style for a different visual appearance.',
      },
    },
  },
}

/**
 * Without shadow effect
 */
export const NoShadow: StoryConfig = {
  args: {
    imageUrl: SAMPLE_IMAGE,
    imageAltText: 'Product image without shadow',
    magnifierShadow: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Magnifier glass without drop shadow for a flatter design.',
      },
    },
  },
}

/**
 * Custom cursor style
 */
export const CustomCursor: StoryConfig = {
  args: {
    imageUrl: SAMPLE_IMAGE,
    imageAltText: 'Product image with custom cursor',
    cursor: 'crosshair',
    magnifierBorderColor: '#f59e0b',
  },
  parameters: {
    docs: {
      description: {
        story: 'Magnifier with custom crosshair cursor for enhanced user experience.',
      },
    },
  },
}

/**
 * E-commerce Product View demonstrating typical product page settings
 */
export const EcommerceProduct: StoryConfig = {
  args: {
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=90',
    imageAltText: 'Wireless Headphones - Click or hover to magnify',
    imageWidth: 500,
    imageHeight: 500,
    magnifierWidth: 200,
    magnifierHeight: 200,
    magnifierRadius: 100,
    zoomSize: 3,
    magnifierBorderColor: '#2d3748',
    magnifierBorderWidth: 2,
    cursor: 'zoom-in',
    magnifierShadow: true,
  },
  decorators: [
    (Story: StoryFn) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f7fafc' }}>
          <h3>Product Details</h3>
          <p>
            Hover over the image or use arrow keys (↑↓←→) to navigate when magnified.
            Press Escape to close the magnifier.
          </p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Realistic e-commerce product view with high zoom level and professional styling. Demonstrates typical use case for product pages.',
      },
    },
  },
}

/**
 * Accessibility Features Showcase
 * Demonstrates keyboard navigation and screen reader support
 */
export const AccessibilityDemo: StoryConfig = {
  args: {
    imageUrl: SAMPLE_IMAGE,
    imageAltText:
      'Accessible product image - Use arrow keys to navigate when magnified, Escape to close',
    magnifierWidth: 200,
    magnifierHeight: 200,
    zoomSize: 2.5,
  },
  decorators: [
    (Story: StoryFn) => {
      const [announcements, setAnnouncements] = useState<string[]>([])
      const containerRef = useRef<HTMLDivElement>(null)

      useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleInitialized = () => {
          setAnnouncements((prev) => [
            ...prev,
            'Magnifier initialized - Focus on image and use arrow keys to navigate',
          ])
        }
        const handleVisible = () => {
          setAnnouncements((prev) => [...prev, 'Magnifier is now visible'])
        }
        const handleInvisible = () => {
          setAnnouncements((prev) => [...prev, 'Magnifier is now hidden'])
        }
        const handleMoved = () => {
          setAnnouncements((prev) => [...prev, 'Magnifier position updated'])
        }

        container.addEventListener('magnifier-initialized', handleInitialized)
        container.addEventListener('magnfier-visible', handleVisible)
        container.addEventListener('magnfier-invisible', handleInvisible)
        container.addEventListener('magnfier-moved', handleMoved)

        return () => {
          container.removeEventListener('magnifier-initialized', handleInitialized)
          container.removeEventListener('magnfier-visible', handleVisible)
          container.removeEventListener('magnfier-invisible', handleInvisible)
          container.removeEventListener('magnfier-moved', handleMoved)
        }
      }, [])

      return (
        <div style={{ maxWidth: '700px' }}>
          <div
            ref={containerRef}
            style={{
              outline: '2px solid #4a90e2',
              padding: '10px',
              marginBottom: '20px',
            }}
          >
            <Story />
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#eff6ff',
              border: '1px solid #93c5fd',
              borderRadius: '8px',
            }}
          >
            <h3>Accessibility Features:</h3>
            <ul>
              <li>✅ Keyboard Navigation: Arrow keys (↑↓←→) to move magnifier</li>
              <li>✅ Escape Key: Press to close magnifier</li>
              <li>✅ ARIA Labels: Proper semantic structure for screen readers</li>
              <li>✅ Screen Reader: Status updates announced</li>
              <li>✅ Focus Indicators: Visible focus for keyboard navigation</li>
            </ul>

            <div
              style={{
                marginTop: '15px',
                padding: '10px',
                backgroundColor: '#dbeafe',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                Event Log (last 5 events):
              </div>
              {announcements.slice(-5).map((announcement, idx) => (
                <div key={idx} style={{ marginBottom: '5px', color: '#1e40af' }}>
                  → {announcement}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates full accessibility features including keyboard navigation, ARIA attributes, and custom event handling. Try using arrow keys when magnifier is visible!',
      },
    },
  },
}

/**
 * Custom Event Handling
 * Shows how to listen to and handle custom events
 */
export const CustomEventHandling: StoryConfig = {
  args: {
    imageUrl: SAMPLE_IMAGE,
    imageAltText: 'Product image with custom event handling',
  },
  decorators: [
    (Story: StoryFn) => {
      const [eventLog, setEventLog] = useState<Array<{ time: string; event: string }>>([])
      const containerRef = useRef<HTMLDivElement>(null)

      useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleEvent = (eventName: string) => () => {
          const time = new Date().toLocaleTimeString()
          setEventLog((prev) => [
            ...prev.slice(-9),
            { time, event: eventName },
          ])
        }

        container.addEventListener('magnifier-initialized', handleEvent('Initialized'))
        container.addEventListener('magnfier-visible', handleEvent('Visible'))
        container.addEventListener('magnfier-invisible', handleEvent('Invisible'))
        container.addEventListener('magnfier-moved', handleEvent('Moved'))

        return () => {
          container.removeEventListener('magnifier-initialized', handleEvent('Initialized'))
          container.removeEventListener('magnfier-visible', handleEvent('Visible'))
          container.removeEventListener('magnfier-invisible', handleEvent('Invisible'))
          container.removeEventListener('magnfier-moved', handleEvent('Moved'))
        }
      }, [])

      return (
        <div style={{ maxWidth: '700px' }}>
          <div ref={containerRef} style={{ marginBottom: '20px' }}>
            <Story />
          </div>

          <div
            style={{
              padding: '15px',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '13px',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
              Custom Events Log (last 10):
            </div>
            {eventLog.length === 0 ? (
              <div style={{ color: '#9ca3af' }}>Waiting for events...</div>
            ) : (
              <div>
                {eventLog.map((log, idx) => (
                  <div
                    key={idx}
                    style={{
                      marginBottom: '5px',
                      color: '#374151',
                      borderBottom: '1px solid #e5e7eb',
                      paddingBottom: '5px',
                    }}
                  >
                    <span style={{ color: '#6b7280' }}>[{log.time}]</span> {log.event}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              marginTop: '15px',
              padding: '15px',
              backgroundColor: '#fef2f2',
              borderRadius: '8px',
              fontSize: '13px',
            }}
          >
            <strong>Try:</strong> Hover over the image to trigger events. Move the magnifier
            around to see the "Moved" event. Mouse out to trigger the invisible event.
          </div>
        </div>
      )
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates custom event handling with real-time event logging. Shows how to subscribe to magnifier state changes.',
      },
    },
  },
}

/**
 * Responsive Design Example
 * Shows magnifier working at different sizes
 */
export const ResponsiveDesign: StoryConfig = {
  args: {
    imageUrl: SAMPLE_IMAGE,
    imageAltText: 'Responsive product image',
    imageWidth: '100%',
    imageHeight: 'auto',
    zoomSize: 2.5,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '100%' }}>
        <div style={{ marginBottom: '30px' }}>
          <h3>Mobile (320px)</h3>
          <div style={{ width: '320px', maxWidth: '100%' }}>
            <Story />
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3>Tablet (768px)</h3>
          <div style={{ width: '768px', maxWidth: '100%' }}>
            <Story />
          </div>
        </div>

        <div>
          <h3>Desktop (1200px)</h3>
          <div style={{ width: '1200px', maxWidth: '100%' }}>
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Shows how the magnifier responds to different container sizes. Responsive sizing works automatically.',
      },
    },
  },
}

/**
 * With Callback Integration
 * Demonstrates the getMagnifier callback prop
 */
export const WithCallback: StoryConfig = {
  args: {
    imageUrl: SAMPLE_IMAGE,
    imageAltText: 'Product image with callback',
    zoomSize: 2,
  },
  decorators: [
    (Story: StoryFn) => {
      const [callbackInfo, setCallbackInfo] = useState<string>('')

      const handleMagnifier = (container: HTMLDivElement | null) => {
        if (container) {
          setCallbackInfo(
            `✅ Magnifier initialized! Container dimensions: ${container.offsetWidth}x${container.offsetHeight}px`
          )
        }
      }

      return (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <ReactMagnifier
              {...(Story.args as any)}
              getMagnifier={handleMagnifier}
            />
          </div>

          {callbackInfo && (
            <div
              style={{
                padding: '15px',
                backgroundColor: '#dcfce7',
                border: '1px solid #86efac',
                borderRadius: '8px',
                color: '#166534',
              }}
            >
              <strong>Callback Info:</strong> {callbackInfo}
            </div>
          )}
        </div>
      )
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the getMagnifier callback prop, which is called when the magnifier container is ready.',
      },
    },
  },
}

/**
 * Various Color Schemes
 */
export const ColorSchemes: StoryConfig = {
  render: () => {
    const schemes = [
      {
        name: 'Classic Black',
        borderColor: '#000000',
        shadow: true,
      },
      {
        name: 'Modern Blue',
        borderColor: '#3b82f6',
        shadow: true,
      },
      {
        name: 'Vibrant Red',
        borderColor: '#ef4444',
        shadow: true,
      },
      {
        name: 'Elegant Gold',
        borderColor: '#d97706',
        shadow: true,
      },
    ]

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {schemes.map((scheme) => (
          <div key={scheme.name}>
            <h4 style={{ marginBottom: '10px' }}>{scheme.name}</h4>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <ReactMagnifier
                imageUrl={SAMPLE_IMAGE}
                imageAltText={scheme.name}
                magnifierBorderColor={scheme.borderColor}
                magnifierBorderWidth={2}
                magnifierShadow={scheme.shadow}
                zoomSize={2}
              />
            </div>
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Showcase different color schemes for the magnifier border to match various design systems.',
      },
    },
  },
}
