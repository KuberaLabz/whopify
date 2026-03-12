import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  const productId = "prod_vg4N1EhKpr1ed"; // AI Stack Finder

  if (!companyId) {
    console.error("Missing WHOP_COMPANY_ID in .env");
    return;
  }

  console.log("Attempting to create a free plan for AI Stack Finder via raw API...");

  try {
    const res = await fetch("https://api.whop.com/api/v2/plans", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_id: productId,
        plan_type: "one_time",
        initial_price: 0,
        base_currency: "usd",
        internal_notes: "Free entry to build audience"
      })
    });

    const data = await res.json();
    
    if (!res.ok) {
        throw new Error(JSON.stringify(data));
    }

    console.log(`✅ Successfully created free plan!`);
    console.log(`Plan ID: ${data.id}`);
    
    if (data.direct_link) {
        console.log(`Checkout Link: ${data.direct_link}`);
    } else {
        console.log(`You can now share your store link and users will be able to join for free.`);
    }

  } catch (error) {
    console.error("Failed to make the product free:", error);
  }
}

main().catch(console.error);
