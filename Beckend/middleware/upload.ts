import path from "path";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Medicine folder
const medicineDir = path.join(__dirname, "../uploads/medicine");
if (!fs.existsSync(medicineDir)) fs.mkdirSync(medicineDir, { recursive: true });

// Profile image folder
const profileDir = path.join(__dirname, "../uploads/profile_images");
if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });
// Medicine upload
export const medicineUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, medicineDir),
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
  }),
});

// Profile image upload
export const profileUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, profileDir),
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
  }),
});
