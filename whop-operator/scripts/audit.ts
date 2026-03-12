import { whop } from "./client";

async function main() {
  console.log("Starting Whop Store Audit...");
  
  try {
    const companyId = process.env.WHOP_COMPANY_ID;

    if (!companyId || companyId === "your_company_id_here") {
      console.log("\n❌ ERROR: WHOP_COMPANY_ID is missing from your .env file.");
      console.log("Since you are using a Company API Key, Whop's security prevents the key from listing all your companies.");
      console.log("You must grab your Company ID from your browser's URL while in your Whop Dashboard (e.g. biz_...) and add it to .env.");
      return;
    }

    // 1. List Products
    console.log("\n--- Products ---");
    const products = await whop.products.list({ company_id: companyId });
    for await (const product of products) {
      console.log(`\nProduct ID: ${product.id}`);
      console.log(`Name: ${(product as any).name || (product as any).title}`);
      console.log(`Visibility: ${(product as any).visibility}`);
      
      // 2. List Plans for Product
      console.log(`  [Plans] for ${(product as any).name || (product as any).title}:`);
      const plans = await whop.plans.list({ company_id: companyId, product_id: product.id } as any);
      for await (const plan of plans) {
        console.log(`    Plan ID: ${plan.id} | Billing Period: ${(plan as any).billing_period} | Details: ${JSON.stringify((plan as any).initial_price_amount || plan)}`);
      }

      // 3. List Experiences for Product
      console.log(`  [Experiences] for ${(product as any).name || (product as any).title}:`);
      const experiences = await whop.experiences.list({ company_id: companyId, product_id: product.id } as any);
      for await (const exp of experiences) {
        console.log(`    Experience ID: ${exp.id} | Name: ${(exp as any).name || (exp as any).title}`);
      }
    }

    // 4. List Available Apps
    console.log("\n--- Available Apps you can attach to products ---");
    const apps = await whop.apps.list();
    for await (const app of apps) {
      console.log(`App ID: ${app.id} | Name: ${(app as any).name || (app as any).title}`);
    }

    console.log("\nAudit complete. You can now copy these IDs into your .env file!");
  } catch (error) {
    console.error("Audit failed. Please ensure your WHOP_API_KEY in .env is correct.");
    console.error(error);
  }
}

main().catch(console.error);
