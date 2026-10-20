import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.slice("Bearer ".length).trim();
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "Server authentication is not configured" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
