import { startServer } from './index';

startServer().catch((error) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});
