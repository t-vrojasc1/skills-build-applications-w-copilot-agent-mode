import express from 'express';
import { connection } from './config/database';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

async function startServer() {
  await connection;
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});