# Buckeye Marketplace

Buckeye Marketplace is an OSU-themed e-commerce platform designed to serve three core audiences: current students seeking affordable campus gear, local fans preparing for game day, and out-of-state alumni looking to show school pride through gifts and seasonal purchases. The system follows a layered architecture: **React with TypeScript** as the Cockpit (frontend), **.NET Web API** as the Engine (backend), **Azure SQL** as the Data Layer, and **Azure App Service** as the Cloud Platform.

---

## Table of Contents

| Document | Description |
|---|---|
| [System Architecture](docs/architecture.md) | High-level architecture diagram, component responsibilities, and data flow |
| [Database Schema](docs/database.md) | Entity Relationship Diagram (ERD) and relationship mappings |
| [Component Architecture](docs/components.md) | Atomic Design component hierarchy for the Product Catalog feature |
| [Architecture Decision Records](docs/adr/) | Technology selection rationale (frontend, backend, database, cloud) |

---

## Feature Prioritization

Features are organized on a GitHub Projects Kanban board using the **MoSCoW method** (Must Have, Should Have, Could Have, Won't Have). Prioritization decisions are grounded in the personas and journey pain points identified during Milestone 1.

**Must-Have features** represent the minimum viable platform needed to launch. These were prioritized based on direct alignment with persona needs:

- **Product Catalog** — All three personas need to browse and discover OSU merchandise.
- **Shopping Cart** — Core transaction flow required for any purchase.
- **User Registration & Login** — Enables account creation and stores `.edu` email and student verification status, supporting Maya's eligibility for future discount features.
- **Reviews & Ratings System** — Builds trust for Maya (budget-conscious, reads reviews before buying) and Trish (values quality assurance on officially licensed goods).
- **Administrative Dashboard** — Required for product and order management by platform operators.
- **Cloud Deployment (CI/CD)** — Ensures the platform is reliably accessible to all users, including out-of-state alumni like Trish.

**Should-Have features** add significant value but are not required for initial launch: automatic student discount pricing rule applied at checkout (Maya), gift-ready packaging (Trish), and campus drop-off returns (Marcus).

**Could-Have features** enhance the experience for future milestones: price drop alerts, shareable wishlists, and seasonal collections.

---

## Architecture Decisions

The technology stack was selected to meet course requirements while supporting the scalability, security, and maintainability needs of the platform.

| Layer | Technology | Role |
|---|---|---|
| Frontend | React with TypeScript | **Cockpit** — the user-facing presentation layer. Component-based UI with type safety. |
| Backend | .NET Web API (C#) | **Engine** — business logic, authentication, data access via Entity Framework Core. |
| Database | Azure SQL | **Data Layer** — relational storage for users, products, orders, reviews with referential integrity. |
| Cloud | Azure App Service | **Cloud Platform** — managed PaaS hosting with HTTPS, auto-scaling, and GitHub Actions CI/CD. |

The Cockpit and Engine communicate exclusively through REST/JSON over HTTPS, maintaining clean decoupling between layers. Azure SQL provides built-in availability and automated backups. Azure App Service handles scaling automatically during traffic surges (e.g., game-day shopping) and enforces HTTPS for all data in transit.

---

## Documentation Overview

The `docs/` folder contains all technical documentation supporting Milestone 2 deliverables:

- `docs/architecture.md` — System architecture diagram (Mermaid) with component responsibilities and data flow examples.
- `docs/database.md` — Entity Relationship Diagram (Mermaid erDiagram) with relationship summary and persona alignment.
- `docs/components.md` — Atomic Design component hierarchy scoped to the Product Catalog feature, with TypeScript code examples.
- `docs/adr/` — Four Architecture Decision Records covering frontend, backend, database, and cloud hosting choices.

---

## AI Tool Usage

AI tools (Claude) were used throughout Milestone 2 as support tools for the following tasks:

- Researching technology trade-offs between framework and platform options.
- Generating Mermaid.js diagrams (architecture diagram, ERD) for inclusion in Markdown documentation.
- Generating initial Markdown documentation structure and section outlines.
- Improving documentation clarity, consistency, and professional tone.

**All AI-generated outputs were reviewed, edited, and approved by the student.** AI was used as a drafting and research assistant only.  AI did not independently make project decisions.
