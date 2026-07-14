import { ImageResponse } from "next/og";

export const alt = "Pavio Atelier Natural — velas artísticas e personalizadas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "72px 84px",
        color: "#27372d",
        background: "#eee7d9",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "720px" }}>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 20, letterSpacing: 5, textTransform: "uppercase", color: "#8a4f39" }}>
          Pavio · Atelier Natural
        </div>
        <div style={{ marginTop: 36, fontSize: 74, lineHeight: 1.04 }}>
          Velas artísticas, feitas para cada história.
        </div>
        <div style={{ marginTop: 34, fontFamily: "Arial, sans-serif", fontSize: 24, color: "#56675c" }}>
          Ceras naturais · Personalização · Feito à mão
        </div>
      </div>
      <div style={{ width: 250, height: 380, display: "flex", alignItems: "flex-end", justifyContent: "center", borderRadius: "140px 140px 28px 28px", background: "#d6b48d", boxShadow: "0 28px 60px rgba(58, 42, 30, .18)" }}>
        <div style={{ display: "flex", width: 118, height: 250, borderRadius: "56px 56px 20px 20px", background: "#f8f2e6", alignItems: "flex-start", justifyContent: "center" }}>
          <div style={{ width: 32, height: 50, marginTop: -46, borderRadius: "65% 35% 62% 38%", background: "#c5683f", transform: "rotate(12deg)" }} />
        </div>
      </div>
    </div>,
    size,
  );
}
