# Cypress Page Object Model (POM) Guide

## **Overview**
The Page Object Model (POM) is a design pattern that enhances test maintenance and reduces code duplication by separating page-specific actions and selectors from test logic.

---
## **Folder Structure**
```
cypress/
  e2e/
    POM/
      pages/
        loginpage.js
      login.cy.js
      login.feature
```
> **Note:**  
> This example uses a dedicated `POM` folder inside `e2e`, but you can organize your page objects directly within the `e2e` directory or any structure that fits your project.

---
## **Benefits**
- **Maintainability:** Changes in UI only require updates in page objects.
- **Reusability:** Page objects can be reused across multiple tests.
- **Readability:** Tests are easier to read and understand.

---
## **How to Implement**
1. **Create a `pages` folder** for your page objects.
2. **Define a class for each page** with methods for actions and selectors.
3. **Import and use page objects** in your test files or step definitions.

---
## **Example Workflow**
- Write your feature files using Gherkin syntax.
- Implement step definitions that use page object methods.
- Keep all selectors and UI actions inside page object classes.

---
> **Tip:**  
> Always update your page objects when the UI changes to keep your tests stable.