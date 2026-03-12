import { whop } from "./client";

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  const experienceId = "exp_L4gNCW0M9WklGz"; // Tutorials Experience (Courses App)

  if (!companyId) {
    console.error("Missing WHOP_COMPANY_ID in .env");
    return;
  }

  console.log("Locating 'AI Stack Playbook' course and inspecting contents...");

  try {
    const courses = await whop.courses.list({ experience_id: experienceId } as any);
    let targetCourseId: string | undefined;

    for await (const course of courses) {
      if ((course as any).title === "AI Stack Playbook") {
        targetCourseId = course.id;
        console.log(`\n\n=== Course: ${(course as any).title} ===`);
        console.log(`Course Visibility: ${(course as any).visibility}, Status: ${(course as any).status}`);
        break;
      }
    }

    if (!targetCourseId) {
      console.log("Could not find 'AI Stack Playbook' course.");
      return;
    }

    const chapters = await whop.courseChapters.list({ course_id: targetCourseId } as any);
    for await (const chapter of chapters) {
      console.log(`\n[Chapter] ${(chapter as any).title} (ID: ${chapter.id})`);
      
      try {
        const lessons = await whop.courseLessons.list({ chapter_id: chapter.id } as any);
        let lessonCount = 0;
        for await (const lesson of lessons) {
          lessonCount++;
          console.log(`  -> [Lesson] ${(lesson as any).title} (Visibility: ${(lesson as any).visibility}, Status/Draft: ${(lesson as any).status || 'N/A'}, ID: ${lesson.id})`);
        }
        if (lessonCount === 0) {
          console.log(`  -> (No lessons)`);
        }
      } catch (e: any) {
        console.log(`  -> Error fetching lessons: ${e.message}`);
      }
    }

  } catch (error) {
    console.error("Failed to inspect course:", error);
  }
}

main().catch(console.error);
