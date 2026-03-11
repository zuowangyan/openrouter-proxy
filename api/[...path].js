export const config = {
  runtime: 'edge',
};

export default async function handler(request) {

  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/?/, "/");
  const targetURL = `https://openrouter.ai/api${path}`;

  const authHeader = request.headers.get("Authorization") || "";
  const contentType = request.headers.get("Content-Type") || "application/json";

  const body = request.method === "POST" ? await request.text() : null;

  const response = await fetch(targetURL, {
    method: request.method,
    headers: {
      "Content-Type": contentType,
      "Authorization": authHeader,
      "HTTP-Referer": "https://cherry-studio.app",
      "X-Title": "CherryStudio",
    },
    body: body,
  });

  const responseBody = await response.text();

  return new Response(responseBody, {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
