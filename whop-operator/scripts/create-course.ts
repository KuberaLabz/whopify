import { whop } from "./client";

async function main() {
  const experienceId = process.env.WHOP_EXPERIENCE_ID;

  if (!experienceId) {
    throw new Error("WHOP_EXPERIENCE_ID must be set");
  }

  const course = await whop.courses.create({
    experience_id: experienceId,
    title: "AI Stack Finder Quick Start",
  });

  console.log("Created course:", course.id);
}

main().catch(console.error);
