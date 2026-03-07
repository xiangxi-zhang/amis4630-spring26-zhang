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

## Milestone 3: Product Catalog Vertical Slice

# Buckeye Marketplace

Buckeye Marketplace is an OSU-themed online merchandise platform designed to make Ohio State products easier to browse and purchase for different types of users, including students, fans, and alumni.

## Milestone 3: Product Catalog Vertical Slice

This milestone implements the first working vertical slice of the Buckeye Marketplace project.  
The focus of this milestone was building a functional product catalog experience that connects a React frontend to a live ASP.NET Core Web API backend.

### Features completed
- Product List page
- Product Detail page
- React Router navigation
- ASP.NET Core Web API with:
  - `GET /api/products`
  - `GET /api/products/{id}`
- In-memory sample product data
- Loading state
- Empty state
- Product not found handling

### Tech stack
- Frontend: React + TypeScript + Vite
- Backend: ASP.NET Core Web API
- Routing: react-router-dom

## How to run the backend

```bash
cd backend
dotnet run
````

Backend URL:
`http://localhost:5000`

## How to run the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:
`http://localhost:5173`

## Screenshots

* Product List page
* Product Detail page
* Product not found page

## Design notes

This milestone implements a product catalog for an OSU-themed online merchandise platform.

The final product data, categories, descriptions, and seller names were adjusted so the catalog better matched the Buckeye Marketplace concept and the Milestone 1 personas. The layout and styling were also kept simple and beginner-friendly so the implementation would be easy to explain and test.

## AI Tool Usage

I used Claude Opus 4.6 as a productivity aid during Milestone 3. I remained responsible for reviewing, editing, testing, and deciding what was appropriate for the final submission.

### How AI helped

Claude helped with:

* scaffolding backend setup in `Program.cs`
* generating the `Product` model
* generating the initial `ProductsController`
* generating React frontend files such as `App.tsx`, `types.ts`, `ProductCard.tsx`, `ProductListPage.tsx`, and `ProductDetailPage.tsx`
* suggesting loading, empty, and not-found states
* helping identify TypeScript import issues
* helping identify layout issues caused by default Vite CSS
* helping revise sample product data so the project aligned with the intended online merchandise platform

### Actual prompts used

#### Backend project background

```text
I am building Milestone 3 for my course project, Buckeye Marketplace.
Project context:
- This is an OSU-themed e-commerce platform.
- Milestone 1 defined personas such as Maya (student), Marcus (fan), and Trish (alumna).
- Milestone 2 defined the architecture and atomic component design.
- For Milestone 3, I need to build the first working vertical slice for the Product Catalog.
Tech stack:
- Frontend: React + TypeScript + Vite
- Backend: ASP.NET Core Web API using controllers
- The frontend runs on http://localhost:5173
- The backend should run on http://localhost:5000
- I am using in-memory sample data for this milestone, not a real database
Milestone 3 requirements:
- Create a Product List page
- Create a Product Detail page
- Use React Router
- Use fetch to get live data from the backend API
- Include loading state and empty state
- Create GET /api/products
- Create GET /api/products/{id}
- Return 404 if a product is not found
- Use at least 8 sample products across at least 3 categories
- Product fields must include:
  id, title, description, price, category, sellerName, postedDate, imageUrl
Important:
- Please generate code that is simple, beginner-friendly, and easy to explain in class.
- Do not use a database, Redux, Context API, or advanced architecture.
- Keep the code aligned with a student milestone project.
```

#### Prompt for `Program.cs`

```text
Using the project background above, please write a complete Program.cs file for my ASP.NET Core Web API backend.
Requirements:
- Use controllers
- Keep Swagger enabled in development
- Enable CORS for my React frontend running on http://localhost:5173
- Keep the code simple and beginner-friendly
- Do not add unnecessary complexity
Please output the full contents of Program.cs only.
```

#### Prompt for `Product.cs`

```text
Please write the full contents of Product.cs for my ASP.NET Core backend.
Requirements:
- Namespace: backend.Models
- Class name: Product
- Include these fields only:
  Id (int)
  Title (string)
  Description (string)
  Price (decimal)
  Category (string)
  SellerName (string)
  PostedDate (DateTime)
  ImageUrl (string)
Please output the full code for Product.cs only.
```

#### Prompt for `ProductsController.cs`

```text
I have my Product.cs model ready in backend.Models. Now, please write the full code for ProductsController.cs.
Requirements:
Namespace: backend.Controllers
Use using backend.Models;
Use using Microsoft.AspNetCore.Mvc;
Controller name: ProductsController
Use [ApiController] and [Route("api/[controller]")]
Create a private static readonly List<Product> _products containing exactly 8 sample products.
Use at least 3 categories.
DATA DESIGN (Crucial): The products must align with my M1 Personas:

For Maya (Budget Student): Include affordable campus essentials like hoodies, laptop sleeves, and wireless earbuds priced under $45.
For Marcus (Local Fan): Include scarlet and gray game-day gear like baseball caps, scarves, and apparel.
For Trish (Alumna): Include premium gift items like diploma frames, curated alumni gift boxes, and ceramic mug gift sets.

IMAGES: Use https://picsum.photos/seed/{id}/200 for unique placeholder images.
ENDPOINTS:
[HttpGet] → returns all products
[HttpGet("{id}")] → returns a single product by ID, or NotFound() if not found

Keep the code simple and beginner-friendly.
Please output the full code for ProductsController.cs only.
```

