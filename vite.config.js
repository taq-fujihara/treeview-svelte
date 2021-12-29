import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      // entry: path.resolve(__dirname, 'src/lib/main.js'),
      entry: 'src/lib/main.js',
      name: 'TreeView',
      fileName: format => `treeview.${format}.js`,
    },
  },
})
