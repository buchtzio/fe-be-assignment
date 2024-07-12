import express from 'express';
import authRoutes from './routes/authRoutes';
import characterRoutes from './routes/characterRoutes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);

export default app;
