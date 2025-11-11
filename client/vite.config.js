import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
 plugins: [
 tailwindcss({
 theme: {
 extend: {
 colors: {

 primary: '#4F46E5', // This is the blue from your images
 }
 }
 }
 }),
 react()
 ],
})