import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import skillRoutes from './routes/skillRoutes';
import commentsRoutes from './routes/commentsRoutes';
import projectRoutes from './routes/projectRoutes';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.ts'; 


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
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});
app.use('/api', skillRoutes);
app.use('/api', commentsRoutes);
app.use('/api', projectRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Your Server is running on port ${PORT}`);
});

export default app;
