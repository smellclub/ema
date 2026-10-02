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
          background: "#ffffff",
          color: "#0d0f1a",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#5b6075" }}>
          <span>{site.role}</span>
          <span>{site.location}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, fontWeight: 800, lineHeight: 0.9, textTransform: "uppercase", letterSpacing: -4 }}>
          <span style={{ display: "flex" }}>
            <span style={{ background: "#0d0f1a", color: "#fff", padding: "10px 26px 0", borderRadius: 34, transform: "rotate(-2deg)" }}>Webs que</span>
          </span>
          <span style={{ display: "flex", marginTop: 26 }}>
            hacen
            <span style={{ background: "#1f3bff", color: "#fff", padding: "10px 26px 0", borderRadius: 34, marginLeft: 34, transform: "rotate(-4deg)" }}>
              vender.
            </span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 34 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: "#1f3bff" }} />
          {site.name} · {site.availability}
        </div>
      </div>
    ),
    size,
  );
}
