# SET UP CYPRESS WITH BDD (With Explanations) 
## By **DILIP K M** | [LinkedIn](https://www.linkedin.com/in/dkumar) | [GitHub](https://github.com/dilipwam) 

---
Following Instruction in targetted to users with Windows and using NPM.
Basic instructions will remain same, just change the syntax as per need
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
```
gh repo clone dilipwam/CyPress
```
Once you have cloned the file and it is ready, open the terminal or command prompt in the target folder and run the folloeing commands
```
npm install
npm run cy:open
```
It will download and install all the dependencies, and start the project. If everything is okay you will see the cypress window, and some sample scripts.

If it is the first time you are running cypress with a cloned repository, you may face some excptions with execution permission, and the install command will fail. In that case, run the following script with admin permission. To validate the access permissions, open the powershell or terminal as a admin.
```
Get-ExecutionPolicy
```
Thid will most likely return, "RESTRICTED". To allow script execution, run: >>  
```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
This command changes the policy to allow locally created scripts to run, while requiring a digital signature for scripts downloaded from the internet.
Confirm the Change: You can verify the new policy by running:
```
 Get-ExecutionPolicy -List
```
 Ensure that the CurrentUser scope is set to RemoteSigned


## 3. MANUAL installation (LEARN with basic Troubleshooting)
### 3.1 Set up Cypress Project
Once the required softwares are installed, open terminal or command prompt in the target directory. Remember this will be the root folder for the cypress project. Run the following two commands.
```
npm init -y
npm install cypress --save-dev
```
The First line of command initializes the node in the target folder and creates the package.json file.
The Second line of command installs the cypress as a dev dependency in the project folder.
Open package.json file and add the *"cy:open": "cypress open"* under *scripts*. This way you will have a custom command to open the cypress window; and avoid possible conflict while working in other systems. The file will look something like this.
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
```
npm run cy:open
```
At this stage, Cypress will open and prompt to choose, project type.
>Test Engineers should always pock "e2e" testing.
And in next step it will ask to select a browser.
>Pick any browser of your choice and continue.
In next step it will ask to pick examples or blank spec.
>select create spec.
If you follow the wizard, it will create a new spec file and run it.
If you have selected demos, it would add the demo files with *e2e* folder and open in the test runner. You can click on any example and it will run.
This will confirm that the cypress is installed properly.
For Simple Cypress Project, this set up is enough and you can start coding.

### 3.2 Sample Test Scripts for Testing
While this step is not needed, you need to add some test files to your project folder to check that your scripts are working.

#### 3.2.1 Simple cypress Test File

`cypress/e2e/spec.cy.js`
```javascript
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
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
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I visit duckduckgo.com", () => {
  cy.visit("https://www.duckduckgo.com");
});

Then("I should see a search bar", () => {
  cy.get('input#searchbox_input')
  .should("be.visible")
  .should("have.attr","aria-label","Search with DuckDuckGo")
  .should("have.attr","placeholder","Search without being tracked")
  });
  ```

### 3.3 CYPRESS Configurations:
Depending on which version of cypress someone started scripting, the configuration may be written differently and could be scatterred.
While the older version of cypress were forgiving, the recent ones are a bit sctrict.

**Use the guidelines for better compatibility**
- do not write any configurations in *cypress.json*. Move all the configuration information from *cypress.json* to *cypress.config.js*
- depending on your preference you may use javascript or typescript. For this example I am using javascripts and hence the extension to *cypress.config* is *.js* . If you are using typescript then update the extension to *.ts* and change all syntax to typescript format.
- Depending on your project requirement, you may need to play around with the configuration as needed.
- Use *defineconfig* block to include all the configuration. It will be applied to all.
  - If you have e2e testing specific configurations, add them to *e2e* block within *defineconfig*.
  - If you have component testing specific configurations, add them to *component* block within *defineconfig*.
- If it is working then do not update, unless needed.


#### 3.3.1 CUCUMBER PREPROCESSOR
Follow this section to configure BDD / Cucumber for your project
##### 3.3.1.1 - Install Dependencies
```
npm install @badeball/cypress-cucumber-preprocessor --save-dev
npm install @bahmutov/cypress-esbuild-preprocessor --save-dev
npm install esbuild --save-dev
```

##### 3.3.1.2 - Configuration
`cypress.config.js`
```javascript
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
    require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
    require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const {
    defineConfig
} = require("cypress");

module.exports = defineConfig({
    e2e: {

        specPattern: [
            "cypress/e2e/**/*.feature",
            "cypress/e2e/**/*.cy.js"
        ],
        stepDefinitions: [
            "cypress/e2e/[filepath]/**/*.{js,ts}",
            "cypress/e2e/[filepath].{js,ts}",
            "cypress/support/step_definitions/**/*.{js,ts}",
        ],

        setupNodeEvents(on, config) {
            const bundler = createBundler({
                plugins: [createEsbuildPlugin(config)],
            });

            on("file:preprocessor", bundler);
            addCucumberPreprocessorPlugin(on, config);
            return config;
        },
    },
});
```
-SpecPattern - Tells the test scpcification files
-Stepdefinitions - Tells where to pick the Test Definitions for the spec.
-esbuild - Improves and Extends the capabilities

##### 3.3.1.3 - Validation
In the terminal run the script
```
npm run cy:open
```
- This will open the Cypress test window.
- Proceed by selecting e2e testing and any preferred browser.
- You will be able to see the test spec files, based on the cypress configuration.
- If you followed the steps in the example, you will see both *.feature* as well as *.cy.js* files.
- Clicking any one of those, will run the test as per the script.
- In case any issues are encountered whiile running feature files, *pause* and *check the configurations*.

### 3.4 Configure Reports
While cypress has inbuilt reporting, Follow this section to configure Mochareports for your project
#### 3.4.1 - Dependencies
```
npm install @badeball/cypress-cucumber-preprocessor --save-dev
npm install @bahmutov/cypress-esbuild-preprocessor esbuild --save-dev
npm install esbuild --save-dev
```

#### 3.4.2 - Configuration
```npm
npm install @badeball/cypress-cucumber-preprocessor --save-dev
npm install @bahmutov/cypress-esbuild-preprocessor esbuild --save-dev
npm install esbuild --save-dev
```

`cypress.config.js`

```javascript
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor",
      createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      }));
      preprocessor.addCucumberPreprocessorPlugin(on, config);
      return config;
    },
	specPattern: "**/*.feature",
  },
})

```

## 4. Update "cypress-cucumber-preprocessor" configs (Set step definitions path and make them global)
`package.json`

```javascript
"cypress-cucumber-preprocessor": {
    "step_definitions": "cypress/support/step_definitions/",
    "nonGlobalStepDefinitions": false
  }
```


# THANK YOU 🙂
