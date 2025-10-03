// server/middleware/ApiKeyAuth.js
export default function apiKeyAuth(req, res, next) {
  const configKey = process.env.TRACER_API_KEY;
  const key = req.headers["x-api-key"];

  if (!key || key !== configKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}
