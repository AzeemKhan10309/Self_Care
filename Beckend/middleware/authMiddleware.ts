import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import type { IUser } from "../Models/User/UserModel.js";
import User from "../Models/User/UserModel.js";

dotenv.config();

export interface AuthRequest extends Request {
  user?: IUser;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: "JWT secret not configured" });

    const decoded = jwt.verify(token, secret) as JwtPayload;
    if (!decoded?.id) return res.status(401).json({ message: "Invalid token payload" });

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(401).json({ message });
  }
};

export default authMiddleware;
