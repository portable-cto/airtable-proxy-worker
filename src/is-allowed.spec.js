import { isAllowed } from "./is-allowed";

describe("isAllowed()", () => {
  let result;

  describe('when allowed === "*"', () => {
    const allowed = "*";
    const method = "GET";
    const resource = "posts";

    it("returns true", () => {
      result = isAllowed(method, resource, allowed);

      expect(result).toBe(true);
    });
  });

  describe("when allowed undefined", () => {
    const allowed = undefined;
    const method = "GET";
    const resource = "posts";

    it("returns false", () => {
      result = isAllowed(method, resource, allowed);

      expect(result).toBe(false);
    });
  });

  describe("when allowed empty array", () => {
    const allowed = [];
    const method = "GET";
    const resource = "posts";

    it("returns false", () => {
      result = isAllowed(method, resource, allowed);

      expect(result).toBe(false);
    });
  });

  describe("when allowed is array", () => {
    describe("with one object", () => {
      const allowed = [{ method: "GET", resource: "posts" }];

      describe("and method undefined", () => {
        const method = undefined;
        const resource = "posts";

        it("returns false", () => {
          result = isAllowed(method, resource, allowed);

          expect(result).toBe(false);
        });
      });

      describe("and resource undefined", () => {
        const method = "GET";
        const resource = undefined;

        it("returns false", () => {
          result = isAllowed(method, resource, allowed);

          expect(result).toBe(false);
        });
      });

      describe("and non-matching method and resource", () => {
        const method = "GET";
        const resource = "comments";

        it("returns false", () => {
          result = isAllowed(method, resource, allowed);

          expect(result).toBe(false);
        });
      });

      describe("and matching method and resource", () => {
        const method = "GET";
        const resource = "posts";

        it("returns true", () => {
          result = isAllowed(method, resource, allowed);

          expect(result).toBe(true);
        });
      });
    });

    describe("with one object that allows all methods", () => {
      const allowed = [{ method: "*", resource: "posts" }];

      describe("and non-matching resource", () => {
        const method = "GET";
        const resource = "comments";

        it("returns false", () => {
          result = isAllowed(method, resource, allowed);

          expect(result).toBe(false);
        });
      });

      describe("and matching resource", () => {
        const method = "anything-goes-here";
        const resource = "posts";

        it("returns true", () => {
          result = isAllowed(method, resource, allowed);

          expect(result).toBe(true);
        });
      });
    });

    describe("with multiple objects that allow multiple methods", () => {
      const allowed = [
        { method: "GET,PUT", resource: "posts" },
        { method: "POST,GET", resource: "comments" }
      ];

      describe("and matching resource with matching method", () => {
        const method = "POST";
        const resource = "comments";

        it("returns true", () => {
          result = isAllowed(method, resource, allowed);

          expect(result).toBe(true);
        });
      });

      describe("and matching resource with non-matching method", () => {
        const method = "PUT";
        const resource = "comments";

        it("returns false", () => {
          result = isAllowed(method, resource, allowed);

          expect(result).toBe(false);
        });
      });
    });
  });
});
