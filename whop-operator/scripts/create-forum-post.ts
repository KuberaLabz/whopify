import { whop } from "./client";

async function main() {
  const experienceId = process.env.WHOP_EXPERIENCE_ID;
  
  // Note: Adjust the content based on exactly what kind of forum post you want to create.
  // The exact fields depend on the Whop API schema.
  
  if (!experienceId) {
    throw new Error("WHOP_EXPERIENCE_ID must be set");
  }

  const post = await whop.forumPosts.create({
    experience_id: experienceId,
    // Add title/content fields once you confirm your exact schema in the endpoint docs or MCP
  });

  console.log("Created forum post:", post.id);
}

main().catch(console.error);
