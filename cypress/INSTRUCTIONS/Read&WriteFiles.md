# Configure Reading Secrets from Azure Key Vault

> **Moved to:** `cypress/INSTRUCTIONS/AzureKeyVault.md`

---

## 1. Install Dependencies

If you haven’t already, install the Azure SDKs required for this:

```bash
npm install @azure/identity @azure/keyvault-secrets dotenv
```

---

## 2. Local Development Configuration

### **Step 1: Store Azure Credentials in `.env`**

_This file must be in **.gitignore**._

Example `.env`:
```env
AZURE_CLIENT_ID=xxxxxxxx
AZURE_TENANT_ID=xxxxxxxx
AZURE_CLIENT_SECRET=xxxxxxxx
KEY_VAULT_NAME=your-keyvault-name
```
> You can also use `az login` instead of hardcoding credentials. The SDK will pick that up with `DefaultAzureCredential`.

---

### **Step 2: Create `fetchSecrets.js`**

```js
require('dotenv').config();
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');
const fs = require('fs');

const vaultName = process.env.KEY_VAULT_NAME;
const vaultUrl = `https://${vaultName}.vault.azure.net`;

const credential = new DefaultAzureCredential();
const client = new SecretClient(vaultUrl, credential);

const secretsToFetch = ['KEYVAULT-NAME1', 'KEYVAULT-NAME2', 'KEYVAULT-NAME3', '...'];

async function main() {
  const results = {};
  for (const name of secretsToFetch) {
    const secret = await client.getSecret(name);
    results[`CYPRESS_${name}`] = secret.value;
    console.log('**** KEY VAULT ***** ', name , '   =   ', secret.value)
  }

  // Write secrets to .cypress.env.json (optional)
  // This file must be added to **.gitignore**
  fs.writeFileSync('cypress.env.json', JSON.stringify(results, null, 2));
  console.log('✅ Cypress secrets saved to cypress.env.json');
}

main().catch((err) => {
  console.error('❌ Failed to fetch secrets:', err);
});
```

---

### **Step 3: Validate and Use**

To validate, run:
```bash
node fetchSecrets.js
```
This will show the secrets and values it is fetching, and create a file `cypress.env.json`.  
_For security, this file must be added to **.gitignore**._

Example `cypress.env.json`:
```json
{
  "CYPRESS_KEYVAULT-NAME1": "value1",
  "CYPRESS_KEYVAULT-NAME2": "value2",
  "CYPRESS_KEYVAULT-NAME3": "value3"
}
```

To access the values in Cypress tests:
```js
const kvariable1 = Cypress.env('KEYVAULT-NAME1');
const kvariable2 = Cypress.env('KEYVAULT-NAME2');
const kvariable3 = Cypress.env('KEYVAULT-NAME3');
```
> The `CYPRESS_` prefix will be automatically stripped by Cypress.

To run Cypress with secrets:
```bash
node fetchSecrets.js
npx cypress open
```

---

## 3. CI/CD Pipeline Configuration

Repeat the above steps for your CI/CD pipeline.  
Store Azure credentials in `.env` (must be in **.gitignore**), and run `fetchSecrets.js` before Cypress tests.

---

## **Notes**

- Due to security constraints, you cannot call Key Vault from the browser; secrets must be fetched before running Cypress.
- Always keep `.env` and `cypress.env.json` out of version control for security.

---
