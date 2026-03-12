import { whop } from "./client";

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  const experienceId = "exp_fCODnzQhBJ3Wv8"; // Tool Library Experience

  if (!companyId) {
    console.error("Missing WHOP_COMPANY_ID in .env");
    return;
  }

  // Simulated JSON payload of new tools to add
  const newTools = [
    {
      name: "Midjourney v6",
      category: "Creative Layer",
      emoji: "🎨",
      url: "https://midjourney.com",
      description: "The current state-of-the-art for AI image generation. Best for high-fidelity marketing assets, blog headers, and concept art."
    },
    {
      name: "Make.com",
      category: "Workflow Layer",
      emoji: "⚡",
      url: "https://make.com",
      description: "A visual automation platform that lets you connect apps and design workflows without limits. Much more flexible than Zapier for complex AI routing."
    }
  ];

  console.log(`Adding ${newTools.length} new tools to the Tool Library...`);

  try {
    for (const tool of newTools) {
      const content = `[**${tool.name}**](${tool.url})

${tool.description}

*Category: ${tool.category}*`;

      const post = await whop.forumPosts.create({
        experience_id: experienceId,
        title: `${tool.emoji} ${tool.name} — ${tool.category} Tools`,
        content: content,
      });

      console.log(`✅ Successfully added ${tool.name} to the Tool Library: ${post.id}`);
    }
  } catch (error) {
    console.error("Failed to add tool:", error);
  }
}

main().catch(console.error);
