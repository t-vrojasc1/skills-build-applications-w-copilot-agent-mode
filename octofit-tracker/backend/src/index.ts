import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connection } from './config/database';
import { Activity, Leaderboard, Team, User, Workout } from './models';
import { createCollectionRouter } from './routes';

export const app = express();

const port = Number(process.env.PORT || 8000);

const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;

const allowedOrigins = [
  'http://localhost:5173',
  ...(process.env.CODESPACE_NAME
    ? [`https://${process.env.CODESPACE_NAME}-5173.app.github.dev`]
    : []),
];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/api/users', createCollectionRouter(User));
app.use('/api/teams', createCollectionRouter(Team, ['members']));
app.use('/api/activities', createCollectionRouter(Activity, ['user']));
app.use('/api/leaderboard', createCollectionRouter(Leaderboard, ['user']));
app.use('/api/workouts', createCollectionRouter(Workout));

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    apiBaseUrl,
  });
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  const isValidationError =
    error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError;
  const isDuplicateError =
    typeof error === 'object' && error !== null && 'code' in error && error.code === 11000;
  const status = isValidationError ? 400 : isDuplicateError ? 409 : 500;
  const message = error instanceof Error ? error.message : 'Unexpected server error.';

  response.status(status).json({ error: message });
});

export async function startServer() {
  await connection;

  return new Promise<void>((resolve) => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening on port ${port}`);
      console.log(`OctoFit API base URL: ${apiBaseUrl}`);
      resolve();
    });
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Unable to start OctoFit API:', error);
    process.exitCode = 1;
  });
}