export const apiBase = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

export async function getCollection(path, errorMessage = 'Unable to load data.') {
  const response = await fetch(`${apiBase}${path}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || errorMessage);
  }

  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray(data.results)) {
    return data.results;
  }

  throw new Error('Unexpected API response: expected an array or paginated results.');
}
