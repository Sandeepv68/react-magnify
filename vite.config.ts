import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
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
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'styled-components',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
          'react/jsx-dev-runtime': 'ReactJSXDevRuntime',
          'styled-components': 'styled',
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
