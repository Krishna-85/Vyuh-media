import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.brand} — ${site.positioning}`;

/** Static instances only: satori rejects the variable fonts used on the page. */
function font(file: string, weight: 400, style: "normal" | "italic" = "normal") {
  return {
    name: file.replace(/-.*/, "").replace(/([a-z])([A-Z])/g, "$1 $2"),
    data: readFileSync(path.join(process.cwd(), "assets", "fonts", file)),
    weight,
    style,
  } as const;
}

const fonts = [
  font("Newsreader-400.ttf", 400),
  font("Newsreader-400-Italic.ttf", 400, "italic"),
  font("InstrumentSans-400.ttf", 400),
  font("TiroDevanagariHindi-Regular.ttf", 400),
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F6F4EF",
          padding: "72px 76px",
          color: "#20211F",
        }}
      >
        {/* Gold rule + wordmark */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              width: 96,
              height: 3,
              backgroundColor: "#A58B60",
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: 88,
              letterSpacing: 6,
              lineHeight: 1,
            }}
          >
            VYUH MEDIA
          </div>
          <div
            style={{
              fontFamily: "Tiro Devanagari Hindi",
              fontSize: 46,
              color: "#A58B60",
              lineHeight: 1.4,
            }}
          >
            {site.taglineHi}
          </div>
        </div>

        {/* Positioning + domain */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            borderTop: "1px solid rgba(32,33,31,0.18)",
            paddingTop: 30,
          }}
        >
          <div
            style={{
              fontFamily: "Instrument Sans",
              fontSize: 33,
              color: "#5A5A53",
              letterSpacing: 0.4,
            }}
          >
            {site.positioning}
          </div>
          <div
            style={{
              fontFamily: "Instrument Sans",
              fontSize: 24,
              color: "#77766F",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {site.domain}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
