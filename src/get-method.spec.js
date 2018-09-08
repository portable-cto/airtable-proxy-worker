import { getMethod } from "./get-method";

describe("getMethod()", () => {
  let result;

  describe("when no method", () => {
    it("returns falsy", () => {
      const req = {};

      result = getMethod(req);

      expect(result).toBeFalsy();
    });
  });

  describe("when method not a string", () => {
    it("returns falsy", () => {
      const req = { method: 1 };

      result = getMethod(req);

      expect(result).toBeFalsy();
    });
  });

  describe("when method is a string", () => {
    it("returns uppercase method name", () => {
      const req = { method: "get" };

      result = getMethod(req);

      expect(result).toBe("GET");
    });
  });
});
