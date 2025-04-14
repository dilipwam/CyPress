const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const vaultName = '<your-keyvault-name>';
const url = `https://${vaultName}.vault.azure.net`;

const credential = new DefaultAzureCredential();
const client = new SecretClient(url, credential);

async function main() {
  const dbPassword = await client.getSecret('DB_PASSWORD');
  console.log(`CYPRESS_DB_PASSWORD=${dbPassword.value}`);
}

main();
