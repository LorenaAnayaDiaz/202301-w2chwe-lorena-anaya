import { sum } from "./initial-test.js";
test("given two values 2 and 3, when you add them together, then you get 5 ", () => {
  const result = sum(2, 3);
  expect(result).toBe(5);
});
