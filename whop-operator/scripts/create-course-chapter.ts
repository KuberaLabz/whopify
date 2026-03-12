import { whop } from "./client";

async function main() {
  const companyId = process.env.WHOP_COMPANY_ID;
  const experienceId = "exp_L4gNCW0M9WklGz"; // Tutorials Experience (Courses App)

  if (!companyId) {
    console.error("Missing WHOP_COMPANY_ID in .env");
    return;
  }

  console.log("Locating 'AI Stack Playbook' course...");

  try {
    // 1. Find the course IDE
    const courses = await whop.courses.list({ experience_id: experienceId } as any);
    let targetCourseId: string | undefined;

    for await (const course of courses) {
      if ((course as any).title === "AI Stack Playbook") {
        targetCourseId = course.id;
        break;
      }
    }

    if (!targetCourseId) {
      console.log("Could not find 'AI Stack Playbook' course. Please create it first.");
      return;
    }

    // 2. Create the new Chapter
    const chapterTitle = "Advanced Content Repurposing Automation";
    const chapterContent = `## Automating Your Content Engine

In this module, you will learn how to take a single long-form piece of content (like a YouTube video or Podcast) and automatically turn it into 10+ social media assets using AI.

### The Stack:
- **Transcription**: ChatGPT Advanced Voice or Whisper
- **Text Processing**: Claude 3.5 Sonnet
- **Automation**: Make.com

*Video tutorial dropping soon.*`;

    console.log(`Creating new chapter: "${chapterTitle}" inside course ${targetCourseId}...`);

    const chapter = await whop.courseChapters.create({
      course_id: targetCourseId,
      title: chapterTitle
    } as any);

    console.log(`✅ Successfully drafted Course Chapter: ${chapter.id}`);

    console.log(`Publishing lesson content to chapter...`);
    const lesson = await whop.courseLessons.create({
      chapter_id: chapter.id,
      title: "Introduction & Setup",
      lesson_type: "text",
      content: chapterContent
    } as any);

    console.log(`✅ Successfully published Lesson: ${lesson.id}`);

  } catch (error) {
    console.error("Failed to add course chapter:", error);
  }
}

main().catch(console.error);
