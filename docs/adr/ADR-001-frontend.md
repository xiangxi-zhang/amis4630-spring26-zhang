# ADR-001: Frontend Framework — React with TypeScript

| Field | Value |
|---|---|
| **Date** | 2026-02-15 |
| **Status** | Accepted |

---

## Context

Buckeye Marketplace requires a responsive, component-driven frontend that serves three distinct user profiles: a budget-conscious student (Maya) who needs transparent pricing and quick filtering, a last-minute local fan (Marcus) who demands fast checkout with minimal friction, and an out-of-state alumna (Trish) who expects a polished, trustworthy shopping and gift-purchasing experience. The frontend is the primary touchpoint for all users and must support reusable UI components, maintainability over multiple milestones, and clean **decoupling** from the backend API layer.

As framed in the course, **React is the "Cockpit"** — the layer where the user interacts with the system, sees data, and triggers actions. All business logic and data persistence are handled by the backend and database; the frontend is responsible only for presentation and user interaction.This decision also aligns with the course-required technology stack specified in the Milestone 2 instructions.

## Decision

We will use **React with TypeScript** as the frontend framework.

React's component-based architecture enables reusable UI elements (product cards, cart widgets, review panels) that can be composed across pages without duplication. TypeScript adds static typing on top of JavaScript, catching type errors at compile time rather than at runtime. This improves code **maintainability** and reduces bugs as the codebase grows across milestones. The frontend communicates with the .NET backend exclusively via **REST/JSON over HTTPS**, maintaining a clear separation between the presentation layer and business logic.

## Consequences

**Positive:**

- Component reusability reduces development time for repeated UI patterns (e.g., product cards used in catalog, search results, and wishlist views).
- TypeScript's static typing makes the codebase safer and easier to refactor as features are added in later milestones.
- React's virtual DOM enables fast, responsive UI updates — critical for Marcus's need for a snappy checkout flow and Maya's need for real-time price filtering.
- Clean **decoupling** from the backend: the React frontend can be developed and tested independently from the .NET API.

**Negative / Trade-offs:**

- TypeScript introduces a learning curve compared to plain JavaScript.
- React requires additional tooling (build pipeline, bundler) compared to server-rendered HTML.

**Persona impact:** Maya benefits from responsive filtering and transparent all-in pricing displayed in the UI. Marcus benefits from fast page transitions and a lightweight checkout flow. Trish benefits from a polished, professional interface that builds trust in the platform.

---

## AI Assistance in Decision

AI (Claude Opus4.6) was used to help draft this ADR, compare pros and cons of frontend frameworks, and refine the wording. The final decision to use React with TypeScript was reviewed and confirmed by the student based on course requirements and project needs. AI did not independently make the final decision.
