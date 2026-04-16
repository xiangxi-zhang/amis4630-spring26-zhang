import { test, expect } from "@playwright/test";

test("debug register api", async ({ request }) => {
  const email = `e2e_${Date.now()}@test.com`;
  const password = "Password1";

  const registerResponse = await request.post("http://localhost:5000/api/Auth/register", {
    data: {
      email,
      password,
    },
  });

  console.log("REGISTER STATUS:", registerResponse.status());
  console.log("REGISTER BODY:", await registerResponse.text());

  expect(registerResponse.ok()).toBeTruthy();
});
