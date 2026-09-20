/**
 * OGCx subventions — Cloudflare Worker
 * UI + proxy CKAN DataStore (CORS).
 */
const CKAN = "https://open.canada.ca/data/api/3/action";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return cors(new Response(null, { status: 204 }));
    }
    if (url.pathname.startsWith("/ckan/")) {
      const action = url.pathname.replace(/^\/ckan\//, "").replace(/\/$/, "");
      const target = `${CKAN}/${action}${url.search}`;
      const res = await fetch(target, { headers: { accept: "application/json" } });
      return cors(new Response(res.body, {
        status: res.status,
        headers: { "content-type": res.headers.get("content-type") || "application/json; charset=utf-8" }
      }));
    }
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("OGCx subventions: bind assets (index.html)", { status: 404 });
  }
};

function cors(res) {
  const h = new Headers(res.headers);
  h.set("access-control-allow-origin", "*");
  h.set("access-control-allow-methods", "GET, OPTIONS");
  h.set("access-control-allow-headers", "*");
  return new Response(res.body, { status: res.status, headers: h });
}
