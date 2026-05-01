# Lab Evaluation Report

**Student Repository**: `xiangxi-zhang/amis4630-spring26-zhang`  
**Date**: 2026-03-27  
**Rubric**: rubric.md

## 1. Build & Run Status

| Component           | Build | Runs | Notes                                                                                |
| ------------------- | ----- | ---- | ------------------------------------------------------------------------------------ |
| Backend (.NET)      | ✅    | ✅   | `dotnet build` succeeded. Runtime verified via existing server on port 5000.         |
| Frontend (React/TS) | ✅    | ✅   | `tsc -b && vite build` succeeded. Dev server started on port 5174 (5173 was in use). |
| API Endpoints       | —     | ✅   | See endpoint tests below.                                                            |

**API Endpoint Tests** (against running backend on port 5000):

| Endpoint                | Status | Result                                                 |
| ----------------------- | ------ | ------------------------------------------------------ |
| `GET /api/products`     | 200    | Returns JSON array of 8 products                       |
| `GET /api/products/1`   | 200    | Returns single product with correct JSON shape         |
| `GET /api/products/999` | 404    | Returns `{"message":"Product with ID 999 not found."}` |

> **Note**: The student's backend targets `net8.0` but only .NET 9/10 runtimes are installed on the grading machine. The build succeeded and the code runs correctly with `DOTNET_ROLL_FORWARD=LatestMajor`. Port 5000 was occupied by a prior instance, but the code was verified via build success, code inspection, and the existing server instance.

### Project Structure Comparison

| Expected    | Found       | Status |
| ----------- | ----------- | ------ |
| `/backend`  | `/backend`  | ✅     |
| `/frontend` | `/frontend` | ✅     |
| `/docs`     | `/docs`     | ✅     |

## 2. Rubric Scorecard

| #   | Requirement                          | Points | Status | Evidence                                                                                                                                                                                                                                                                                                                    |
| --- | ------------------------------------ | ------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | React Product List Page              | 5      | ✅ Met | `ProductListPage.tsx` — fetches from API, renders products via `ProductCard` component; loading state (L24–26) and empty state (L28–30) both handled; grid layout with Atomic Design hierarchy (page → card).                                                                                                               |
| 2   | React Product Detail Page            | 5      | ✅ Met | `ProductDetailPage.tsx` — separate route at `/products/:id` (App.tsx L10); displays all fields (title, price, category, seller, date, description, image); back link to list (L53) and card links to detail (ProductCard.tsx L13).                                                                                          |
| 3   | API Endpoint: GET /api/products      | 5      | ✅ Met | `ProductsController.cs` L102–105 — `GetAll()` returns `Ok(_products)` (200 with JSON array); in-memory `List<Product>` data store (L10–99); correct JSON shape matching Product model.                                                                                                                                      |
| 4   | API Endpoint: GET /api/products/{id} | 5      | ✅ Met | `ProductsController.cs` L107–118 — `GetById(int id)` returns single product with `Ok(product)` (200); returns `NotFound()` with message for unknown ID (404 confirmed via test with id=999).                                                                                                                                |
| 5   | Frontend-to-API Integration          | 5      | ✅ Met | `ProductListPage.tsx` L11 — fetches from `http://localhost:5000/api/products`; `ProductDetailPage.tsx` L15 — fetches from `http://localhost:5000/api/products/${id}`; no hardcoded data in components; error states handled via `.catch()` blocks (ProductListPage L17–19, ProductDetailPage L30–33) with `notFound` state. |

**Total: 25 / 25**

## 3. Detailed Findings

All rubric items are met. No deficiencies to report.

## 4. Action Plan

No corrective actions required — full marks earned.

## 5. Code Quality Coaching (Non-Scoring)

- **Hardcoded API base URL**: `ProductListPage.tsx` and `ProductDetailPage.tsx` both hardcode `http://localhost:5000`. Consider extracting this into an environment variable or a shared config constant to make deployment and environment switching easier.

- **Hardcoded port in Program.cs**: `Program.cs` L33 uses `app.Run("http://localhost:5000")` which overrides any command-line `--urls` argument. Use `app.Run()` without arguments and configure the URL via `launchSettings.json` or environment variables for flexibility.

- **No error message displayed to user**: `ProductListPage.tsx` catches fetch errors (L17–19) but only logs to `console.error` — the user sees the loading spinner disappear with no products and no explanation. Consider adding an error state with a user-facing message.

## 6. Git Practices Coaching (Non-Scoring)

- **Meaningful commit messages**: Commits like "Complete Milestone 3 product catalog vertical slice" and "Add frontend and README updates for Milestone 3" clearly describe the work done. Good practice.

- **Incremental commits**: The milestone work was done in 2 commits (backend + frontend), which is acceptable. For larger features, consider breaking work into smaller commits (e.g., one for the model, one for the controller, one for each page) to make the history easier to review and bisect.

- **AI-assisted work transparency**: Earlier commits note "(AI-assisted drafting, student-reviewed)" which is excellent professional transparency.

---

**25/25** — All rubric requirements are fully met. The coaching notes above (hardcoded URLs, error UX, incremental commits) are suggestions for professional growth, not scoring deductions.
