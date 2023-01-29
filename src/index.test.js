import { createGridMatrix } from "./index.js";

test("given  ", () => {
  const gridMatrix = createGridMatrix(2, 2);
  expect(gridMatrix).toBe([
    [0, 0],
    [0, 0],
  ]);
});
