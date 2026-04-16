# CHANGELOG

## Milestone 5

### Backend
- Added ASP.NET Core Identity authentication
- Added JWT token generation and validation
- Added admin seeding and role setup
- Added protected cart and order endpoints
- Added order placement flow
- Added current-user order history endpoint
- Added admin order management endpoints
- Added admin product create, update, and delete endpoints
- Updated Program.cs to support configurable connection strings and test-friendly startup

### Frontend
- Added login page
- Added registration page
- Added auth service and auth context
- Added protected route handling
- Added logout functionality
- Added automatic bearer token inclusion for protected API requests
- Added order history page
- Added checkout flow inside cart page
- Added order confirmation page
- Added admin dashboard page
- Added admin product management UI
- Added admin order status update UI

### Testing
- Added frontend Vitest setup
- Added LoginPage test
- Added ProtectedRoute test
- Added OrderHistoryPage test
- Added backend xUnit test project
- Added backend controller unit tests
- Added backend authenticated integration test
- Added Playwright setup and initial E2E spec

### Security
- JWT signing key moved to configuration / user secrets pattern
- Added role-based authorization
- Ensured current-user order retrieval uses JWT identity instead of URL user id
- Restricted CORS to frontend origin