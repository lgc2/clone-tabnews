test("PUT to /api/v1/migrations returns 404", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });
  expect(response.status).toBe(405);

  const responseBodyText = await response.text();
  expect(responseBodyText).toBe("");
});
