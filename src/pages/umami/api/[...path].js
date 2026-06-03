export const prerender = false;

const API_BASE = 'http://130.61.95.110:5300';

export async function ALL({ request }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  console.log(`[Umami Proxy] ${method} ${pathname}`);

  try {
    // Health check
    if (pathname === '/umami/api/health') {
      const res = await fetch(`${API_BASE}/health`);
      const body = await res.text();
      return new Response(JSON.stringify({ status: 'ok', upstream: body }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Proxy script.js
    if (pathname === '/umami/script.js') {
      const res = await fetch(`${API_BASE}/script.js`);
      const body = await res.text();
      return new Response(body, {
        headers: {
          'Content-Type': 'application/javascript',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // Proxy API calls
    if (pathname.startsWith('/umami/api/')) {
      const apiPath = pathname.replace('/umami/api/', '');
      const targetUrl = `${API_BASE}/api/${apiPath}${url.search}`;

      console.log(`[Umami Proxy] Target: ${method} ${targetUrl}`);

      if (method === 'POST') {
        const body = await request.text();
        console.log('[Umami Proxy] Body:', body.substring(0, 500));

        const res = await fetch(targetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
        const text = await res.text();
        console.log('[Umami Proxy] Response:', text.substring(0, 200));

        let result;
        try { result = JSON.parse(text); } catch { result = { raw: text }; }
        return new Response(JSON.stringify(result), {
          status: res.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      const res = await fetch(targetUrl);
      const text = await res.text();
      let result;
      try { result = JSON.parse(text); } catch { result = { raw: text }; }
      return new Response(JSON.stringify(result), {
        status: res.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify({ error: 'Not found', pathname }), { status: 404 });
  } catch (e) {
    console.error('[Umami Proxy] Error:', e.message);
    return new Response(JSON.stringify({ error: e.message, stack: e.stack }), { status: 500 });
  }
}
