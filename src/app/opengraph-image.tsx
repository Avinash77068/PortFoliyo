import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";
import { siteUrl } from "@/data/site";

export const alt = `${profile.name} — Frontend Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#2dd4bf";
const BACKGROUND = "#08090b";
const FOREGROUND = "#f2f4f6";
const MUTED = "#9aa4b0";

/**
 * Static social card. Satori supports flexbox only — no grid, no custom
 * properties — so the palette is repeated as literals here.
 */
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
          backgroundColor: BACKGROUND,
          padding: "72px",
          position: "relative",
        }}
      >
        {/* Accent bloom, top right */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(45,212,191,0.22), rgba(8,9,11,0))",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 11,
              backgroundColor: ACCENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 27,
              fontWeight: 700,
              color: "#04211d",
            }}
          >
            A
          </div>
          <div style={{ display: "flex", fontSize: 26, color: FOREGROUND, fontWeight: 600 }}>
            {profile.logo}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
            }}
          >
            Frontend Developer · SDE-1
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 700,
              color: FOREGROUND,
              letterSpacing: -2,
            }}
          >
            {profile.name}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              maxWidth: 880,
              fontSize: 30,
              lineHeight: 1.4,
              color: MUTED,
            }}
          >
            Building fast, scalable and exceptional web experiences with React,
            Next.js and TypeScript.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1e2228",
            paddingTop: 28,
            fontSize: 22,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>
            React · Next.js · TypeScript · Node.js · MongoDB
          </div>
          <div style={{ display: "flex", color: ACCENT }}>
            {siteUrl.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
