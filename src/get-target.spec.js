import { getTarget } from "./get-target";

describe("getTarget()", () => {
  let result;
  const appBaseUrl = "https://www.example.com";
  const resource = "posts";
  const querystring = "?foo=bar";
  const req = {};
  const config = {
    airtableApiUrl: "https://api.airtable.com",
    airtableBaseId: "abcd123",
    airtableApiVersion: "v0"
  };

  describe("when no prefix", () => {
    beforeEach(() => {
      config.prefix = "";
    });

    describe("and no resourceId", () => {
      beforeEach(() => {
        req.url = appBaseUrl + "/" + resource + querystring;

        result = getTarget(req, config);
      });

      it("returns resource", () => {
        expect(result.airtableResource).toBe(resource);
      });

      it("returns no resource ID", () => {
        expect(result.airtableResourceId).toBeFalsy();
      });

      it("returns request URL", () => {
        expect(result.airtableRequestUrl).toBe(
          config.airtableApiUrl +
            "/" +
            config.airtableApiVersion +
            "/" +
            config.airtableBaseId +
            "/" +
            resource +
            querystring
        );
      });
    });

    describe("and resourceId", () => {
      const resourceId = "567efg";

      beforeEach(() => {
        req.url = appBaseUrl + "/" + resource + "/" + resourceId + querystring;

        result = getTarget(req, config);
      });

      it("returns resource", () => {
        expect(result.airtableResource).toBe(resource);
      });

      it("returns resource ID", () => {
        expect(result.airtableResourceId).toBe(resourceId);
      });

      it("returns request URL", () => {
        expect(result.airtableRequestUrl).toBe(
          config.airtableApiUrl +
            "/" +
            config.airtableApiVersion +
            "/" +
            config.airtableBaseId +
            "/" +
            resource +
            "/" +
            resourceId +
            querystring
        );
      });
    });
  });

  describe("when prefix", () => {
    beforeEach(() => {
      config.prefix = "api";
    });

    describe("and no resourceId", () => {
      beforeEach(() => {
        req.url =
          appBaseUrl + "/" + config.prefix + "/" + resource + querystring;

        result = getTarget(req, config);
      });

      it("returns resource", () => {
        expect(result.airtableResource).toBe(resource);
      });

      it("returns no resource ID", () => {
        expect(result.airtableResourceId).toBeFalsy();
      });

      it("returns request URL", () => {
        expect(result.airtableRequestUrl).toBe(
          config.airtableApiUrl +
            "/" +
            config.airtableApiVersion +
            "/" +
            config.airtableBaseId +
            "/" +
            resource +
            querystring
        );
      });
    });
  });
});
