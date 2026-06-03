export const prerender = false;

const API_BASE = 'http://130.61.95.110:5300';

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function POST({ request }) {
  const body = await request.text();
  const res = await fetch(`${API_BASE}/api/send`, {
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

export async function GET({ url }) {
  const targetUrl = `${API_BASE}/api${url.pathname.replace('/umami/api', '')}${url.search}`;
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
