# Cypress Parallel Execution Guide

## **Parallel Execution in Multiple Browsers (Local)**

You can run Cypress tests in multiple browsers at the same time on your local machine by leveraging npm scripts and the `npm-run-all` package.

### **Setup**

1. **Install npm-run-all**  
   Run the following command in your project root:
   ```bash
   npm install --save-dev npm-run-all
   ```

2. **Add Scripts to package.json**  
   Add these scripts to your `package.json`:
   ```json
   "scripts": {
     "cy:chrome": "npx cypress run --browser chrome",
     "cy:edge": "npx cypress run --browser edge",
     "cy:firefox": "npx cypress run --browser firefox",
     "cy:all": "npm-run-all --parallel cy:chrome cy:edge cy:firefox"
   }
   ```

### **Run Tests in Parallel**

To execute your tests in Chrome, Edge, and Firefox simultaneously, run:
```bash
npm run cy:all
```

Each browser will run in its own process, and results will be shown separately.

---

> **Note:**  
> For true parallelization and result merging, consider using the [Cypress Dashboard](https://docs.cypress.io/guides/cloud/projects) with CI/CD pipelines.

---

## **References**
- [Cypress Docs: Running tests in browsers](https://docs.cypress.io/guides/guides/cross-browser-testing)
- [npm-run-all Documentation](https://www.npmjs.com/package/npm-run-all)
