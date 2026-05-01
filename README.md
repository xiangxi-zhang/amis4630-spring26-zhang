# Buckeye Marketplace

Buckeye Marketplace is a full-stack web application for browsing and purchasing Ohio State-themed products. The project was built for AMIS 4630 and demonstrates a complete software development process, including planning, architecture, frontend development, backend development, database design, authentication, testing, CI/CD, and production deployment.

## Live Application URLs

**Frontend Live Site:**  
https://xiangxi-zhang.github.io/amis4630-spring26-zhang/

**Backend Swagger API:**  
https://xiangxi-api-0420-d7cfg9grdsdma7gc.canadacentral-01.azurewebsites.net/swagger/index.html

**Products API Endpoint:**  
https://xiangxi-api-0420-d7cfg9grdsdma7gc.canadacentral-01.azurewebsites.net/api/products

**GitHub Repository:**  
https://github.com/xiangxi-zhang/amis4630-spring26-zhang

---

## Project Description

Buckeye Marketplace is designed as a centralized online marketplace for Ohio State-related merchandise. Users can browse products, view product details, create an account, log in, add products to a shopping cart, place orders, and view order history.

The project also includes admin functionality. Admin users can manage product listings and update order statuses. The goal of the project is to provide a simple online shopping experience while demonstrating full-stack software development concepts.

---

## Main Features

### User Features

- Browse available products
- View product details
- Create a user account
- Log in and log out
- Add products to cart
- View cart items
- Update cart item quantities
- Remove items from cart
- Clear cart
- Place an order with a shipping address
- View order confirmation
- View order history

### Admin Features

- View all products
- Create new products
- Update existing products
- Delete products
- View customer orders
- Update order status

### Technical Features

- React frontend with TypeScript
- ASP.NET Core Web API backend
- Entity Framework Core data access
- SQLite for local development
- Azure SQL Database for production
- ASP.NET Core Identity
- JWT authentication
- Protected user routes
- Admin functionality
- Swagger API documentation
- GitHub Actions CI/CD workflows
- Azure App Service backend deployment
- GitHub Pages frontend deployment

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Vitest
- React Testing Library

### Backend

- ASP.NET Core Web API
- C#
- Entity Framework Core
- ASP.NET Core Identity
- JWT Bearer Authentication
- Swagger / OpenAPI
- xUnit

### Database

- SQLite for local development
- Azure SQL Database for production

### Deployment and DevOps

- Azure App Service
- Azure SQL Database
- GitHub Pages
- GitHub Actions

---

## Project Architecture

The deployed system uses a separated frontend and backend architecture.

```text
User Browser
    ↓
GitHub Pages Frontend
    ↓ HTTPS API Requests
Azure App Service Backend API
    ↓
Azure SQL Database

## Repository Structure

```text
amis4630-spring26-zhang/
│
├── backend/
│   ├── Controllers/
│   ├── Data/
│   ├── Models/
│   ├── Program.cs
│   └── backend.csproj
│
├── backend.Tests/
│   └── Backend tests
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── test/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.app.json
│
├── .github/
│   └── workflows/
│       ├── backend-deploy.yml
│       └── frontend-pages.yml
│
└── README.md
```

---

## Local Development Setup

### Prerequisites

Install the following tools before running the project locally:

* .NET SDK
* Node.js and npm
* Git
* Visual Studio Code or another code editor

---

## Running the Backend Locally

From the repository root, run:

```bash
cd backend
dotnet restore
dotnet build
dotnet run
```

The backend should run at:

```text
http://localhost:5000
```

Swagger should be available at:

```text
http://localhost:5000/swagger
```

---

## Running the Frontend Locally

Open a second terminal from the repository root and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend should run at:

```text
http://localhost:5173
```

---

## Running Tests

### Backend Tests

From the repository root:

```bash
dotnet test backend.Tests/backend.Tests.csproj
```

### Frontend Tests

From the repository root:

```bash
cd frontend
npm test
```

To build the frontend:

```bash
npm run build
```

---

## Environment Variables

The backend uses configuration values for the database connection and JWT authentication.

### Local Development

For local development, the backend can use SQLite:

```text
Data Source=buckeyemarketplace.db
```

JWT configuration should be provided through user secrets or local configuration.

Required JWT settings:

```text
Jwt:Key
Jwt:Issuer
Jwt:Audience
```

### Production Environment

In Azure App Service, the following app settings were configured:

```text
Jwt__Key
Jwt__Issuer
Jwt__Audience
```

The production database connection string was configured in Azure App Service under Connection Strings:

```text
DefaultConnection
```

The connection string type was set to:

```text
SQLAzure
```

---

## API Documentation

The backend API is documented with Swagger.

Production Swagger URL:

```text
https://xiangxi-api-0420-d7cfg9grdsdma7gc.canadacentral-01.azurewebsites.net/swagger/index.html
```

Important API areas include:

```text
/api/Auth/register
/api/Auth/login
/api/Products
/api/Cart
/api/Orders
```

Some endpoints are public, such as browsing products. Cart, order, and admin endpoints require authentication.

---

## Database Schema

The database contains the main entities needed for the marketplace.

```text
ApplicationUser
    └── Identity user for authentication

