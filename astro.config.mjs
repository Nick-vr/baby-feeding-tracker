// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import AstroPWA from '@vite-pwa/astro';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    // Enable Svelte to support Svelte components.
    integrations: [svelte(), AstroPWA({
  registerType: 'auto',
    manifest: {
      name: 'Baby Feeding Tracker',
      short_name: 'Feeding Tracker',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
}), icon()],
});