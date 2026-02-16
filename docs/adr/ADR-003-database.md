# ADR-003: Database — Azure SQL

| Field | Value |
|---|---|
| **Date** | 2026-02-15 |
| **Status** | Accepted |

---

## Context

Buckeye Marketplace manages structured, relational data: users with authentication details, products with licensing attributes, orders with line items, and reviews tied to both users and products. These entities have well-defined relationships (one-to-many between Users and Orders, Orders and OrderItems, etc.) that map naturally to a relational model. The database must ensure data integrity, support transactional operations (e.g., order placement), and provide built-in **availability** and backup capabilities suitable for a cloud-hosted application.

As framed in the course, Azure SQL is part of the "Data Layer," responsible for reliable data storage behind the Engine (.NET).


## Decision

We will use **Azure SQL** as the database platform.

Azure SQL is a fully managed relational database service that provides built-in high **availability**, automated backups, and seamless integration with the .NET backend via Entity Framework Core. A relational database is the natural fit for our domain because the core entities (Users, Products, Orders, OrderItems, Reviews) have clearly defined relationships and referential integrity requirements. Azure SQL supports standard SQL queries, transactions, and indexing — all essential for reliable e-commerce operations.

## Consequences

**Positive:**

- Relational integrity enforces consistent relationships: every OrderItem belongs to exactly one Order and references exactly one Product, preventing orphaned or inconsistent data.
- Built-in **availability** and automated backups reduce operational risk — the database recovers gracefully from failures without manual intervention.
- Seamless integration with .NET and Entity Framework Core: the backend connects natively without additional drivers or adapters.
- Azure SQL scales vertically (tier upgrades) and supports read replicas for future **scalability** needs.

**Negative / Trade-offs:**

- Azure SQL incurs cloud hosting costs, though Azure student credits offset this during development.
- Schema changes require managed migrations, adding a step to the development workflow.

**Persona impact:** Maya's student verification data (`eduEmail`, `isStudentVerified`) is stored reliably with referential integrity to her orders. Marcus benefits from transactional consistency — when he places a last-minute order, the `totalAmount` and `orderStatus` are written atomically, ensuring accurate tracking and pricing. Trish benefits from relational integrity between Products and the `isOfficiallyLicensed` flag, and from reliable storage of `giftOption` and `giftMessage` on her orders.

---

## AI Assistance in Decision

AI (Claude Opus 4.6) was used to help draft this ADR, compare database platform options, and refine the wording. The final decision to use Azure SQL was reviewed and confirmed by the student based on course requirements, the relational nature of the data model, and Azure integration needs. AI did not independently make the final decision.
