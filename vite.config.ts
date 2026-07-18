import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/export.tsx'),
      name: 'ReactMagnifier',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') {
          return 'react-magnifier.js';
        }
        return 'react-magnifier.umd.cjs';
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    minify: 'terser',
    target: 'es2015',
  },
  server: {
    open: '/example/index.html',
  },
});
