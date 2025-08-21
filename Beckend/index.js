import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/User/userRoutes.js';
import medicineRoutes from './routes/Medicine/MedicineRoutes.js';
import doselog from './routes/DoseLog/DoseLogRoute.js'
import emergancycontacts from './routes/EmerygancyContacts/EmergancyContacts.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use('/api/users', userRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/doselog' , doselog)
app.use('/api/emg' , emergancycontacts)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});