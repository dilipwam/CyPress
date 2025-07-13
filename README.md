# SET UP CYPRESS WITH BDD (With Explanations) 
# By **DILIP K M** | [LinkedIn](https://www.linkedin.com/in/dmahato/) | [GitHub](https://github.com/dilipwam) 

---
Following Instruction is targetted to users with Windows and using NPM.
Basic instructions will remain same, just change the syntax as per your need
---

## 1. Pre Requisite (SOFTWARES)

SKIP this part, if NodeJS and any IDE is already installed.

### 1.1 Install Node JS

Make sure NodeJS is installed on your machine. If not navigate to [NodeJS](https://nodejs.org/en/download) to download the package from official site and install it.

### 1.2 Install Visual Studio CODE (or any other IDE)

Similarly get VS Code installed on your machine, bay getting the package file from [VsCode](https://code.visualstudio.com/download).

### 1.3 Install Extensions for VS code

While extensions are always optionsal, they make life lot easy. Also as VS code does not bundle any specific language support it can be helpful to get the relevant extensions. I prefer the following two extentions over others.

- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) -- For text formatting
- [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) -- For Cucumber Syntax support

## 2. Get the prebuilt Files from the Repo (CLONE) and Start using it.

It is pretty easy to clone the repository and you need not worry about configurations as it is tested and certified. All you need to do is, copy the GIT repo URL for [CyPress](https://github.com/dilipwam/CyPress.git) and use it to clone. Or use any other way to clone that you know of.
OR download as compressed file and extract in your target directory.
ALTERNATIVELY, use the CLI and use the following command in your target directory.
```bash
gh repo clone dilipwam/CyPress
```

Once you have cloned the file and it is ready, open the terminal or command prompt in the target folder and run the folloeing commands
```bash
npm install
npm run cy:open
```

It will download and install all the dependencies, and start the project. If everything is okay you will see the cypress window, and some sample scripts.

If it is the first time you are running cypress with a cloned repository, you may face some excptions with execution permission, and the install command will fail. In that case, run the following script with admin permission. To validate the access permissions, open the powershell or terminal as a admin.
```dos
Get-ExecutionPolicy
```
Thid will most likely return, "RESTRICTED". To allow script execution, run: >>  
```dos
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

This command changes the policy to allow locally created scripts to run, while requiring a digital signature for scripts downloaded from the internet.
Confirm the Change: You can verify the new policy by running:
```dos
 Get-ExecutionPolicy -List
```

Ensure that the CurrentUser scope is set to RemoteSigned

## 3. MANUAL installation (LEARN with basic Troubleshooting)

### 3.1 Set up Cypress Project

Once the required softwares are installed, open terminal or command prompt in the target directory. Remember this will be the root folder for the cypress project. Run the following two commands.
```bash
npm init -y
npm install cypress --save-dev
```

The First line of command initializes the node in the target folder and creates the package.json file.
The Second line of command installs the cypress as a dev dependency in the project folder.
Open package.json file and add the _"cy:open": "cypress open"_ under _scripts_. This way you will have a custom command to open the cypress window; and avoid possible conflict while working in other systems. The file will look something like this.

```javascript
{
  ...
  "scripts":{
    ...
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    ...
  }
  ...}
```

Once the files are ready, go ahead and open the Cypress Window by running

```bash
npm run cy:open
```

At this stage, Cypress will open and prompt to choose, project type.

- Test Engineers should always pock "e2e" testing.
  And in next step it will ask to select a browser.
- Pick any browser of your choice and continue.
  In next step it will ask to pick examples or blank spec.
- select create spec.
  If you follow the wizard, it will create a new spec file and run it.
  If you have selected demos, it would add the demo files with _e2e_ folder and open in the test runner. You can click on any example and it will run.
  This will confirm that the cypress is installed properly.
  For Simple Cypress Project, this set up is enough and you can start coding.

### 3.2 Sample Test Scripts for Testing

While this step is not needed and can be done later, you need to add some test files to your project folder to check that your configuration is working.

#### 3.2.1 Simple cypress Test File

`cypress/e2e/spec.cy.js`

```javascript
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
  });
});
```

#### 3.2.2 Feature file for BDD

`cypress/e2e/duckduckgo.feature`

```gherkin
Feature: duckduckgo.com
  Scenario: visiting the frontpage
    When I visit duckduckgo.com
    Then I should see a search bar
