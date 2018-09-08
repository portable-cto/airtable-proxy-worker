export function getMethod(req) {
  return req.method && req.method.toUpperCase && req.method.toUpperCase();
}
