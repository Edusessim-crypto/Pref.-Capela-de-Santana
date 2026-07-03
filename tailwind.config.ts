import type { Config } from "tailwindcss";

/**
 * Tailwind v4 reads design tokens from `@theme` in src/app/globals.css.
 * This file exists for editor tooling/content-path awareness only.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
};

export default config;
