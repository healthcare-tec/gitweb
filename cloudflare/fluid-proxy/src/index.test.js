import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './index.js';

test('public UI and API use the existing origin without forwarding credentials', async () => {
  const original = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    if (url.pathname === '/') return new Response("<body><script>fetch('/api/search?q=x');fetch('/api/jobs?id=1');fetch('/api/refresh',{method:'POST'});</script></body>", { headers: { 'content-type': 'text/html' } });
    return new Response('{"ok":true}', { headers: { 'content-type': 'application/json' } });
  };
  const env = { PUBBID_UPSTREAM_URL: 'https://fluid-api.healthcare.tec.br' };
  try {
    const page = await worker.fetch(new Request('https://healthcare.tec.br/pubbid/'), env);
    assert.equal(page.status, 200);
    const html = await page.text();
    for (const endpoint of ['search', 'jobs', 'refresh']) assert(html.includes('/api/pubbid/' + endpoint));
    assert(html.includes('Voltar ao site'));
    await worker.fetch(new Request('https://healthcare.tec.br/api/pubbid/search?q=ultrassom&refresh=0', { headers: { authorization: 'Bearer should-not-forward', cookie: 'session=secret' } }), env);
    assert.equal(calls.at(-1).url, 'https://fluid-api.healthcare.tec.br/api/search?q=ultrassom&refresh=0');
    assert.equal(calls.at(-1).init.headers.has('authorization'), false);
    assert.equal(calls.at(-1).init.headers.has('cookie'), false);
    await worker.fetch(new Request('https://healthcare.tec.br/api/pubbid/refresh', { method: 'POST', body: '{"q":"ultrassom"}', headers: { 'content-type': 'application/json' } }), env);
    assert.equal(calls.at(-1).init.method, 'POST');
    assert.equal(await new Response(calls.at(-1).init.body).text(), '{"q":"ultrassom"}');
    assert.equal((await worker.fetch(new Request('https://healthcare.tec.br/api/pubbid/refresh'), env)).status, 405);
    assert.equal((await worker.fetch(new Request('https://healthcare.tec.br/api/pubbid/unknown'), env)).status, 404);
    globalThis.fetch = async () => new Response(null, { status: 302, headers: { location: 'https://login.example' } });
    assert.equal((await worker.fetch(new Request('https://healthcare.tec.br/api/pubbid/search'), env)).status, 502);
    globalThis.fetch = async () => { throw new Error('network'); };
    assert.equal((await worker.fetch(new Request('https://healthcare.tec.br/pubbid/'), env)).status, 502);
  } finally { globalThis.fetch = original; }
});
