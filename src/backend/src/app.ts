import express from 'express';
import cors from 'cors';
import taskRoutes from '../routes/taskRoutes';
import authRoutes from '../routes/authRoutes';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

export default app;