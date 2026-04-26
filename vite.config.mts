import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set `base` to the repository subpath for GitHub Pages.
// Update this value if you rename the repository.
export default defineConfig({
  base: '/is117ScrollyTelling/',
  plugins: [react()],
})