```

#### 3.2.3 Spec Definition file for BDD

`cypress/e2e/duckduckgo.js`

```javascript
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I visit duckduckgo.com', () => {
  cy.visit('https://www.duckduckgo.com');
});

Then('I should see a search bar', () => {
  cy.get('input#searchbox_input')
    .should('be.visible')
    .should('have.attr', 'aria-label', 'Search with DuckDuckGo')
    .should('have.attr', 'placeholder', 'Search without being tracked');
});
```

### 3.3 CYPRESS Configurations:

Depending on which version of cypress someone started scripting, the configuration may be written differently and could be scatterred.
While the older version of cypress were forgiving, the recent ones are a bit sctrict.

**Use the following guideline for better compatibility**

- DO NOT write any configurations in _cypress.json_. Move all the configuration information from _cypress.json_ to _cypress.config.js_
- depending on your preference you may use javascript or typescript. For this example I am using javascripts and hence the extension to _cypress.config_ is _.js_ . If you are using typescript then update the extension to _.ts_ and change all syntax to typescript format.
- Depending on your project requirement, you may need to play around with the configuration as needed.
- Use _defineconfig_ block to include all the configuration. It will be applied to all.
  - If you have e2e testing specific configurations, add them to _e2e_ block within _defineconfig_.
  - If you have component testing specific configurations, add them to _component_ block within _defineconfig_.
- **_If it is working then do not update, unless needed._**

#### 3.3.1 CUCUMBER PREPROCESSOR

Follow this section to configure BDD / Cucumber for your project

##### 3.3.1.1 - Install Dependencies

Use the terminal window and run the following commands within the root directory of the project folder.

```bash
npm install @badeball/cypress-cucumber-preprocessor @bahmutov/cypress-esbuild-preprocessor esbuild --save-dev
```

##### 3.3.1.2 - Configuration

Add following lines to your _çypress.config.js_ file. If you are using typescript, follow the _.ts_ specific syntax. Everything else will be same.
`cypress.config.js`

```javascript
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin =
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
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

Notes:

- SpecPattern - Gives the test scpcification files
- Stepdefinitions - Tells where to pick the Test Definitions for the spec.
- You can alway specify multiple types and multiple locations for both pattern as well as definitions.
- esbuild - Improves and Extends the capabilities

**Explanations:**

- **_SpecPattern_** tells cypress to read the test spec files within all folders and sub folders within e2e folder. It also says the both _.cy.js_ and _.feature_ files are to be considered.
- **_SpecDefinitions_** tells cypress that
  1. The test definitions files are stored within the same folder as the feature files with same name. Second line tells
  2. The test definitions files are stored within a folder of same name as the feature file. In this case, the specdefinition file need not share same name as the feature file.
  3. The test definition files are stored within *Spec_Definitions* folder. In this case all the spec files present in this folder will be shared by all spec files, and will take precedence. Hence be careful about what files are placed in this locations.

##### 3.3.1.3 - BDD File Structure
Following is a sample file structure which can be used. The *SpecPattern* and *SpecDefinitions* attributes in the *cypress.config.js* governs it. You can modify it as per your need.
```
+ CYPRESS
|--- + e2e
|    |--- MyTest1.cy.js
|    |--- + Test2
|    |    |--- MyTest2.cy.js
|    |
|    |--- feature1.feature
|    |--- feature1.js
|    |
|    |--- +- MyFeatureTest
|    |    |--- feature2.feature
|    |    |--- feature2.js
|    |
|    |--- feature3.feature
|    |--- + feature3
|    |    |--- SpecDefForFeature3.js
|    |
|    |--- feature4.feature
|
|--- +- Support
|    |--- + step_definitions
|         |--- GlobalSpecDefinitions.js
```

