import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body ?? {};

  if (!process.env.JWT_SECRET || !process.env.AUTH_USERNAME || !process.env.AUTH_PASSWORD) {
    return res.status(500).json({ error: "Authentication is not configured" });
  }

  if (username !== process.env.AUTH_USERNAME || password !== process.env.AUTH_PASSWORD) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ sub: username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return res.json({ token, tokenType: "Bearer", expiresIn: 3600 });
});

export default router;
