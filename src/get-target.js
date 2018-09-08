function getResource(url, config) {
  const paths = url.pathname.split("/");
  let index = 1;

  if (config.prefix) {
    index = paths.indexOf(config.prefix) + 1;
  }

  return paths[index];
}

function getResourceId(url, config) {
  const paths = url.pathname.split("/");
  let index = 2;

  if (config.prefix) {
    index = paths.indexOf(config.prefix) + 2;
  }

  return paths[index] || undefined;
}

function getRequestUrl(resource, resourceId, config, querystring) {
  let airtableBaseUrl =
    config.airtableApiUrl +
    "/" +
    config.airtableApiVersion +
    "/" +
    config.airtableBaseId +
    "/" +
    resource;

  if (resourceId) {
    airtableBaseUrl = airtableBaseUrl + "/" + resourceId;
  }

  return airtableBaseUrl + querystring;
}

export function getTarget(req, config) {
  const url = new URL(req.url);
  const airtableResource = getResource(url, config);
  const airtableResourceId = getResourceId(url, config);

  return {
    airtableResource,
    airtableResourceId,
    airtableRequestUrl: getRequestUrl(
      airtableResource,
      airtableResourceId,
      config,
      url.search
    )
  };
}
