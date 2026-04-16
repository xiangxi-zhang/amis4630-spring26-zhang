# AI-USAGE

## Tools Used
- ChatGPT
- GitHub Copilot
- GitHub Copilot Agent / testing workflow ideas

## How AI Was Used
AI was used as a coding assistant and reviewer for Milestone 5. I used it to:
- break down the milestone requirements
- scaffold authentication and JWT setup
- generate and revise frontend auth files
- scaffold admin UI pages and services
- generate backend and frontend test files
- debug integration testing setup
- draft submission documentation

## Example Prompts
- "Give me a complete OrdersController for my current models and DTOs."
- "Help me add frontend auth context, login page, register page, and protected routes."
- "Generate 3 backend unit tests and 1 integration test for my existing controllers."
- "Generate 3 frontend tests using Vitest and React Testing Library."
- "Help me document the exact E2E blocker honestly for Milestone 5."

## What AI Got Wrong
One repeated issue was file/path assumptions during testing setup. In several cases, AI-generated instructions assumed files already existed or were saved when they were not actually written to disk yet. I caught this by checking with terminal commands like `ls` and `cat` before rerunning tests.

Another issue was the backend integration test database setup. Early versions mixed SQLite and InMemory providers incorrectly and caused provider conflicts. I caught this by reading the actual `dotnet test` output and then adjusted the configuration and startup sequence until tests passed.

## Verification Steps I Performed
I did not rely on AI responses alone. I manually verified:
- Swagger auth endpoints
- admin and regular-user behavior
- frontend login / logout behavior
- cart, checkout, confirmation, and order history
- admin product CRUD and order status update UI
- `dotnet test`
- `npm run test:run`
- Playwright E2E attempts and blocker details

## Commands Run

### Backend
- `dotnet run`
- `dotnet test backend.Tests/backend.Tests.csproj`

### Frontend
- `npm run dev`
- `npm run test:run`

### Playwright
- `npm run e2e`

## Final Reflection
AI significantly sped up implementation and debugging, but it still required careful review. I had to inspect diffs, confirm file paths, rerun tests, and verify app behavior manually. The most helpful use of AI was accelerating repetitive scaffolding and helping isolate testing/environment issues.