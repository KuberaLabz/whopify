import { whop } from "./client";

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  if (!companyId) return;

  console.log("Fetching plans and experiences...");
  const plans = await whop.plans.list({ company_id: companyId, limit: 50 } as any);
  
  for await (const plan of plans) {
    if ((plan as any).visibility !== 'hidden') {
      console.log(`\nPlan: ${(plan as any).name || (plan as any).plan_type} (ID: ${plan.id})`);
      const included = (plan as any).included_experiences || (plan as any).experiences || [];
      console.log(`  Included Experiences:`, included);
    }
  }

}

main().catch(console.error);