Product
    ├── Id
    ├── Title
    ├── Description
    ├── Price
    ├── Category
    ├── SellerName
    ├── PostedDate
    └── ImageUrl

Cart
    ├── CartId
    ├── UserId
    └── CartItems

CartItem
    ├── CartItemId
    ├── CartId
    ├── ProductId
    └── Quantity

Order
    ├── OrderId
    ├── UserId
    ├── OrderDate
    ├── Status
    ├── Total
    ├── ShippingAddress
    ├── ConfirmationNumber
    └── OrderItems

OrderItem
    ├── OrderItemId
    ├── OrderId
    ├── ProductId
    ├── UnitPrice
    ├── Quantity
    └── LineTotal
```

Relationship overview:

```text
User → Cart → CartItems → Products
User → Orders → OrderItems → Products
```

---

## Production Deployment

### Backend Deployment

The backend API is deployed to Azure App Service.

App Service name:

```text
xiangxi-api-0420
```

Runtime stack:

```text
.NET 10
```

Operating system:

```text
Linux
```

Startup command:

```text
dotnet /home/site/wwwroot/backend.dll
```

The backend uses Azure SQL Database in production through the `DefaultConnection` connection string.

### Frontend Deployment

The frontend is deployed through GitHub Pages.

Frontend URL:

```text
https://xiangxi-zhang.github.io/amis4630-spring26-zhang/
```

Because GitHub Pages hosts the project under the repository path, Vite and React Router were configured for the repository base path.

Vite base setting:

```text
base: "/amis4630-spring26-zhang/"
```

React Router basename:

```text
basename="/amis4630-spring26-zhang"
```

A GitHub Pages fallback file was also created during deployment by copying `index.html` to `404.html` so that React Router routes still work when the page is refreshed.

```bash
cp dist/index.html dist/404.html
```

---

## CI/CD Pipeline

GitHub Actions is used for automated deployment.

### Backend Workflow

The backend workflow:

* Runs when backend code or backend workflow files change
* Restores .NET dependencies
* Builds the backend
* Runs backend tests
* Publishes the backend
* Deploys the backend to Azure App Service

Workflow name:

```text
Backend Deploy to Azure App Service
```

### Frontend Workflow

The frontend workflow:

* Runs when frontend code or frontend workflow files change
* Installs npm dependencies
* Builds the Vite React frontend
* Creates the GitHub Pages fallback file
* Uploads the build artifact
* Deploys the frontend to GitHub Pages

Workflow name:

```text
Frontend Deploy to GitHub Pages
```

Both workflows completed successfully in GitHub Actions.

---

## Testing and Quality Assurance

The project was tested through automated tests and manual end-to-end testing.

### Tested User Flows

* Browse products
* View product details
* Register account
* Log in
* Add item to cart
* View cart
* Place order
* View order confirmation
* View order history

### Tested Admin Flows

* View admin page
* Manage products
* View orders
* Update order status

### Browser and Device Testing

The production application was tested in Chrome. The interface was also checked for responsive behavior by resizing the browser window.

### Bug Fixes from Testing

Important issues fixed during testing and deployment included:

* Azure App Service application error caused by production configuration issues
* Azure SQL firewall access issue
* GitHub Pages frontend deployment workflow failure
* React Router basename issue on GitHub Pages
* GitHub Pages 404 issue when refreshing subpages
* CORS configuration for frontend-to-backend API requests

---

## AI Tool Usage Summary

AI tools were used throughout the Buckeye Marketplace project as learning and development support tools.

### GitHub Copilot

GitHub Copilot was used mainly for coding support. It helped suggest repeated patterns for React components, frontend service functions, backend controller methods, and test structure. Copilot was useful for speeding up common coding tasks, but all suggested code had to be reviewed and tested.

### Claude / AI Assistant

Claude was used across multiple SDLC phases, including planning, design, implementation, testing, deployment, and documentation. It helped explain error messages, suggest debugging steps, organize architecture documentation, troubleshoot Azure and GitHub Actions issues, and structure the final documentation.

AI was not used as a replacement for completing the project. The final code, Azure resources, GitHub Actions workflows, testing, screenshots, and deployment verification were completed and checked manually.

---

## Known Issues and Future Improvements

Future improvements could include:

* Better visual styling for the frontend
* More product filtering and search options
* More complete admin dashboard design
* Improved mobile styling
* More automated end-to-end tests
* Better role-based admin security UI
* Custom domain configuration
* More detailed production monitoring

---

## Author

Xiangxi Zhang
AMIS 4630
Buckeye Marketplace

````


