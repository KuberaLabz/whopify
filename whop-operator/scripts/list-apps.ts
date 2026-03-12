import { whop } from "./client";

async function main() {
  console.log("Fetching available apps...");
  for await (const app of whop.apps.list()) {
    console.log(`ID: ${app.id} | Name: ${app.name}`);
  }
}

main().catch(console.error);
