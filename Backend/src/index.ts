import express from 'express';
import authRoutes from './routes/auth';
import petsRoutes from './routes/pets';

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Verificar se o servidor está funcionando
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Rotas da aplicação
app.use('/auth', authRoutes);
app.use('/pets', petsRoutes);

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(Servidor rodando na porta ${PORT});
});