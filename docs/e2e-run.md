# E2E Run Notes

## Goal
Create and run a Playwright happy-path test for:
- auth
- browse products
- add to cart
- checkout
- order confirmation
- order history

## Files Added
- `frontend/playwright.config.ts`
- `frontend/tests/e2e/order-flow.spec.ts`

## Commands Run
From `frontend`:
- `npm install -D @playwright/test`
- `npx playwright install`
- `npm run e2e`

## What Worked
- Playwright was installed successfully
- Playwright config file was created
- E2E spec file was created
- Playwright was able to launch and execute the spec
- The backend and frontend test servers were started automatically by Playwright

## Blocker Encountered
The automated E2E flow hit an auth-related blocker in the Playwright environment.

Observed issues during attempts:
1. login remained on `/login` instead of redirecting
2. UI registration remained on `/register` instead of redirecting
3. direct API registration attempts returned `403`
4. the `403` did not come from the explicit business logic branches inside `AuthController`, which suggests the request was being blocked before the controller action completed normally in the automated environment

## What I Verified Separately
Even though the Playwright run was blocked, the main user flow was manually verified in the browser:
- login
- add to cart
- cart page
- shipping address entry
- place order
- order confirmation page
- order history page
- admin dashboard
- admin product CRUD
- admin order status update

## Current Status
- Playwright setup exists
- E2E spec exists
- blocker documented honestly
- backend and frontend automated tests pass
- manual end-to-end flow works in browser

## Next Improvement If More Time Were Available
If I had more time, I would continue isolating the pre-controller auth / registration 403 in the Playwright-hosted environment and add more stable selectors or instrumentation around the auth flow.