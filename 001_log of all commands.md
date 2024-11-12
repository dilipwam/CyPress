// P1
npm init -y
npm install cypress --save-dev
npx cypress open


// P2
cypress.josn >> disable auto rerun >>  "watchForFileChanges": "false",

npm install @badeball/cypress-cucumber-preprocessor --save-dev
npm i -D cypress @bahmutov/cypress-esbuild-preprocessor esbuild

Define step definition in package.json
Update cypress.config.js to enable cucumber and read feature file.

Place the Feature file within e2e folder
place the step definitaion as .ts or .js same folder, or within another folder with same name or within support/step_definition folder.

Note files within step definitions will be used aby all feature files, irrespective of their names.

--------------------------------------------------
cypress>>e2e>>MyTest1.Feature
cypress>>e2e>>MyTest1.js/ts

cypress>>e2e>>MyTest2>>TestName.Feature
cypress>>e2e>>MyTest2>>TestName.js/ts

cypress>>e2e>>MyTest3.Feature
cypress>>e2e>>MyTest3>>xyz.js/ts
-------------------------------------------------------
Files within Step_Definitions will be shared by all tests
-------------------------------------------------------
Cypress>>e2e>>**>>**>>testname.feature
cypress>>support>>step_definitions>>xyz.js/ts


