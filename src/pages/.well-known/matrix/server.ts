export async function GET() {
  return new Response(
    JSON.stringify({
      "m.server": "matrix.nexusremotehub.com:443"
    }, null, 2),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
}