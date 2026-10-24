import { config } from "../config";

export function GET() {
  const body = config.launchReady
    ? "User-agent: *\nAllow: /\n"
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
