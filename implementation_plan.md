# Implementing Whop Store Automation

We will set up a secure, dual-agent workflow for automating your Whop store. This leverages the new Whop Model Context Protocol (MCP) servers to allow your AI agents to directly interact with your store and the Whop API. 

The approach is divided into two halves: configuring AI Assistants (Claude/Codex) for conversational admin tasks, and setting up a dedicated `whop-operator` code repository for repeatable, code-driven workflows using the `@whop/sdk`.

## User Review Required

> [!IMPORTANT]
> **API Key Creation**: Before executing scripts against your live store, you will need to create a **Company API Key** in your Whop developer dashboard. We will ensure this key has narrowly scoped permissions (least privilege) strictly for the actions we want to automate (products, plans, experiences, forum posts, courses).

## Proposed Changes

### 1. AI Assistant Configuration Setup

We will configure your AI setups so they have live access to both the Whop API and the Whop Documentation.

*   **Claude:** You will manually add `https://mcp.whop.com/sse` as a custom connector in your Claude Web/Desktop app, providing your Company API key.
*   **Codex (OpenClaw/HTTP Clients):** We will configure the MCP entries to point to the streamable HTTP endpoint `https://mcp.whop.com/mcp` and the docs server `https://docs.whop.com/mcp`, using the `WHOP_API_KEY` environment variable.

---

### 2. Scaffold `whop-operator` Repository

We will initialize a TypeScript repository on your local machine to house reusable scripts and our standard prompts. This keeps your store automation organized and version-controlled.

#### [NEW] [whop-operator/package.json](file:///Users/TRISMEGISTUS/whop/whop-operator/package.json)
Initialize a plain TypeScript project and install `@whop/sdk`.

#### [NEW] [whop-operator/scripts/client.ts](file:///Users/TRISMEGISTUS/whop/whop-operator/scripts/client.ts)
Setup the Whop SDK client using the `WHOP_API_KEY` environment variable.

#### [NEW] `whop-operator/scripts/*.ts`
We will scaffold specific action scripts like:
*   [list-apps.ts](file:///Users/TRISMEGISTUS/whop/whop-operator/scripts/list-apps.ts)
*   [create-plan.ts](file:///Users/TRISMEGISTUS/whop/whop-operator/scripts/create-plan.ts)
*   [create-experience.ts](file:///Users/TRISMEGISTUS/whop/whop-operator/scripts/create-experience.ts)
*   [attach-experience.ts](file:///Users/TRISMEGISTUS/whop/whop-operator/scripts/attach-experience.ts)
*   [create-forum-post.ts](file:///Users/TRISMEGISTUS/whop/whop-operator/scripts/create-forum-post.ts)
*   [create-course.ts](file:///Users/TRISMEGISTUS/whop/whop-operator/scripts/create-course.ts)

#### [NEW] `whop-operator/prompts/*.md`
We will save the specific "Prompt Pack" you provided securely inside the repo, so you know exactly what to paste to your AI agent when managing your store:
*   [1-store-audit.md](file:///Users/TRISMEGISTUS/whop/whop-operator/prompts/1-store-audit.md)
*   [2-product-creation.md](file:///Users/TRISMEGISTUS/whop/whop-operator/prompts/2-product-creation.md)
*   [3-experience-setup.md](file:///Users/TRISMEGISTUS/whop/whop-operator/prompts/3-experience-setup.md)
*   [4-content-seeding.md](file:///Users/TRISMEGISTUS/whop/whop-operator/prompts/4-content-seeding.md)
*   [5-course-shell.md](file:///Users/TRISMEGISTUS/whop/whop-operator/prompts/5-course-shell.md)
*   [6-safe-execution.md](file:///Users/TRISMEGISTUS/whop/whop-operator/prompts/6-safe-execution.md)

## Verification Plan

### Manual Verification
1.  **Store Audit Loop**: Once the AI agent is connected via MCP, we will execute the **Store Audit Prompt** ([prompts/1-store-audit.md](file:///Users/TRISMEGISTUS/whop/whop-operator/prompts/1-store-audit.md)). If it correctly formats and outputs your Store Name, Products, Plans, and available Apps **without making any changes**, the read-connection is verified.
2.  **Safe Write Verification**: Run the [scripts/list-apps.ts](file:///Users/TRISMEGISTUS/whop/whop-operator/scripts/list-apps.ts) script locally using Node to confirm the Company API key can securely communicate with Whop servers from your machine. We will request your explicit approval in chat or via the "Safe execution" prompt before making any live creation requests under your Company.
3.  **Webhook Setup (Later phase)**: We will verify webhooks only after the primary product flows work properly by triggering a test event inside your Whop dashboard.

---

## Phase 2: Content Automation Strategy

Based on the audit of your **AI Stack Finder**, we mapped your exact content style and structure:
- **Tone & Style:** Clean, premium markdown with strategic emojis in titles (🔥, ⚡, 📚, 🎨, ✍️). High signal-to-noise ratio focused on practical workflows, not hype.
- **Current Layout:** Start Here, Tool Library, Tutorials (Courses), Prompt Vault, Community, Announcements, Office Hours, Help.

### Automation Workflows

To make the product feel alive and active without manual labor, we will script the following automated pipelines within `whop-operator`:

**1. Weekly AI Pick Automator (`scripts/auto-announcement.ts`)**
- A script to programmatically draft and post "Weekly AI Pick #X: [Topic]" to the **Announcements** experience (`exp_4MnYhXyMUDtXgA`). 
- It will pull from a curated JSON backlog of topics and use your markdown style (`## Heading`, clean problem/solution format).

**2. Tool Library Syncer (`scripts/auto-tool-library.ts`)**
- A script that takes a simple JSON array of new vetted AI tools (name, link, category, short review) and posts an update to the **Tool Library** (`exp_fCODnzQhBJ3Wv8`). 
- It will match your existing categories (Brain Layer 🧠, Creative Layer 🎨, Workflow Layer ⚡).

**3. Prompt Vault Expander (`scripts/auto-prompts.ts`)**
- A pipeline to drip out new "10 [Use Case] Prompts" posts to the **Prompt Vault** (`exp_hnOfY7kBAVheO8`) using the exact `📌` and `⚡` emoji prefix style.

**4. Course/Tutorial Builder (`scripts/create-course-chapter.ts`)**
- A structured script to rapidly append new modules to your **AI Stack Playbook** course. It will handle creating the chapter and uploading the markdown lesson text automatically.
