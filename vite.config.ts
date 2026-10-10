/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves the site from /react-shapely/; the dev server stays at /
  base: command === 'build' ? '/react-shapely/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
}))
