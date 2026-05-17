import fs from "fs";
import path from "path";

export type OgPageConfig = {
  title: string;
  description: string;
  /** Site path, e.g. /research/mindtrace/image-1.png */
  imagePath: string;
  /** Canonical path, e.g. /research/mindtrace */
  canonicalPath: string;
};

function siteOrigin(): string {
  const fromEnv = process.env.FRONTEND_URL?.trim().replace(/\/+$/, "");
  if (fromEnv) return fromEnv;
  return "https://mntm.ca";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildOgHeadTags(config: OgPageConfig): string {
  const origin = siteOrigin();
  const url = `${origin}${config.canonicalPath}`;
  const image = `${origin}${config.imagePath}`;
  const title = escapeHtml(config.title);
  const description = escapeHtml(config.description);

  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Momentum Research" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:alt" content="${title}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
  `;
}

const OG_PAGES: Record<string, OgPageConfig> = {
  "/research/mindtrace": {
    title:
      "Introducing MindTrace — Momentum Research",
    description:
      "A cognitive profile model built from implicit student feedback signals: response latency, hesitation patterns, and error clustering—without asking students to rate their own confidence.",
    imagePath: "/research/mindtrace/banner.png",
    canonicalPath: "/research/mindtrace",
  },
  "/research": {
    title: "Momentum Research",
    description:
      "Research and field notes on learning AI from Momentum—science and engineering behind our learning infrastructure.",
    imagePath: "/research/mindtrace/image-1.png",
    canonicalPath: "/research",
  },
};

let cachedIndexHtml: string | null = null;

function loadIndexHtml(buildDir: string): string {
  if (!cachedIndexHtml) {
    cachedIndexHtml = fs.readFileSync(path.join(buildDir, "index.html"), "utf8");
  }
  return cachedIndexHtml;
}

/** Inject Open Graph tags into CRA index.html for link previews (iMessage, Slack, X, etc.). */
export function sendOgAwareIndex(
  res: { send: (body: string) => void },
  buildDir: string,
  requestPath: string
): void {
  const normalized = requestPath.replace(/\/+$/, "") || "/";
  const config = OG_PAGES[normalized];

  let html = loadIndexHtml(buildDir);

  if (config) {
    const tags = buildOgHeadTags(config);
    html = html.replace(/<title>.*?<\/title>/i, "").replace(
      /<meta\s+name="description"[^>]*>/i,
      ""
    );
    html = html.replace("</head>", `${tags}\n</head>`);
  }

  res.send(html);
}

export function clearOgHtmlCache(): void {
  cachedIndexHtml = null;
}
