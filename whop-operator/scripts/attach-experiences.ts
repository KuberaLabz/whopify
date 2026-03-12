import { whop } from "./client";

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  if (!companyId) return;

  const planId = "plan_SekKe76svecUe"; // Free Plan

  // Fetch all experiences for the product
  const experiences = await whop.experiences.list({ company_id: companyId, product_id: "prod_vg4N1EhKpr1ed", limit: 50 } as any);
  
  const experienceIds = [];
  for await (const exp of experiences) {
    experienceIds.push(exp.id);
  }

  console.log("Experiences to attach:", experienceIds);

  // Use raw fetch to update the plan with included_experiences
  const res = await fetch(`https://api.whop.com/api/v2/plans/${planId}`, {
    method: "POST", // The SDK uses POST for updates on plans usually
    headers: {
      Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      included_experiences: experienceIds,
      experience_ids: experienceIds // trying both just in case
    })
  });

  const data = await res.json();
  if (res.ok) {
    console.log("Successfully attached experiences to the Free plan.");
  } else {
    console.log("Failed to attach:", data);
  }
}

main().catch(console.error);
