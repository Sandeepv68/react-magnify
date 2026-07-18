// This is the example demo app entry point
// In production, the library is built from src/export.tsx

// @ts-ignore - CSS imports are valid in Vite, TypeScript doesn't have built-in support
import './index.css';
import ReactMagnifier from './ReactMagnifier/ReactMagnifier';

function showEvent(data: HTMLDivElement | null): void {
  if (data) {
    data.addEventListener('magnifier-initialized', (e): void => {
      console.log('Magnifier initialized:', e);
    });
  }
}

// Initialize app after DOM is ready
async function initApp() {
  const root = document.getElementById('root');
  if (root) {
    const { createRoot } = await import('react-dom/client');
    const reactRoot = createRoot(root);
    
    reactRoot.render(
      <ReactMagnifier
        zoomSize={3}
        imageHeight={400}
        imageWidth={600}
        magnifierHeight={200}
        magnifierWidth={200}
        magnifierRadius={50}
        magnifierBorderColor="white"
        magnifierBorderStyle="solid"
        magnifierBorderWidth={2}
        cursor="none"
        imageUrl="https://images.unsplash.com/photo-1578663248901-198b64da244e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        getMagnifier={showEvent}
        customImgStyles="myClass"
        customContainerStyles="aClass"
      />
    );
  }
}

initApp().catch(console.error);
