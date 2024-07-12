import express from 'express';
import config from 'config';
import authRoutes from './routes/authRoutes';
import characterRoutes from './routes/characterRoutes';
import cors from 'cors';

const app = express();
app.use(cors());
const port = config.get('PORT');

app.use(express.json()); 
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
