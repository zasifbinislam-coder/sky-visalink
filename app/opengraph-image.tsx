import { ImageResponse } from "next/og";

// Node runtime + force-dynamic to dodge the next/og fileURLToPath
// prerender bug on Windows during `next build`; the rendered image is
// still cached at Vercel's edge.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const alt = "SKY VISALink — Your Gateway to the World";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #051a35 0%, #0a4d8c 55%, #2196d8 100%)",
          color: "#f4f8fc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            SV
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              opacity: 0.95,
            }}
          >
            SKY VISALink
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
            }}
          >
            Your Gateway to the World.
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 400,
              opacity: 0.88,
              maxWidth: 960,
              lineHeight: 1.35,
            }}
          >
            Visa processing, tour packages, air ticketing &amp; hotels.
            Trusted by travellers across Bangladesh.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: 0.92,
            fontSize: 24,
            fontWeight: 500,
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span>Tourist</span>
            <span style={{ opacity: 0.5 }}>/</span>
            <span>Student</span>
            <span style={{ opacity: 0.5 }}>/</span>
            <span>Work</span>
          </div>
          <div style={{ fontSize: 22, opacity: 0.8 }}>sky-visalink.vercel.app</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
