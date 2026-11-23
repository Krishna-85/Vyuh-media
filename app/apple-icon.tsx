import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — the mark on opaque ivory, since iOS ignores alpha. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F6F4EF",
        }}
      >
        <svg viewBox="0 0 64 64" width="120" height="120" display="flex">
          <path d="M12 13H24L32 36L40 13H52L36 51H28Z" fill="#20211F" />
          <rect x="18" y="55.5" width="28" height="1.6" fill="#A58B60" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
