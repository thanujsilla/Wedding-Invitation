import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// ▼▼ EDIT ONCE: the final public address of your deployed invitation (no trailing slash).
// Link previews (WhatsApp, Instagram…) need the FULL https address of the preview image.
const SITE_URL = 'https://wedding-invitation-dun-seven.vercel.app'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'site-url',
      transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', SITE_URL),
    },
  ],
})
