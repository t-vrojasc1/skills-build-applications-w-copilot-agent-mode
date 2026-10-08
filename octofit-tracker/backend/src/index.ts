import express from 'express';
import { connection } from './config/database';
import { Activity, Leaderboard, Team, User, Workout } from './models';
import { createCollectionRouter } from './routes';

export const app = express();

const port = Number(process.env.PORT || 8000);

const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.use('/api/users', createCollectionRouter(User));
app.use('/api/teams', createCollectionRouter(Team));
app.use('/api/activities', createCollectionRouter(Activity));
app.use('/api/leaderboard', createCollectionRouter(Leaderboard));
app.use('/api/workouts', createCollectionRouter(Workout));

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    apiBaseUrl,
  });
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