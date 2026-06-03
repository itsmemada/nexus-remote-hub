export const prerender = false;

const API_BASE = 'http://130.61.95.110:5300';

export async function ALL({ request, url }) {
  const pathname = url.pathname;
  const method = request.method;

  // Proxy API calls
  if (pathname.startsWith('/umami/api/')) {
    const apiPath = pathname.replace('/umami/api/', '');
    const targetUrl = `${API_BASE}/api/${apiPath}${url.search}`;

    if (method === 'POST') {
      const body = await request.text();
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
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
}
