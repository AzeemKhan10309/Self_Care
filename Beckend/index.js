import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});