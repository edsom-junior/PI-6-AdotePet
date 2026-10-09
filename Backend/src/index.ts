import express from 'express';
import authRoutes from './routes/auth';
import petsRoutes from './routes/pets';

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());


app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


app.use('/auth', authRoutes);
app.use('/pets', petsRoutes);


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});