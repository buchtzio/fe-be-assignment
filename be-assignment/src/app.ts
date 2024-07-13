import express from 'express';
import authRoutes from './routes/authRoutes';
import characterRoutes from './routes/characterRoutes';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);

export default app;
