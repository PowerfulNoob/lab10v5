import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
    base: '/lab10v5/',
    plugins: [
        tailwindcss(),
    ],
})
