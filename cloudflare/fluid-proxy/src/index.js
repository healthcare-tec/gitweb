const PUBLIC_PREFIX = "/api/fluid";
const ALLOWED_ORIGIN = "https://healthcare.tec.br";

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function corsHeaders() {
  return {
    "access-control-allow-origin": ALLOWED_ORIGIN,
    "access-control-allow-headers": "Content-Type, Idempotency-Key",
    "access-control-allow-methods": "GET, POST, OPTIONS",
    vary: "Origin",
  };
}

function isAllowedBrowserRequest(request) {
  const origin = request.headers.get("Origin");
  const fetchSite = request.headers.get("Sec-Fetch-Site");

  if (origin && origin !== ALLOWED_ORIGIN) return false;
  if (fetchSite === "cross-site") return false;
  return true;
}

function accessReturnUrl(request) {
  const requested = new URL(request.url).searchParams.get("return_to") || "/";

  // Only allow same-origin absolute paths. This endpoint is a login bootstrap
  // and must not become an open redirect.
  if (!requested.startsWith("/") || requested.startsWith("//")) {
    return new URL("/", request.url);
  }

  return new URL(requested, request.url);
}

function upstreamUrl(request, env) {
  const publicUrl = new URL(request.url);
  const upstream = new URL(env.FLUID_UPSTREAM_URL);
  const suffix = publicUrl.pathname.slice(PUBLIC_PREFIX.length);

  upstream.pathname = `/api/v1${suffix || "/"}`;
  upstream.search = publicUrl.search;
  return upstream;
}

function copyRequestHeaders(request, env) {
  const headers = new Headers(request.headers);

  // The browser must never be able to choose the application credential.
  headers.set("Authorization", `Bearer ${env.FLUID_API_TOKEN}`);
  headers.delete("Host");
  headers.delete("Origin");
  headers.delete("Referer");
  headers.delete("Cookie");

  headers.set("CF-Access-Client-Id", env.CF_ACCESS_CLIENT_ID);
  headers.set("CF-Access-Client-Secret", env.CF_ACCESS_CLIENT_SECRET);

  return headers;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== PUBLIC_PREFIX && !url.pathname.startsWith(`${PUBLIC_PREFIX}/`)) {
      return json({ error: "Not found" }, 404);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    if (url.pathname === `${PUBLIC_PREFIX}/access`) {
      if (request.method !== "GET") {
        return json({ error: "Method not allowed" }, 405);
      }

      // Cloudflare Access challenges this protected path first. Once the user
      // is authenticated, return them to the page that started the login.
      return Response.redirect(accessReturnUrl(request), 302);
    }

    if (!["GET", "POST"].includes(request.method)) {
      return json({ error: "Method not allowed" }, 405);
    }

    if (!isAllowedBrowserRequest(request)) {
      return json({ error: "Origin not allowed" }, 403);
    }

    if (
      !env.FLUID_API_TOKEN ||
      !env.FLUID_UPSTREAM_URL ||
      !env.CF_ACCESS_CLIENT_ID ||
      !env.CF_ACCESS_CLIENT_SECRET
    ) {
      return json({ error: "Proxy is not configured" }, 503);
    }

    const init = {
      method: request.method,
      headers: copyRequestHeaders(request, env),
      redirect: "manual",
    };

    if (request.method !== "GET") {
      init.body = request.body;
    }

    const upstreamResponse = await fetch(upstreamUrl(request, env), init);
    const responseHeaders = new Headers(upstreamResponse.headers);
    responseHeaders.set("cache-control", "no-store");

    for (const [name, value] of Object.entries(corsHeaders())) {
      responseHeaders.set(name, value);
    }

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: responseHeaders,
    });
  },
};
