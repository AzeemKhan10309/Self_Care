import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './Routes/User/UserRoutes.js';
import medicineRoutes from './Routes/Medicine/MedicineRoutes.js';
import doseLogRoutes from './Routes/DoseLog/DoseLogRoutes.js';
import { startRollingWindowExtender } from './jobs/extend-window.js';
import Dependent from './Routes/Dependent/DependentRoutes.js';
import cors from 'cors';
import path from 'path';

async function startServer() {
  try {
    await connectDB();

    try {
      startRollingWindowExtender();
    } catch (err) {
      console.error('Rolling window job failed to start:', err);
    }

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

    app.use((req, res, next) => {
      console.log(req.method, req.url, req.body);
      next();
    });

    app.use('/api/users', userRoutes);
    app.use('/api/medicines', medicineRoutes);
    app.use('/api/dose-log', doseLogRoutes);
    app.use('/api/dependents', Dependent);
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();
