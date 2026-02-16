# ADR-002: Backend Framework — .NET Web API (C#)

| Field | Value |
|---|---|
| **Date** | 2026-02-15 |
| **Status** | Accepted |

---

## Context

Buckeye Marketplace needs a backend that handles authentication, product catalog management, order processing, review storage, and administrative operations. The backend must expose a clean API that the React frontend can consume, enforce **security** through authentication and role-based access, and support **scalability** as the user base grows. It must also implement business logic specific to our personas: student discount verification for Maya, all-in pricing calculations for Marcus, and gift option processing for Trish.

As framed in the course, **.NET is the "Engine"** — the layer that powers all business logic, data access, and security enforcement behind the scenes.

## Decision

We will use **.NET Web API (C#)** as the backend framework.

.NET Web API provides a mature, enterprise-grade platform for building RESTful services. It natively supports **JSON** serialization, **HTTPS** enforcement, and middleware-based request pipelines. Entity Framework Core serves as the ORM for data access to Azure SQL, abstracting direct SQL queries while supporting future schema migrations. The framework's built-in dependency injection promotes clean **separation of concerns** between controllers, services, and data access layers.

## Consequences

**Positive:**

- High performance and enterprise-grade **scalability** — .NET is optimized for concurrent request handling, supporting fast checkout flows for Marcus.
- Clean REST/JSON API design enables strong **decoupling** between frontend and backend; the React frontend consumes endpoints without knowledge of backend internals.
- Built-in **security** features: authentication middleware, role-based authorization (customer vs. admin), and HTTPS enforcement protect user data across all personas.
- Entity Framework Core simplifies data access and supports code-first migrations as the schema evolves.

**Negative / Trade-offs:**

- C# has a steeper learning curve compared to some scripting languages.
- .NET tooling requires the SDK to be installed in the development environment.

**Persona impact:** Maya benefits from backend logic that verifies `.edu` emails and applies student discounts automatically. Marcus benefits from fast API response times and order status tracking endpoints. Trish benefits from secure transaction processing and API endpoints that handle gift packaging options and personalized messages.

---

## AI Assistance in Decision

AI (Claude Opus4.6) was used to help draft this ADR, compare backend framework options, and refine the wording. The final decision to use .NET Web API (C#) was reviewed and confirmed by the student based on course requirements and project needs. AI did not independently make the final decision.
