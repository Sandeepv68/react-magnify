import { createRoot } from 'react-dom/client';
import './index.css';
import ReactMagnifier from './ReactMagnifier/ReactMagnifier';

const SAMPLE_IMAGE = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80';

const App = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>React Magnifier v1.0.0 Feature Demo</h1>
        <p>A modern, accessible image magnification component for React 19</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
        {/* Basic Example */}
        <section>
          <h3>1. Basic Usage</h3>
          <p>Default settings (2x zoom, 100x100px square glass)</p>
          <ReactMagnifier 
            imageUrl={SAMPLE_IMAGE}
            imageWidth={400}
            imageHeight={300}
          />
        </section>

        {/* High Zoom & Large Circular Glass */}
        <section>
          <h3>2. High Zoom & Circular Glass</h3>
          <p>5x zoom, 200x200px circular glass with custom border</p>
          <ReactMagnifier 
            imageUrl={SAMPLE_IMAGE}
            imageWidth={400}
            imageHeight={300}
            zoomSize={5}
            magnifierWidth={200}
            magnifierHeight={200}
            magnifierRadius={50}
            magnifierBorderColor="#007bff"
            magnifierBorderWidth={4}
          />
        </section>

        {/* Custom Border & No Shadow */}
        <section>
          <h3>3. Dashed Border & No Shadow</h3>
          <p>Dashed border, no shadow effect</p>
          <ReactMagnifier 
            imageUrl={SAMPLE_IMAGE}
            imageWidth={400}
            imageHeight={300}
            magnifierBorderStyle="dashed"
            magnifierBorderColor="#28a745"
            magnifierShadow={false}
          />
        </section>

        {/* Custom Cursor & Different Shape */}
        <section>
          <h3>4. Custom Cursor & Rectangular Shape</h3>
          <p>Crosshair cursor, 150x100px glass with slight radius</p>
          <ReactMagnifier 
            imageUrl={SAMPLE_IMAGE}
            imageWidth={400}
            imageHeight={300}
            cursor="crosshair"
            magnifierWidth={150}
            magnifierHeight={100}
            magnifierRadius={10}
          />
        </section>

        {/* Custom Styling Classes */}
        <section>
          <h3>5. Custom CSS Classes</h3>
          <p>Applying custom styles via props</p>
          <ReactMagnifier 
            imageUrl={SAMPLE_IMAGE}
            imageWidth={400}
            imageHeight={300}
            customContainerStyles="custom-magnifier-container"
            customImgStyles="custom-magnifier-image"
          />
        </section>

        {/* Functional Callbacks */}
        <section>
          <h3>6. Functional Callbacks</h3>
          <p>Logging to console on initialization and interactions</p>
          <div id="callback-example">
            <ReactMagnifier 
              imageUrl={SAMPLE_IMAGE}
              imageWidth={400}
              imageHeight={300}
              getMagnifier={(container) => {
                if (container) {
                   console.log('Magnifier Container Access:', container);
                   container.addEventListener('magnifier-moved', (e) => {
                     console.log('Magnifier moving:', e);
                   });
                }
              }}
            />
          </div>
        </section>
      </div>

      <footer style={{ marginTop: '60px', textAlign: 'center', color: '#666' }}>
        <p>Built with React 19, TypeScript 5.3 and Vite 5</p>
        <p>Use Arrow Keys to move the magnifier when active, and Escape to close.</p>
      </footer>

      <style>{`
        .custom-magnifier-container {
          border: 2px solid #333;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        .custom-magnifier-image {
          filter: grayscale(0.5);
          transition: filter 0.3s;
        }
        .custom-magnifier-container:hover .custom-magnifier-image {
          filter: grayscale(0);
        }
        section {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        h3 {
          margin-top: 0;
          color: #333;
        }
      `}</style>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

