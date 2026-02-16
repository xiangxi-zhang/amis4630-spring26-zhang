# ADR-004: Cloud Hosting — Azure App Service

| Field | Value |
|---|---|
| **Date** | 2026-02-15 |
| **Status** | Accepted |

---

## Context

Buckeye Marketplace must be deployed to the cloud to provide reliable access for all three user segments: on-campus students, local fans in the Columbus area, and out-of-state alumni. The hosting platform must support both the React frontend and the .NET Web API backend, provide built-in **HTTPS** enforcement for **security**, enable automatic **scalability** under varying traffic loads (e.g., game-day surges), and integrate with GitHub for CI/CD deployment workflows. As a university project, cost efficiency and availability of student credits are also important factors.

## Decision

We will use **Azure App Service** to host both the React frontend and the .NET Web API backend.

Azure App Service is a fully managed Platform-as-a-Service (PaaS) that abstracts away infrastructure management. It provides built-in HTTPS with custom domain support, automatic scaling (scale-up and scale-out), deployment slots for staging, and native GitHub Actions integration for CI/CD pipelines. Azure's student credit program makes it cost-effective for a course project. Both the frontend static files and the backend API can be hosted on App Service instances within the same Azure subscription, simplifying network configuration and reducing latency between components.

## Consequences

**Positive:**

- Managed service eliminates server administration: no patching, no OS updates, no manual provisioning.
- Built-in **HTTPS** enforcement ensures all data in transit is encrypted — critical for protecting user credentials, payment details, and personal information across all personas.
- Automatic **scalability** handles traffic spikes (e.g., game-day rushes from fans like Marcus) without manual intervention.
- Native CI/CD integration with GitHub Actions supports the Cloud Deployment (CI/CD) requirement from the project Kanban board.
- Azure student credits make the platform cost-accessible for development and testing.
- High **availability** SLAs ensure the platform is accessible to out-of-state users like Trish at any time.

**Negative / Trade-offs:**

- Vendor lock-in to the Azure ecosystem (acceptable for a course project with a defined tech stack).
- App Service pricing tiers may require upgrades if traffic exceeds free/student tier limits.

**Persona impact:** Maya benefits from a reliably available platform she can access from campus at any time, with HTTPS protecting her `.edu` email and account data. Marcus benefits from automatic scaling that keeps checkout fast even during game-day traffic surges. Trish benefits from HTTPS-enforced **security** for her gift purchases and payment information, and from high **availability** that ensures she can shop from Atlanta without downtime.

---

## AI Assistance in Decision

AI (Claude Opus4.6) was used to help draft this ADR, compare cloud hosting options, and refine the wording. The final decision to use Azure App Service was reviewed and confirmed by the student based on course requirements, Azure student credit availability, and integration with the existing tech stack. AI did not independently make the final decision.
