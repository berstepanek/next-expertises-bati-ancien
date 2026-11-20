import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

/* Image de partage par défaut (réseaux sociaux, messageries). */
export const alt = `${site.name} — ${site.baseline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "80px",
          background: "#2f4b2c",
          color: "#f4f5ef",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 4, textTransform: "uppercase", color: "#c7dcb0" }}>
          {`${site.zone} · ${site.expertName}`}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ fontSize: 40, color: "#c7dcb0", fontStyle: "italic" }}>{site.baseline}</div>
        </div>
        <div style={{ fontSize: 30 }}>{site.phone.label}</div>
      </div>
    ),
    size,
  );
}
