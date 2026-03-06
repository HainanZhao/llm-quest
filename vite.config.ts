import { defineConfig } from 'vite';

export default defineConfig({
  base: '/llm-quest-hainan-zhao-f7fa2ad3cad2ca67066b172ca946f7fa4063d0f1c/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
