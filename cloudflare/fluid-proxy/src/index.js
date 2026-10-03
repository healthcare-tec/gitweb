// Reuse the existing Worker for the public PubBid application.
const API_PREFIX = '/api/pubbid';
const APP_PATH = '/pubbid/';
const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
  'access-control-max-age': '86400',
};

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...corsHeaders },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/pubbid') return Response.redirect(new URL(APP_PATH, url), 308);
    const isApp = url.pathname === APP_PATH;
    const endpoint = url.pathname.slice(API_PREFIX.length);
    const isApi = url.pathname.startsWith(API_PREFIX + '/') && ['/search', '/jobs', '/refresh'].includes(endpoint);
    if (!isApp && !isApi) return json({ error: 'Not found' }, 404);
    if (isApi && request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
    const method = isApi && endpoint === '/refresh' ? 'POST' : 'GET';
    if (request.method !== method) return json({ error: 'Method not allowed' }, 405);
    if (!env.PUBBID_UPSTREAM_URL) return json({ error: 'Application is not configured' }, 503);
    const upstream = new URL(env.PUBBID_UPSTREAM_URL);
    upstream.pathname = isApp ? '/pubbid/' : '/api' + endpoint;
    upstream.search = url.search;
    // Administrative and browser credentials are not forwarded to the public API.
    const headers = new Headers({ accept: isApp ? 'text/html' : 'application/json' });
    if (request.headers.has('content-type')) headers.set('content-type', request.headers.get('content-type'));
    let response;
    try {
      response = await fetch(upstream, {
        method, headers, body: method === 'POST' ? request.body : undefined, redirect: 'manual',
      });
    } catch {
      return json({ error: 'O ambiente de pesquisa está temporariamente indisponível.' }, 502);
    }
    if (response.status >= 300 && response.status < 400) return json({ error: 'Unexpected upstream redirect' }, 502);
    if (isApp && response.ok) {
      if (!response.headers.get('content-type')?.includes('text/html')) return json({ error: 'Invalid application response' }, 502);
      let html = await response.text();
      html = html.replaceAll("fetch('/api/", "fetch('/api/pubbid/").replaceAll('fetch("/api/', 'fetch("/api/pubbid/');
      html = html.replace('<body>', '<body><nav aria-label="Site institucional" style="padding:12px 20px;background:#102f3c;font:14px system-ui"><a href="/" style="color:#fff;text-decoration:none">← PubBid · Voltar ao site</a></nav>');
      return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
    }
    return new Response(response.body, {
      status: response.status,
      headers: { 'content-type': response.headers.get('content-type') || 'application/json', 'cache-control': 'no-store', ...(isApi ? corsHeaders : {}) },
    });
  },
};
