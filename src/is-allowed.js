export function isAllowed(method, resource, allowed) {
  if (allowed === "*") {
    return true;
  }

  if (
    method !== undefined &&
    resource !== undefined &&
    allowed !== undefined &&
    allowed.length > 0
  ) {
    return !!allowed.find(item => {
      if (item.resource === resource) {
        if (item.method === "*") {
          return true;
        }
        if (item.method !== undefined) {
          return !!item.method
            .split(",")
            .find(itemMethod => itemMethod === method);
        }
      }
    });
  }

  return false;
}
