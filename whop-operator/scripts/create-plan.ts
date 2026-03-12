import { whop } from "./client";

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  const productId = process.env.WHOP_PRODUCT_ID;

  if (!companyId || !productId) {
    throw new Error("WHOP_COMPANY_ID and WHOP_PRODUCT_ID must be set");
  }

  const plan = await whop.plans.create({
    company_id: companyId,
    product_id: productId,
  });

  console.log("Created plan:", plan.id);
}

main().catch(console.error);
