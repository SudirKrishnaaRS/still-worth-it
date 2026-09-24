import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // react() lets Vitest transform JSX/TSX the same way Next's build does.
  plugins: [react()],
  resolve: {
    // Native Vite support for tsconfig's "paths" (our "@/*" alias) —
    // no need for the separate vite-tsconfig-paths plugin anymore.
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
