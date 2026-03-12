import { whop } from "./client";

async function main() {
  const experienceId = process.env.WHOP_EXPERIENCE_ID;
  const productId = process.env.WHOP_PRODUCT_ID;

  if (!experienceId || !productId) {
    throw new Error("WHOP_EXPERIENCE_ID and WHOP_PRODUCT_ID must be set");
  }

  const exp = await whop.experiences.attach(experienceId, {
    product_id: productId,
  });

  console.log("Attached experience:", exp.id);
}

main().catch(console.error);
