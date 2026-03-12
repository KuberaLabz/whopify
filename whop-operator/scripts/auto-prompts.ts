import { whop } from "./client";

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  const experienceId = "exp_hnOfY7kBAVheO8"; // Prompt Vault Experience

  if (!companyId) {
    console.error("Missing WHOP_COMPANY_ID in .env");
    return;
  }

  const useCase = "Sales Outreach & Cold Email";
  const content = `Below are 10 highly-tuned prompt templates for crafting cold emails, following up on leads, and handling objections.

### 1. The Agitate-Solve Cold Email
**Prompt:**
> Act as an expert B2B copywriter. Write a 4-sentence cold email to a [Target Role] at a [Company Type]. The problem they face is [Specific Problem]. Use PAS (Problem -> Agitate -> Solution) framework. Keep it under 75 words. Tone: Direct, professional, no fluff.

### 2. The No-Pressure Follow Up
**Prompt:**
> Write a 2-sentence follow-up email to a prospect who hasn't answered my last email about [Topic]. The goal is to bump the thread without being annoying. Ask a simple yes/no question to lower the friction of replying.

*(... more prompts would go here ...)*`;

  console.log(`Drafting Prompt Vault: 10 ${useCase} Prompts...`);

  try {
    const post = await whop.forumPosts.create({
      experience_id: experienceId,
      title: `⚡ 10 ${useCase} Prompts`,
      content: content,
    });

    console.log(`✅ Successfully published to Prompt Vault: ${post.id}`);
  } catch (error) {
    console.error("Failed to post:", error);
  }
}

main().catch(console.error);
