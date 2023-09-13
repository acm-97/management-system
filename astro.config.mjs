import {defineConfig} from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import nodejs from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'hybrid',
  adapter: nodejs({
    mode: 'standalone',
  }),
})
