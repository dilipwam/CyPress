{
  // Basic User Info
  "name": "cypress",
  "version": "1.0.0",
  "main": "index.js",
  "keywords": [
    "Cypress",
    "Cucumber",
    "Template"
  ],

  // Basic Author and License info
  "author": "DILIP K M",
  "license": "ISC",
  "description": "Cypress with Cucumber Template for Test Engineers",
  "watchForFileChanges": "false",
  
  // Specify Your Custom Scripts Here
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  
  // DevDependencies -- Better Left Untouched.
  "devDependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^21.0.2",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.3",
    "cypress": "^13.15.2",
    "esbuild": "^0.24.0"
  },
  
  // Your Git Repo
  "repository": {
    "type": "git",
    "url": "https://github.com/dilipwam/CyPress"
  },
  
  //Modify, if you want to use different step definition folders
  "stepDefinitions": [
    "cypress/e2e/[filepath]/**/*.{js,ts}",
    "cypress/e2e/[filepath].{js,ts}",
    "cypress/support/step_definitions/**/*.{js,ts}"
  ]
}