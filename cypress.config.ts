import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
    },
    testIsolation: false,
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
  chromeWebSecurity: false,
  video: false,
  screenshotOnRunFailure: false,
  pageLoadTimeout: 30000,
  requestTimeout: 5000,
  responseTimeout: 5000,
});