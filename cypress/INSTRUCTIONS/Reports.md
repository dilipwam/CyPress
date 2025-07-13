# Configure Reports (HTML with MochAwesome)

Cypress supports multiple reporting options, but MochAwesome HTML reports stand out for their clarity and detail. Follow these steps to configure Mocha Reports for your project.

---

## 1. Install Dependencies

Use the terminal and run the following commands in your project root:

```bash
npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev
```

---

## 2. Cypress Configuration

Add the following lines to your `cypress.config.js` file (inside the `e2e` block for e2e testing):

```javascript
reporter: "mochawesome",
reporterOptions: {
  reportDir: "cypress/reports",
  overwrite: false,
  html: false,
  json: true,
},
```

Your `cypress.config.js` should look like:

```javascript
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin =
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
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
});
```

---

## 3. Add Scripts to package.json

Add or update the following scripts in your `package.json`:

```json
"scripts": {
  "clean:reports": "rmdir /S /Q  cypress\\reports && mkdir cypress\\reports && mkdir cypress\\reports\\mochareports",
  "combine-reports": "mochawesome-merge cypress/reports/*.json > cypress/reports/mochareports/report.json",
  "generate-report": "marge cypress/reports/mochareports/report.json -f report -o cypress/reports/mochareports/",
  "pretest": "npm run clean:reports",
  "posttest": "npm run combine-reports && npm run generate-report",
  "cy:open": "cypress open",
  "cy:run": "cypress run",
  "cy:test": "npm run pretest && npm run cy:run && npm run posttest"
}
```

**Explanations:**
- **pretest**: Clears old files and prepares the reporting folders.
- **posttest**: Merges test reports into a single HTML file and places it in the defined location.
- Include these scripts in all your run commands where reports are required.

---

## 4. Verification

Run the following script in your terminal:

```bash
npm run cy:test
```

This will execute all the scripts, show the status of execution, and generate an HTML report in the `mochareports` folder.

---

## 5. References

- [Mochawesome Documentation](https://github.com/mochawesome/mochawesome)