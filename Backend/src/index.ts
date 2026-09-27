import express from 'express';
import authRoutes from './routes/auth';

const app = express();
const PORT = 3000;

app.use(express.json()); 

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});