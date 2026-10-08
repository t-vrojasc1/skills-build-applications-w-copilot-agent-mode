import { startServer } from './index';

const port = Number(process.env.PORT || 8000);

const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;

console.log(`API Base URL: ${apiBaseUrl}`);

// Start the server and handle any errors that may occur during startup
startServer().catch((error) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});