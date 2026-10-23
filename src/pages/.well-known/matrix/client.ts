export async function GET() {
  return new Response(
    JSON.stringify({
      "m.homeserver": {
        "base_url": "https://matrix.nexusremotehub.com"
      }
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