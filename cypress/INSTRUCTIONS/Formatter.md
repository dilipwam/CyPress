# Configure Linter and Prettier (Parser and Formatter)

While users can follow best practices for coding, simple mistakes may still occur. This is where **Linter** and **Prettier** come into play.  
- **Linter** scans scripts to find common mistakes and flags them for resolution.
- **Prettier** handles code formatting automatically.

---

## 1. Dependencies

Use the terminal and run the following commands in your project root:

```bash
npm install --save-dev eslint prettier eslint-plugin-cypress eslint-config-prettier eslint-plugin-prettier
```

---

## 2. ESLint Configuration

Initialize ESLint with:

```bash
npx eslint --init
```

Typical answers for a Cypress setup:
- **How would you like to use ESLint?** → "To check syntax, find problems, and enforce code style"
- **Type of modules?** → "JavaScript modules (import/export)"
- **Framework?** → "None of these" (unless using React/Vue)
- **TypeScript?** → "No" (unless using TypeScript)
- **Where does your code run?** → ✅ Node, ✅ Browser
- **Format?** → Choose your preference (e.g., JSON or JavaScript)

If not already exists, create a file named `.eslintrc` in the root folder and add:

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

---

## 3. Prettier Configuration

If not already exists, create a file named `.prettierrc` in the root folder and add:

```javascript
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

---

## 4. Prettier Ignore Configuration

If not already exists, create a file named `.prettierignore` in the root folder and add:

```bash
.vs
node_modules
dist
cypress/reports
cypress/screenshots
cypress/videos
```

---

## 5. Update package.json Scripts

Add or update the following scripts in your `package.json`:

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

---

## 6. Verification

Run the following scripts in your terminal:

```bash
npm run lint     # Check code quality
npm run format   # Auto-format with Prettier
```