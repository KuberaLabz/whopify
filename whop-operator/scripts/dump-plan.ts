import { whop } from "./client";

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  if (!companyId) return;

  const plans = await whop.plans.list({ company_id: companyId } as any);
  
  for await (const plan of plans) {
    if (plan.id === 'plan_SekKe76svecUe' || plan.id === 'plan_Voysf86mxACCi') {
      console.log(`\n\n=== Plan: ${(plan as any).name || (plan as any).plan_type} (${plan.id}) ===`);
      console.log(JSON.stringify(plan, null, 2));
    }
  }
}

main().catch(console.error);
