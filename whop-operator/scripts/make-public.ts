import { whop } from "./client";

async function main() {
  const experienceId = "exp_L4gNCW0M9WklGz"; // Tutorials Experience (Courses App)

  console.log("Updating experience visibility...");

  try {
    const experience = await whop.experiences.update(experienceId, {
      is_public: true
    } as any);
    console.log("Successfully updated experience to public.");
    console.log("New Status:", experience.is_public);
  } catch (error) {
    console.error("Failed to update experience:", error);
  }
}

main().catch(console.error);
