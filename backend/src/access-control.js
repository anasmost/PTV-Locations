export const allowedHosts = ["localhost", "ptv", "omniyat"];

export default function accessControlMiddleware(req, res, next) {
  if (allowedHosts.includes(req.hostname) || allowedHosts.toString() == "*") {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    next();
  }
}
