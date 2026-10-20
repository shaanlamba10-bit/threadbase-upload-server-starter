import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const uploadDirectory = path.resolve("uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDirectory),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname);
    const uniqueName = `avatar-${Date.now()}-${Math.floor(Math.random() * 1_000_000_000)}${extension}`;
    callback(null, uniqueName);
  },
});

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const fileFilter = (_req, file, callback) => {
  callback(null, allowedMimeTypes.has(file.mimetype));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
