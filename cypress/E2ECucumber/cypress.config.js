const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return require("./plugins/index.js")(on, config);
    },
    baseUrl: "https://example.cypress.io",
    defaultCommandTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    fixturesFolder: "fixtures",
    specPattern: ["features/*.feature"],
    supportFile: "support/e2e.js",
    pageLoadTimeout: 30000,
    excludeSpecPattern: "*.js",
    retries: {
      runMode: 1,
      openMode: 0,
    },
    env: {

    },
  },
});
