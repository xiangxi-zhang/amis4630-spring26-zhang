# SUBMISSION

## Repository
Buckeye Marketplace – Milestone 5

## Test Credentials

### Admin User
- Email: `admin@buckeyemarketplace.com`
- Password: `Admin123`

### Regular User
- Email: `user1@test.com`
- Password: `Password1`

If the grader prefers, they can also register a new regular user from the frontend registration page.

## What Was Completed

### Authentication Backend
- ASP.NET Core Identity configured for user management and password hashing.
- Registration endpoint implemented at `POST /api/Auth/register`.
- Login endpoint implemented at `POST /api/Auth/login`.
- JWT generation implemented with role claims and `NameIdentifier` claim.
- Admin user is seeded automatically for testing admin-only features.

### Protected Endpoints
- JWT authentication middleware configured.
- Cart and order endpoints require authentication.
- Admin order and product management endpoints require the Admin role.
- Proper separation between regular user and admin access was tested manually and with backend integration testing.

### Frontend Authentication
- Functional login page.
- Functional registration page.
- Token stored in local storage.
- Auth context manages login state.
- Protected routes redirect unauthenticated users to login.
- Authorized requests automatically include the bearer token.
- Logout is implemented.

### Order Flow
- Checkout section with shipping address input.
- `POST /api/Orders` creates an order from the authenticated user's cart.
- Order confirmation page displays confirmation details.
- Order history page displays the current user's orders.
- Cart is cleared after successful order placement.

### Admin Features
- Admin dashboard page implemented.
- Admin product CRUD through UI.
- Admin order status update through UI.

## Security Practices Applied

### 1. JWT signing key stored outside appsettings
The JWT signing key is read from configuration and user secrets / environment configuration rather than being hardcoded in source code or committed appsettings files.

### 2. Role-based authorization
Admin-only functionality is restricted to users with the Admin role. Regular users cannot access admin-only order and product management endpoints.

### 3. Ownership from JWT, not URL
Current-user order history uses the authenticated user's identity from the JWT rather than trusting a user id from the URL, helping prevent broken object-level authorization.

### 4. Password hashing with ASP.NET Core Identity
Passwords are not stored or compared in plain text. ASP.NET Core Identity handles password hashing and verification.

### 5. CORS restricted to frontend origin
CORS is configured specifically for the frontend development origin `http://localhost:5173`.

## Automated Testing Status

### Backend
- `dotnet test backend.Tests/backend.Tests.csproj` passes
- Includes 3 unit tests and 1 integration test

### Frontend
- `npm run test:run` passes
- Includes 3 frontend unit/component tests

### Playwright E2E
- E2E spec file was created in `frontend/tests/e2e/order-flow.spec.ts`
- Playwright configuration was added
- The E2E flow encountered a blocker in the automated environment during auth/register behavior
- See `docs/e2e-run.md` for exact details and blocker notes

## AI Usage
AI usage is documented in `AI-USAGE.md`.

## Final Notes
Main user-facing milestone features were implemented and manually verified in the browser:
- login
- registration
- cart
- checkout
- order confirmation
- order history
- admin product management
- admin order status updates