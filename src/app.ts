import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
  
app.use('/api', authRoutes);
app.use('/api', blogRoutes);

app.listen(PORT, () => {
  console.log(`Your Server is running on port ${PORT}`);
});
