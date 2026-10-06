import { startServer } from './index';
const codespaceUrl = `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
const host = `${process.env.CODESPACE_NAME}-8000.app.github.dev`;

// Start the server and handle any errors that may occur during startup
startServer().catch((error) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});

