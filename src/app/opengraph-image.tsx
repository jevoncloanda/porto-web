import { ImageResponse } from "next/og";

import { profile } from "@content/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated from the profile content so it never falls out
 * of sync. Uses plain inline styles because it is rendered by Satori, not by
 * the browser — Tailwind classes do not apply here.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#2a2e42",
          padding: "72px",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "4px",
              backgroundColor: "#f5a623",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#9297af",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            {profile.name}
          </div>
          <div style={{ marginTop: 20, fontSize: 34, color: "#a8adc4" }}>
            {profile.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: "6px",
            width: "180px",
            backgroundColor: "#f5a623",
          }}
        />
      </div>
    ),
    size,
  );
}
