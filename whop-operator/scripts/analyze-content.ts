import { whop } from "./client";

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  const productId = "prod_vg4N1EhKpr1ed"; // AI Stack Finder

  if (!companyId) {
    console.error("Missing WHOP_COMPANY_ID in .env");
    return;
  }

  console.log("Analyzing AI Stack Finder Experiences & Content...");

  try {
    const experiences = await whop.experiences.list({ company_id: companyId, product_id: productId } as any);
    
    for await (const exp of experiences) {
      console.log(`\n\n=== Experience: ${(exp as any).name || (exp as any).title} (${exp.id}) ===`);
      console.log(`App ID: ${(exp as any).app?.id || 'Unknown'}`);

      // Try fetching forum posts if it's a forum experience
      try {
        const posts = await whop.forumPosts.list({ experience_id: exp.id } as any);
        let hasPosts = false;
        for await (const post of posts) {
          if (!hasPosts) {
            console.log("  [Forum Posts]");
            hasPosts = true;
          }
          console.log(`  - Title: ${(post as any).title}`);
          console.log(`    Content snippet: ${String((post as any).content || '').substring(0, 100)}...`);
        }
      } catch (e) {
        // Not a forum / unsupported
      }

      // Try fetching course chapters if it's a course experience
      try {
        const courses = await whop.courses.list({ experience_id: exp.id } as any);
        let hasCourses = false;
        for await (const course of courses) {
          if (!hasCourses) {
            console.log("  [Courses]");
            hasCourses = true;
          }
          console.log(`  - Course: ${(course as any).title}`);
          
          try {
            const chapters = await whop.courseChapters.list({ course_id: course.id } as any);
            for await (const chapter of chapters) {
              console.log(`    - Chapter: ${(chapter as any).title}`);
            }
          } catch(e) {}
        }
      } catch (e) {
        // Not a course
      }
    }
  } catch (error) {
    console.error("Analysis failed:", error);
  }
}

main().catch(console.error);
