import path from "path";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const medicineDir = path.join(__dirname, "../uploads/medicine");
if (!fs.existsSync(medicineDir)) fs.mkdirSync(medicineDir, { recursive: true });

const profileDir = path.join(__dirname, "../uploads/profile_images");
if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });

const dependentDir = path.join(__dirname, "../uploads/dependents");
if (!fs.existsSync(dependentDir)) fs.mkdirSync(dependentDir, { recursive: true });

const createStorage = (uploadDir: string) =>
  multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
  });

export const medicineUpload = multer({ storage: createStorage(medicineDir) });
export const profileUpload = multer({ storage: createStorage(profileDir) });
export const dependentUpload = multer({ storage: createStorage(dependentDir) });
