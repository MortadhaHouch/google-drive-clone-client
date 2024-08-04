import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
import legacy from '@vitejs/plugin-legacy';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    commonjs(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/*',
          dest: 'assets/'
        }
      ]
    }),
  ],
  assetsInclude: ['**/*.docx', '**/*.pptx',"**/*.xls","**/*.xlsx"]
});
