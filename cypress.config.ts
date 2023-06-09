import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    testIsolation: false,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
});
