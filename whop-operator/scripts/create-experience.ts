import { whop } from "./client";

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  const appId = process.env.WHOP_APP_ID;

  if (!companyId || !appId) {
    throw new Error("WHOP_COMPANY_ID and WHOP_APP_ID must be set");
  }

  const exp = await whop.experiences.create({
    app_id: appId,
    company_id: companyId,
  });

  console.log("Created experience:", exp.id);
}

main().catch(console.error);
