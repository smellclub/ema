import { ImageResponse } from "next/og";
import { site } from "@/config/site";

// La imagen que aparece al compartir el link por WhatsApp, Instagram, etc. Se genera en el build.
export const alt = site.title;
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
          padding: 70,
          background: "#fafaf7",
          color: "#0a0c18",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#565b6f" }}>
          <span>{site.role}</span>
          <span>{site.location}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, fontWeight: 800, lineHeight: 0.95, letterSpacing: -6 }}>
          <span>Webs que hacen</span>
          <span style={{ display: "flex", flexDirection: "column", alignSelf: "flex-start", color: "#2b44ff" }}>
            vender.
            <span style={{ height: 22, marginTop: -30, background: "#ff5c28", borderRadius: 6 }} />
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 34 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: "#ff5c28" }} />
          {site.name} · {site.availability}
        </div>
      </div>
    ),
    size,
  );
}