##### 3.3.1.4 - Validation
In the terminal run the script

```bash
npm run cy:open
```

- This will open the Cypress test window.
- Proceed by selecting e2e testing and any preferred browser.
- You will be able to see the test spec files, based on the cypress configuration.
- If you followed the steps in the example, you will see both _.feature_ as well as _.cy.js_ files.
- Clicking any one of those, will run the test as per the script.
- In case any issues are encountered whiile running feature files, _pause_ and _check & Recheck the configurations_.

#### 3.3.2 Configure Reports (HTML with MochAwesome)

While cypress supports multiple reporting, the MochAwesome HTML stands out. Follow this section to configure Mocha Reports for your project

##### 3.3.2.1 - Dependencies

Use the terminal window and run the following commands within the root directory of the project folder.

```bash
npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev
```

##### 3.3.2.2 - Configuration

Add following lines to your _çypress.config.js_ file. Make sure you place it inside e2e block for e2e testing. If you are using typescript, follow the _.ts_ specific syntax. Everything else will be same.

```javascript
...
  reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: false,
      json: true,
    },
    ---
```

Once done, the `cypress.config.js` file will appear like this

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

Once done, the framework is ready to generate the HTML report making use of the generated mocha reports.
TO generate the report, add the following script to the scripts section within _package.json_ file.

```javascript
"clean:reports": "rmdir /S /Q  cypress\\reports && mkdir cypress\\reports && mkdir cypress\\reports\\mochareports",
"combine-reports": "mochawesome-merge cypress/reports/*.json > cypress/reports/mochareports/report.json",
"pretest": "npm run clean:reports",

"generate-report": "marge cypress/reports/mochareports/report.json -f report -o cypress/reports/mochareports/",
"posttest": "npm run combine-reports && npm run generate-report",

"cy:run": "cypress run",
"cy:test": "npm run pretest && npm run cy:run && npm run posttest"
```

**Explanations:**

- **_PreTest_** clears any old files in the reporting folder and prepares the folders in case not there.
- **_PostTest_** Merges the test reports into single HTML file and places it in the defined location.
- You will need to include these two scripts to all your rn commands where reports are required.

The 'package.json' will look like this after the changes.

```javascript
{
...
  "scripts": {
    "clean:reports": "rmdir /S /Q  cypress\\reports && mkdir cypress\\reports && mkdir cypress\\reports\\mochareports",
    "combine-reports": "mochawesome-merge cypress/reports/*.json > cypress/reports/mochareports/report.json",
    "generate-report": "marge cypress/reports/mochareports/report.json -f report -o cypress/reports/mochareports/",
    "pretest": "npm run clean:reports",
    "posttest": "npm run combine-reports && npm run generate-report",
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "cy:test": "npm run pretest && npm run cy:run && npm run posttest"
  },
  ...
}
```

##### 3.3.2.3 - Verification

In the terminal run the following script.

```bash
npm run cy:test
```

This will execute all the scripts in the console. It will show the status of all the script execution. Later a HTML file will be generated within the mochareports fodlder.



#### 3.3.3 Configure Linter and Prettier (parser and Formatter)

While User can follow best practices for coding, at times they will missout simple things. This is where ***Linter*** and ***Prettier*** come into picture. Linter is a parser, which scans the script to find common mistakes and flags them and user can later resolve them. On the otherhand Prettier takes care of the fomatting.

##### 3.3.3.1 - Dependencies

Use the terminal window and run the following commands within the root directory of the project folder.

```bash
npm install --save-dev eslint prettier eslint-plugin-cypress eslint-config-prettier eslint-plugin-prettier
```

