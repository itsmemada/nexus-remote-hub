const API_BASE = 'http://130.61.95.110:5300';

export default async function handler(request, response) {
  const { pathname, search } = new URL(request.url, 'http://localhost');

  if (pathname === '/umami/script.js') {
    const res = await fetch(`${API_BASE}/script.js`);
    const body = await res.text();
    response.setHeader('Content-Type', 'application/javascript');
    response.setHeader('Cache-Control', 'public, max-age=3600');
    return response.status(200).send(body);
  }

  if (pathname.startsWith('/umami/api/')) {
    const apiPath = pathname.replace('/umami/api/', '');
    const targetUrl = `${API_BASE}/api/${apiPath}${search}`;

    if (request.method === 'POST') {
      const body = await new Promise((resolve) => {
        let data = '';
        request.on('data', (chunk) => data += chunk);
        request.on('end', () => resolve(data));
      });

      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const result = await res.json();
      response.setHeader('Access-Control-Allow-Origin', '*');
      return response.status(res.status).json(result);
    }

    const res = await fetch(targetUrl, { method: 'GET' });
    const result = await res.json();
    response.setHeader('Access-Control-Allow-Origin', '*');
    return response.status(res.status).json(result);
  }

  response.status(404).json({ error: 'Not found' });
}
