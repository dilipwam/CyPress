const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin =
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 120000,

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    watchForFileChanges: false,

    specPattern: ['cypress/e2e/**/*.feature', 'cypress/e2e/**/*.cy.js'],
    stepDefinitions: [
      'cypress/e2e/[filepath]/**/*.{js,ts}',
      'cypress/e2e/[filepath].{js,ts}',
      'cypress/support/step_definitions/**/*.{js,ts}',
    ],

    setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on('file:preprocessor', bundler);
      addCucumberPreprocessorPlugin(on, config);
      return config;
    },
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
