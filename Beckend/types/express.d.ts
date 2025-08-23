import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
  file?: Express.Multer.File;
}
