
# Buckeye Marketplace

Buckeye Marketplace is a full-stack web application built for AMIS 4630.  
It allows users to browse products, view product details, and manage a shopping cart.

## Milestone 4 Features

This version includes:

- Product list page connected to a real .NET API
- Product detail page connected to a real .NET API
- Shopping cart with:
  - add to cart
  - update quantity
  - remove item
  - clear cart
- Cart item count shown in the header
- Cart totals calculated automatically
- Persistent data storage with EF Core and SQLite
- Product seed data stored in the database

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Router

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Swagger

## How to Run the Project Locally

### 1. Start the backend

Open a terminal and run:

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run

The backend runs at:

http://localhost:5000

Swagger is available at:

http://localhost:5000/swagger
### 2. Start the frontend

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

`http://localhost:5173`

## Main Routes

### Frontend

* `/` → Product list page
* `/products/:id` → Product detail page
* `/cart` → Shopping cart page

### Backend API

* `GET /api/products`
* `GET /api/products/{id}`
* `GET /api/cart`
* `POST /api/cart`
* `PUT /api/cart/{cartItemId}`
* `DELETE /api/cart/{cartItemId}`
* `DELETE /api/cart/clear`

## Database Notes

This project uses SQLite with Entity Framework Core.

Main entities:

* Product
* Cart
* CartItem

The database is created through EF Core migrations.
Product data is seeded into the database.
Cart data is persisted, so cart contents remain after refresh and restart.

## AI Usage

AI tools were used as productivity support during development.

### Tools used

* ChatGPT GPT-5.4 Thinking
* Claude

### How AI was used

* Helped plan the implementation order for Milestone 4
* Helped scaffold EF Core models, DTOs, and database context
* Helped outline the cart API structure and endpoint logic
* Helped convert the product catalog from an in-memory list to database-backed data
* Helped plan frontend cart state management with Context API
* Helped troubleshoot frontend/backend integration issues
* Helped debug routing, API calls, and local run commands
* Helped draft README documentation and project setup instructions

### What I reviewed, tested, and decided myself

* Verified project structure and file placement before adding new files
* Decided how to organize backend folders such as Models, DTOs, Controllers, and Data
* Reviewed generated code and adjusted it to fit my existing Milestone 3 project
* Replaced hardcoded product data with database-backed product data
* Ran EF Core migrations and confirmed the database was created correctly
* Verified that seeded product data appeared correctly through the API
* Tested backend endpoints in Swagger, including:

  * `GET /api/products`
  * `GET /api/products/{id}`
  * `GET /api/cart`
  * `POST /api/cart`
  * `PUT /api/cart/{cartItemId}`
  * `DELETE /api/cart/{cartItemId}`
  * `DELETE /api/cart/clear`
* Confirmed that adding the same product again increases quantity instead of creating duplicate cart rows
* Confirmed that cart totals, subtotals, quantity updates, remove, and clear actions worked correctly
* Connected frontend cart actions to the real backend API instead of using local-only state
* Manually tested the product list page, product detail page, and cart page in the browser
* Verified that cart count in the header updates after add-to-cart actions
* Checked that the cart page displays the correct item information, totals, and empty-cart state
* Decided final UI structure, button placement, and styling
* Reviewed final behavior end-to-end before submission

## Notes

* Milestone 4 builds on the Milestone 3 product catalog.
* Products now come from the database instead of an in-memory list.
* The shopping cart currently uses a hardcoded demo user ID as required for this stage.