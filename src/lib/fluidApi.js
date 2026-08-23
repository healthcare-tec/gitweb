const FLUID_PROXY_PREFIX = '/api/fluid';

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof payload === 'object' && payload?.detail
      ? payload.detail
      : 'A solicitação ao Fluid não foi concluída.';
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }

  return payload;
}

/**
 * Client-side entry point for the protected Cloudflare Worker proxy.
 *
 * This module intentionally has no API token. Authentication is supplied by
 * the protected application session and the Worker adds server-side secrets.
 */
export async function fluidRequest(path, options = {}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const headers = new Headers(options.headers || {});
  headers.set('Accept', 'application/json');

  const response = await fetch(`${FLUID_PROXY_PREFIX}${normalizedPath}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  return parseResponse(response);
}

export const fluidApi = {
  listServiceTypes: () => fluidRequest('/service-types'),
  getDefaultModel: () => fluidRequest('/models/default'),
  validateModel: (document) => fluidRequest('/models/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(document),
  }),
};
