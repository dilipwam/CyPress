require('dotenv').config();
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');
const fs = require('fs');

const vaultName = process.env.KEY_VAULT_NAME;
const vaultUrl = `https://${vaultName}.vault.azure.net`;

const credential = new DefaultAzureCredential();
const client = new SecretClient(vaultUrl, credential);

// List the secrets you want to fetch
const secretsToFetch = ['KV-AUTO-ECP-TRUCKUSER', 'KV-AUTO-ECP-TRUCKPASS','KV-AUTO-ECP-INVUSER','KV-AUTO-ECP-INVPASS'];

// Method to Fetch secrets
async function main() {
  const results = {};
  for (const name of secretsToFetch) {
    const secret = await client.getSecret(name);
    results[`CYPRESS_${name}`] = secret.value;
    console.log('**** KEY VAULT ***** ', name , '   =   ', secret.value)
}

  // Write secrets to .cypress.env.json (optional)
  fs.writeFileSync('cypress.env.json', JSON.stringify(results, null, 2));
  console.log('✅ Cypress secrets saved to cypress.env.json');
}

main().catch((err) => {
  console.error('❌ Failed to fetch secrets:', err);
});
