const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './tests',

  timeout: 30000,

  use: {
    headless: false,

    viewport: {
      width: 1920,
      height: 1080,
    },

    screenshot: 'only-on-failure',

    video: 'on',

    trace: 'retain-on-failure',
  },

  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright'],
  ],

});