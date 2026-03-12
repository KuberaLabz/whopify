# 💎 Whopy: Master Project Documentation

This document serves as the comprehensive source of truth for **Whopy**, a premium, editorial-grade fullstack web application designed for Whop Store Operators. It provides the deep context, design philosophy, and technical architecture required for any developer to continue or finalize the project.

---

## 1. Project Vision & Aesthetic

### The "Whopy" Philosophy
Whopy is not just a tool; it's an **Editorial Experience**. The goal is to move away from generic, boxy AI interfaces and create something that "feels alive," premium, and distinctly boutique.

- **Vibrant Editorial Style**: Inspired by modern fashion and design magazines. High contrast, bold typography, and fluid airiness.
- **Dynamic Presence**: The app uses a "breathing" background—vibrant orange/red radial gradients that subtly shift and rotate, layered with a fine grain texture to feel organic, not digital.
- **Micro-interactions**: Everything should have a physical weight. Buttons lift, the sidebar glides, and the chat slab reacts to focus with deep, soft shadows.

### Design Tokens (CSS Variables)
- **Primary**: `#ff4d00` (Electric Orange) to `#ff8c00` (Warm Amber).
- **Typography**: 
  - **Display/Serif**: `Playfair Display` (Weight 400-900). Use this for titles and branding.
  - **UI/Sans**: `Inter`. Use this for all functional elements, labels, and text.
- **Glassmorphism**: High blur (`20px+`) with low-opacity backgrounds (`rgba(255, 255, 255, 0.4)`) to maintain the "editorial" lightness.

---

## 2. Technical Architecture

### Core Structure
The project is divided into two main domains within the monorepo:

1.  **`whop-web/` (The Interface)**:
    - **Framework**: Next.js (App Router).
    - **Styling**: Vanilla CSS Modules (to ensure total design control without Tailwind utility clutter).
    - **State**: React Server Components for data, Client Components for the "Alive" UI layer.
2.  **`whop-operator/` (The Logic Engine)**:
    - **Language**: TypeScript / Node.
    - **Whop SDK**: Primary integration point (`@whop/sdk`).
    - **Scripts**: A library of operational scripts found in `whop-operator/scripts/` (e.g., `audit.ts`, `attach-experience.ts`, `create-plan.ts`).

### Key Components
- **`Sidebar.tsx`**: A fixed, auto-expanding navigation bar. It reveals descriptive labels on hover.
- **`TopActions.tsx`**: A sticky header containing branding and user-specific controls.
- **`ChatInterface.tsx`**: The primary "slab." It's a floating glass unit designed for conversational AI interaction.
- **`AIOrientedOrb.tsx`**: The signature glowing visual element (can be toggled or integrated into the hero).

---

## 3. Whop SDK Integration

The application bridges the gap between high-end UI and store automation.

- **Client Wrapper**: `lib/whop.ts` initializes the SDK.
- **API Routes**: `app/api/chat/route.ts` handles the communication between the UI and the operational scripts.
- **Operations**:
  - **Audit**: Analyzes store products and metadata to provide high-level health checks.
  - **Product/Plan Management**: Logic for creating and modifying Whop plans and visibility.
  - **Experiences**: Attaching and managing user-facing experiences within the Whop ecosystem.

---

## 4. Current Implementation Status

- [x] **Redesign Phase**: Emojis removed, Lucide React icons integrated, full editorial CSS completed.
- [x] **Navigation Phase**: Auto-expanding sidebar with Whop-centric menu categories.
- [x] **Core UI**: Chat interface with glassmorphism and interactive focus states.
- [x] **Backend**: Basic chat route connected to Whop SDK for "Audit" functionality.
- [x] **Git**: Project initialized and pushed to `KuberaLabz/whopify.git`.

---

## 5. Developer Roadmap (How to Complete)

To bring Whopy to its final state, the following should be addressed:

### I. Advanced AI Agent Integration
- **Tool Calling**: Connect the chat API to the script library (`whop-operator/scripts`). The AI should be able to *actually* call `createPlan` or `auditStore` when requested.
- **Contextual Memory**: Implement a session-based history for the chat to maintain context across multi-step tasks.

### II. Functional Navigation
- **Active States**: Implement routing for the sidebar menu items (Dashboard, Products, etc.).
- **Dynamic Content**: Each menu item should lead to a specialized view of the store data (e.g., a "Products" grid).

### III. Deployment & CI/CD
- **Vercel/Self-host**: The project is Next.js ready. Ensure env variables (`WHOP_API_KEY`, `WHOP_COMPANY_ID`) are managed securely.
- **SDK Sync**: Ensure the `whop-operator` dependencies are correctly linked or shared with the `whop-web` build process.

---

## 6. Environment & Setup

1.  **Dependencies**: Run `npm install` in both the root and `whop-web/`.
2.  **Environment Variables**: Required in `whop-web/.env.local`:
    - `WHOP_API_KEY`: Your Whop operator API key.
    - `WHOP_COMPANY_ID`: Your target company ID.
3.  **Development**: Run `npm run dev` within `whop-web/`.

---

*This document is the property of KuberaLabz for the development of Whopy.*
