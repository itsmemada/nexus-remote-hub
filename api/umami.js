const https = require('https');
const http = require('http');

const API_BASE = 'http://130.61.95.110:5300';

module.exports = async (req, res) => {
  const { pathname, search } = new URL(req.url, 'http://localhost');

  // Proxy script.js
  if (pathname === '/umami/script.js') {
    const body = await fetch(`${API_BASE}/script.js`);
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.status(200).send(body);
  }

  // Proxy API calls
  if (pathname.startsWith('/umami/api/')) {
    const apiPath = pathname.replace('/umami/api/', '');
    const targetUrl = `${API_BASE}/api/${apiPath}${search}`;

    if (req.method === 'POST') {
      const body = await new Promise((resolve) => {
        let data = '';
        req.on('data', (chunk) => data += chunk);
        req.on('end', () => resolve(data));
      });

      const result = await post(targetUrl, body);
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(200).json(result);
    }

    const result = await fetch(targetUrl);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(result);
  }

  res.status(404).json({ error: 'Not found' });
};

function fetch(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function post(url, body) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}
