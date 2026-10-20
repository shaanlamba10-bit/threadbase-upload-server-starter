import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();
const port = Number(process.env.PORT) || 3000;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const uploadsDirectory = path.join(currentDirectory, "uploads");

app.use(express.json());
app.use("/uploads", express.static(uploadsDirectory));
app.use("/api", uploadRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Upload server listening on port ${port}`);
});
