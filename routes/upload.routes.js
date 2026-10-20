import { Router } from "express";
import upload from "../config/upload.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.post("/upload", verifyToken, (req, res, next) => {
  upload.single("avatar")(req, res, (error) => {
    if (error) {
      if (error instanceof Error && error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File size must not exceed 5 MB" });
      }
      return res.status(400).json({ error: error.message || "Invalid upload" });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "A valid image file is required in the 'avatar' field",
      });
    }

    return res.status(201).json({ url: `/uploads/${req.file.filename}` });
  });
});

export default router;
