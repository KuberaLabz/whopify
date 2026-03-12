import { whop } from "./client";

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  if (!companyId) return;

  const experienceId = "exp_L4gNCW0M9WklGz"; // Tutorials Experience (Courses App)

  try {
    const exp = await whop.experiences.retrieve(experienceId);
    console.log(`\n\n=== Experience: ${(exp as any).name || (exp as any).title} (${exp.id}) ===`);
    console.log(JSON.stringify(exp, null, 2));
  } catch(e) {
    console.log("Error:", e);
  }
}

main().catch(console.error);
