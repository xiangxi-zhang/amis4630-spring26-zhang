# Buckeye Marketplace — Component Architecture

This document defines the component hierarchy for the **Product Catalog** feature using Atomic Design principles. All components are built in React with TypeScript. Following the course framework, **React is the "Cockpit"** — the presentation layer where users browse, search, and filter products — while the **.NET Web API is the "Engine"** that supplies product data via REST/JSON endpoints. Components receive data exclusively through **Props**, maintaining clean **decoupling** between the frontend and backend.

---

## Component Hierarchy (Atomic Design)

### Atoms

| Component | Responsibility | Persona Support |
| --- | --- | --- |
| `PriceTag` | Displays the formatted unit price of a product. Shows the all-in price clearly with no hidden costs. | **Maya** — budget transparency at a glance. |
| `OfficialBadge` | Renders a small "Officially Licensed" indicator when `isOfficiallyLicensed` is true. | **Trish** — builds trust that the product is authentic OSU merchandise. |
| `StarRating` | Displays the average review rating as a visual star indicator (e.g., 4.2 / 5). | **Maya** — helps make confident purchase decisions on a budget. |
| `SearchInput` | A controlled text input field for entering product search queries. | **Marcus** — enables fast keyword search to find gear quickly before game day. |

### Molecules

| Component | Responsibility | Persona Support |
| --- | --- | --- |
| `ProductCard` | Combines `PriceTag`, `OfficialBadge`, and `StarRating` with the product image and name into a single browsable card. | **All personas** — the primary unit of product discovery. |
| `FilterBar` | Groups filter controls (category dropdown, price range slider, "Officially Licensed" toggle) into a horizontal toolbar. | **Maya** — filters by price range to stay within budget. **Trish** — filters for officially licensed products only. |
| `SearchBar` | Wraps `SearchInput` with a submit button and optional category scope selector. | **Marcus** — fast, prominent search for last-minute shopping. |

### Organisms

| Component | Responsibility | Persona Support |
| --- | --- | --- |
| `ProductGrid` | Receives an array of product data via Props and renders a responsive grid of `ProductCard` components. Handles empty-state messaging when no products match filters. | **All personas** — the main browsing surface for the catalog. |
| `CatalogToolbar` | Combines `SearchBar` and `FilterBar` into a unified toolbar above the product grid. Manages local filter/search state and passes callbacks up to the page. | **Maya** — price filtering. **Marcus** — fast search. **Trish** — licensed-only toggle. |

### Templates

| Component | Responsibility | Persona Support |
| --- | --- | --- |
| `CatalogLayout` | Defines the page structure: header area for `CatalogToolbar`, main content area for `ProductGrid`, and optional sidebar for advanced filters. Does not fetch data — only arranges child components. | Provides a consistent, responsive layout for all users regardless of device. |

### Pages

| Component | Responsibility | Persona Support |
| --- | --- | --- |
| `ProductCatalogPage` | The top-level route component. Calls the .NET API endpoint (`GET /api/products`) on mount, manages loading/error states, and passes product data down as **Props** to `CatalogLayout` → `ProductGrid` → `ProductCard`. This is the only component that communicates with the Engine. | **All personas** — single entry point that fetches data from the .NET Engine and distributes it through the component tree via Props. |

---

## Data Flow Explanation

The data flow follows a unidirectional pattern that maintains strict **decoupling** between the backend Engine and the frontend Cockpit:

1. **Engine → Cockpit:** The `ProductCatalogPage` sends a **REST** request (`GET /api/products`) over **HTTPS** to the .NET Web API. The API queries Azure SQL and returns product data as a **JSON** array.

2. **Page → Template → Organism → Molecule → Atom:** The page component stores the JSON response in React state, then passes it down as typed **Props** through the component hierarchy. `CatalogLayout` receives the full product array and passes it to `ProductGrid`, which maps each product object to a `ProductCard`, which in turn distributes individual fields to `PriceTag`, `OfficialBadge`, and `StarRating`.

3. **User actions flow upward:** When a user types in `SearchInput` or adjusts `FilterBar`, callback functions (passed down as Props) propagate the event back up to `ProductCatalogPage`, which re-fetches or filters data and triggers a re-render down the tree.

This architecture ensures that no Atom or Molecule component knows where its data came from — it only knows the shape of its Props. The Engine and Cockpit can evolve independently.

---

## TypeScript Code Example

TypeScript enforces **type safety** at compile time, ensuring that every component receives the correct data shape. If the .NET API changes a field name or type, TypeScript will flag the mismatch before the code reaches production.

```typescript
interface ProductCardProps {
  productName: string;
  unitPrice: number;
  category: string;
  averageRating: number;
  isOfficiallyLicensed: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  unitPrice,
  category,
  averageRating,
  isOfficiallyLicensed,
}) => {
  return (
    <div className="product-card">
      <h3>{productName}</h3>
      <PriceTag price={unitPrice} />
      <StarRating rating={averageRating} />
      {isOfficiallyLicensed && <OfficialBadge />}
    </div>
  );
};
```

By defining `ProductCardProps` as an interface, TypeScript guarantees that `unitPrice` is always a `number` (never accidentally a string) and that `isOfficiallyLicensed` is always a `boolean`. This reduces runtime errors and improves long-term **maintainability** as the component library grows across milestones.

---

## AI Usage

AI (Claude Opus 4.6) was used to help draft the component hierarchy structure, Atomic Design breakdown, and TypeScript code example. All content was reviewed, edited, and approved by the student to ensure alignment with course requirements (React as Cockpit, .NET as Engine), Atomic Design principles, and Milestone 1 persona needs. AI did not independently make design decisions.
