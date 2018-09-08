import { isAllowed } from "./is-allowed";
import { getMethod } from "./get-method";
import { getTarget } from "./get-target";

const config = { ...wpConfig };
const parseJson = obj => {
  try {
    return JSON.parse(obj);
  } catch (e) {
    return obj;
  }
};

export async function handleRequest(req) {
  try {
    const method = getMethod(req);
    const target = getTarget(req, config);

    if (
      !isAllowed(
        method,
        target.airtableResource,
        parseJson(config.allowedTargets)
      )
    ) {
      return new Response("Method Not Allowed", {
        status: 405,
        statusText: `Method "${method}" not allowed on "${
          target.airtableResource
        }" resource`
      });
    }

    return fetch(target.airtableRequestUrl, {
      headers: {
        Authorization: `Bearer ${config.airtableApiKey}`,
        "Content-type": "application/json"
      },
      method: method
    });
  } catch (e) {
    console.error(e);

    return new Response("Bad Request", {
      status: 400,
      statusText: "Bad Request"
    });
  }
}