#### Prompt for `App.tsx`

```text
My .NET backend is already running on http://localhost:5000. 
I am building the React frontend for Milestone 3 of Buckeye Marketplace.
Please provide the full contents of src/App.tsx using React + TypeScript and react-router-dom.
Requirements:
- Set up two routes:
  - "/" goes to ProductListPage
  - "/products/:id" goes to ProductDetailPage
- Import ProductListPage and ProductDetailPage from a "pages" folder.
- Since I have not created those pages yet, include very simple temporary stub components in the same file so the app can compile without crashing.
- Keep the code simple and beginner-friendly.
- Please output the full contents of App.tsx only.
```

#### Prompt for `types.ts`

```text
Please provide the full contents of src/types.ts for my React + TypeScript frontend.
Requirements:
- Define a Product interface
- Use these fields:
  id, title, description, price, category, sellerName, postedDate, imageUrl
- Keep it simple and beginner-friendly
- Output src/types.ts only
```

#### Prompt for `ProductCard.tsx`

```text
Please provide the full contents of src/components/ProductCard.tsx.
Requirements:
- Use React + TypeScript
- Import the Product type from "../types"
- Accept a product prop
- Display title, price, category, and sellerName
- Make the card clickable using Link from react-router-dom
- Clicking should go to /products/{id}
- Keep the code simple and beginner-friendly
- Use basic CSS or inline styles only
- Output src/components/ProductCard.tsx only
```

#### Prompt for `ProductListPage.tsx` and `ProductDetailPage.tsx`

```text
My .NET backend is already running on http://localhost:5000.
Please provide the full contents of these two files only:
- src/pages/ProductListPage.tsx
- src/pages/ProductDetailPage.tsx
Requirements for ProductListPage:
- Use React + TypeScript
- Fetch data from http://localhost:5000/api/products
- Import the Product type from "../types"
- Import ProductCard from "../components/ProductCard"
- Handle loading state
- Handle empty state
- Render ProductCard components in a simple grid
Requirements for ProductDetailPage:
- Use React + TypeScript
- Use useParams to get the product id
- Fetch data from http://localhost:5000/api/products/{id}
- Display all fields: image, title, description, price, category, sellerName, postedDate
- Handle loading state
- Handle the case where the product is not found
- Show a simple "Product not found" message if fetch fails or no product is returned
- Include a link back to "/"
Keep the code simple and beginner-friendly.
Please output only those two files.
```

### What I accepted from AI output

I accepted the overall scaffolding and basic code structure for:

* `Program.cs`
* `Product.cs`
* `ProductsController.cs`
* `App.tsx`
* `types.ts`
* `ProductCard.tsx`
* `ProductListPage.tsx`
* `ProductDetailPage.tsx`

I also accepted the general implementation patterns suggested by AI for:

* setting up React Router
* using `useEffect` and `useState` for API fetching
* returning `NotFound()` from the backend
* using loading and empty states in the frontend
* using placeholder image URLs during development

### What I modified from AI output

I did not submit the AI output exactly as generated. I made several changes before submission, including:

* adding `app.UseAuthorization();` to `Program.cs`
* fixing and adjusting port/CORS configuration so the backend ran on `http://localhost:5000`
* correcting TypeScript imports to use type-only imports
* changing `React.CSSProperties` references to use imported `CSSProperties`
* removing temporary stub components from `App.tsx` once the real page files were created
* revising layout and CSS by removing the default Vite template styling from `index.css` and `App.css`
* adjusting the product grid layout so the cards displayed in multiple columns instead of one narrow column
* revising the sample product data so it matched the intended OSU-themed online merchandise platform
* revising product categories, descriptions, and seller names so they fit the Buckeye Marketplace concept better

### What I rejected from AI output

I rejected or did not keep several AI suggestions, including:

* unnecessary extra fields that were not part of the rubric
* keeping temporary stub page components in the final frontend
* default Vite template styling that interfered with the product grid layout
* parts of generated code that caused TypeScript import issues without revision
* sample product content that did not fit the final Buckeye Marketplace concept closely enough

### Where I relied on my own judgment

I relied on my own judgment in the following areas:

* deciding how the Buckeye Marketplace concept should be presented in the final implementation
* deciding which sample products fit the Buckeye Marketplace concept and personas best
* deciding to revise seller names, product descriptions, and categories so they better matched the Milestone 1 personas and the overall project vision
* deciding to simplify styling and keep the UI beginner-friendly instead of adding more complex libraries or architecture
* reviewing all generated code, testing backend endpoints manually, testing frontend navigation manually, and confirming that the final implementation matched the milestone rubric

### Responsibility statement

Claude helped me move faster, but I remained responsible for understanding the code, editing it, testing it, and deciding what was appropriate for my project before submission.

