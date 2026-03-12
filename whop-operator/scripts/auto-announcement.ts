import { whop } from "./client";

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  const experienceId = "exp_4MnYhXyMUDtXgA"; // Announcements Experience

  if (!companyId) {
    console.error("Missing WHOP_COMPANY_ID in .env");
    return;
  }

  // Example dynamic payload that would normally come from a JSON backlog or LLM generation
  const pickNumber = 5; // e.g., week 5
  const topic = "The Best Meeting Assistants";
  const content = `## Weekly AI Pick #${pickNumber}: ${topic}

### The Problem
You spend 10+ hours a week in meetings, but taking notes means you aren't fully present. Then you forget the action items anyway. 

### The Solution: Meeting Intelligence
Instead of just recording, AI meeting assistants join your calls, transcribe everything, extract action items, and push them to your CRM or task manager automatically.

**Top Picks:**
1. **Fireflies.ai** ⚡: Best for heavy integrations (Slack, Notion, Asana).
2. **Otter.ai** ✍️: Best for pure transcription speed and accuracy.

**The Workflow:**
Connect your calendar -> Let the bot join -> Review the summarized recap in Slack 10 minutes after the call ends.`;

  console.log(`Drafting Weekly AI Pick #${pickNumber}: ${topic}...`);

  try {
    const post = await whop.forumPosts.create({
      experience_id: experienceId,
      title: `🔥 Weekly AI Pick #${pickNumber}: ${topic}`,
      content: content,
      // You can also add image_url if you have a thumbnail
    });

    console.log(`✅ Successfully published Weekly AI Pick to Announcements: ${post.id}`);
  } catch (error) {
    console.error("Failed to post:", error);
  }
}

main().catch(console.error);
