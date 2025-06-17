/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import wyw from "@wyw-in-js/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wyw({
      include: ["**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './.storybook/vitest.setup.ts', // Ensure setup file is referenced
  },
});
