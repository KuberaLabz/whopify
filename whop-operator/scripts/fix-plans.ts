import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  const freePlanId = "plan_SekKe76svecUe"; // The newly created free plan
  const paidPlanId = "plan_Voysf86mxACCi"; // The existing $29 plan

  if (!companyId) {
    console.error("Missing WHOP_COMPANY_ID in .env");
    return;
  }

  console.log("Fixing plan visibility and stock issues...");

  try {
    // 1. Update Free Plan to be in stock
    console.log(`Updating Free Plan (${freePlanId}) to have unlimited stock...`);
    const freeRes = await fetch(`https://api.whop.com/api/v2/plans/${freePlanId}`, {
      method: "POST", // The SDK uses POST for updates on plans usually, or we can try updating
      headers: {
        Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        unlimited_stock: true
      })
    });
    const freeData = await freeRes.json();
    if (!freeRes.ok) {
       console.error("Failed to update free plan:", freeData);
    } else {
       console.log("✅ Free plan stock updated.");
    }

    // 2. Hide the $29 Paid Plan
    console.log(`Hiding the $29 Paid Plan (${paidPlanId})...`);
    const paidRes = await fetch(`https://api.whop.com/api/v2/plans/${paidPlanId}`, {
      method: "POST", 
      headers: {
        Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        visibility: "hidden" // try hidden
      })
    });
    const paidData = await paidRes.json();
    if (!paidRes.ok) {
       console.error("Failed to hide paid plan:", paidData);
    } else {
       console.log("✅ Paid plan hidden.");
    }

  } catch (error) {
    console.error("Error during execution:", error);
  }
}

main().catch(console.error);