##### 3.3.3.2 - Configuration

You can configure the ESLint using the following command
```bash
npx eslint --init
```
You’ll be asked some questions — for a Cypress setup, a typical config might look like:
> How would you like to use ESLint? → "To check syntax, find problems, and enforce code style"
> What type of modules? → "JavaScript modules (import/export)"
> Framework? → "None of these" (unless you're using React/Vue)
> TypeScript? → "No" (unless you’re using TypeScript)
> Where does your code run? → ✅ Node, ✅ Browser
> Format? → Choose your preference (e.g., JSON or JavaScript)


if not already exists, create a file named  _.eslintrc_ in the root folder and add the following

```javascript
{
  "env": {
    "browser": true,
    "cypress/globals": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:cypress/recommended", "plugin:prettier/recommended"],
  "plugins": ["cypress", "prettier"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
// Add custom rules here
 "prettier/prettier": "error"
  }
}
```


if not already exists, create a file named  _.prettierrc_ in the root folder and add the following

```javascript
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

if not already exists, create a file named  _.prettierignore_ in the root folder and add the following

```bash
.vs
node_modules
dist
cypress/reports
cypress/screenshots
cypress/videos
```
Once all previous steps are done update the _package.json_ file with custom scripts to invoke ESLint and Prettier

```javascript
{
...
"scripts": {
  "lint": "eslint cypress/",
  "format": "prettier --write \"cypress/**/*.{js,ts,json}\""
}
...
}
```

##### 3.3.3.3 - Verification

In the terminal run the following script.

```bash
npm run lint     # Check code quality
npm run format   # Auto-format with Prettier
```


#### 3.3.4 Configure Reading Secrets from Azure Keyvault


##### 3.3.4.1. Install Dependencies

If you haven’t already, install the Azure SDKs required for this:
```bash
npm install @azure/identity @azure/keyvault-secrets dotenv
```

##### 3.3.4.2 - Configuration / Local Dev
File 1: Store the Azure credentials in .env file.
_This file needs to be in **.gitignore** ._
Store your Azure credentials securely. Your .env might look like:
```env
AZURE_CLIENT_ID=xxxxxxxx
AZURE_TENANT_ID=xxxxxxxx
AZURE_CLIENT_SECRET=xxxxxxxx
KEY_VAULT_NAME=your-keyvault-name
```
Note: You can also use _az login_ if you don't want to hardcode credentials — the SDK will pick that up with DefaultAzureCredential.

File 2: Create a new file _.fetchSecrets.js_
```js
require('dotenv').config();
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');
const fs = require('fs');

// following values will be picked from .env
const vaultName = process.env.KEY_VAULT_NAME;
const vaultUrl = `https://${vaultName}.vault.azure.net`;

// Initiating Connection
const credential = new DefaultAzureCredential();
const client = new SecretClient(vaultUrl, credential);

// List the secrets you want to fetch
const secretsToFetch = ['KEYVAULT-NAME1', 'KEYVAULT-NAME2','KEYVAULT-NAME3','...];

// Method to Fetch secrets
async function main() {
  const results = {};
  for (const name of secretsToFetch) {
    const secret = await client.getSecret(name);
    results[`CYPRESS_${name}`] = secret.value;
    console.log('**** KEY VAULT ***** ', name , '   =   ', secret.value)
}

  // Write secrets to .cypress.env.json (optional)
  // This File must be added to **.GitIgnore**
  fs.writeFileSync('cypress.env.json', JSON.stringify(results, null, 2));
  console.log('✅ Cypress secrets saved to cypress.env.json');
}

main().catch((err) => {
  console.error('❌ Failed to fetch secrets:', err);
});
```
To valdiate the method, run the following command. It will show the Secrets and values it is fetching, and also will create a file _cypress.env.json_. For security reason this file must be added to **.GitIgnore**.
```bash
node fetchSecrets.js
```
Note: Due to security constraints, we cannot call keyvault from browser, and hence need to be exeuted before running cypress. Later we can use cypress to read the secret values from the created file.

```env
{
  "CYPRESS_KEYVAULT-NAME1": "value1",
  "CYPRESS_KEYVAULT-NAME2": "value2",
  "CYPRESS_KEYVAULT-NAME3": "value3",
  ...
}
```

To access the values in cypress project, call this file by adding the follwoign in the test file. *CYPRESS_* prefix in the environment file will be automatically stripped by Cypress.

```js
const kvariable1 = Cypress.env('EYVAULT-NAME1');
const kvariable2 = Cypress.env('EYVAULT-NAME2');
const kvariable3 = Cypress.env('EYVAULT-NAME3');
```

To run cypress, use the following script.
```bash
node fetchSecrets.js
npx cypress open
```
##### 3.3.4.2 - Configuration / CI CD pipeline
File 1: Store the Azure credentials in .env file.
_This file needs to be in **.gitignore** ._
Store your Azure credentials securely. Your .env might look like:
```env
AZURE_CLIENT_ID=xxxxxxxx
AZURE_TENANT_ID=xxxxxxxx
AZURE_CLIENT_SECRET=xxxxxxxx
KEY_VAULT_NAME=your-keyvault-name
```
Note: You can also use _az login_ if you don't want to hardcode credentials — the SDK will pick that up with DefaultAzureCredential.

File 2: Create a new file _.fetchSecrets.js_
```js
require('dotenv').config();
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');
const fs = require('fs');

// following values will be picked from .env
const vaultName = process.env.KEY_VAULT_NAME;
const vaultUrl = `https://${vaultName}.vault.azure.net`;

// Initiating Connection
const credential = new DefaultAzureCredential();
const client = new SecretClient(vaultUrl, credential);

// List the secrets you want to fetch
const secretsToFetch = ['KEYVAULT-NAME1', 'KEYVAULT-NAME2','KEYVAULT-NAME3','...];

// Method to Fetch secrets
async function main() {
  const results = {};
  for (const name of secretsToFetch) {
    const secret = await client.getSecret(name);
    results[`CYPRESS_${name}`] = secret.value;
    console.log('**** KEY VAULT ***** ', name , '   =   ', secret.value)
}

  // Write secrets to .cypress.env.json (optional)
  // This File must be added to **.GitIgnore**
  fs.writeFileSync('cypress.env.json', JSON.stringify(results, null, 2));
  console.log('✅ Cypress secrets saved to cypress.env.json');
}

main().catch((err) => {
  console.error('❌ Failed to fetch secrets:', err);
});
```
To valdiate the method, run the following command. It will show the Secrets and values it is fetching, and also will create a file _cypress.env.json_. For security reason this file must be added to **.GitIgnore**.
```bash
node fetchSecrets.js
```
Note: Due to security constraints, we cannot call keyvault from browser, and hence need to be exeuted before running cypress. Later we can use cypress to read the secret values from the created file.

```env
{
  "CYPRESS_KEYVAULT-NAME1": "value1",
  "CYPRESS_KEYVAULT-NAME2": "value2",
  "CYPRESS_KEYVAULT-NAME3": "value3",
  ...
}
```

To access the values in cypress project, call this file by adding the follwoign in the test file. *CYPRESS_* prefix in the environment file will be automatically stripped by Cypress.

```js
const kvariable1 = Cypress.env('EYVAULT-NAME1');
const kvariable2 = Cypress.env('EYVAULT-NAME2');
const kvariable3 = Cypress.env('EYVAULT-NAME3');
```

To run cypress, use the following script.
```bash
node fetchSecrets.js
npx cypress open
```

---

> **Note:**  
> For Page Object Model (POM) implementation details and best practices, refer to the `POM` folder and its `ReadMe.md` guide inside `cypress/e2e/POM`.




## THANK YOU 🙂
