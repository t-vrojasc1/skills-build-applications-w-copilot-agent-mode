import { startServer } from './index';

// Start the server and handle any errors that may occur during startup
startServer().catch((error) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});
