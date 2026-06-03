export const prerender = false;

const API_BASE = 'http://130.61.95.110:5300';

export async function ALL({ request }) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
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

      if (request.method === 'POST') {
        const body = await request.text();
        const res = await fetch(targetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
        const result = await res.json();
        return new Response(JSON.stringify(result), {
          status: res.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      const res = await fetch(targetUrl);
      const result = await res.json();
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
    return new Response(JSON.stringify({ error: e.message, stack: e.stack }), { status: 500 });
  }
}
