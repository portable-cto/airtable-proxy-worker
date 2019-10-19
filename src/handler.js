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

    const response = await fetch(target.airtableRequestUrl, {
      headers: {
        Authorization: `Bearer ${config.airtableApiKey}`,
        "Content-type": "application/json"
      },
      method: method,
      body: req.body
    });

    const body = await response.body;

    const headers = new Headers();
    for (const kv of response.headers.entries()) {
      headers.append(kv[0], kv[1]);
    }
    headers.set("Cache-Control", "max-age=" + config.cacheTime);

    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers
    });
  } catch (e) {
    console.error(e);

    return new Response("Bad Request", {
      status: 400,
      statusText: "Bad Request"
    });
  }
}
