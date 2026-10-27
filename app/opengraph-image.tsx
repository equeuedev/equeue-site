import { ImageResponse } from "next/og";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#f6f5f1",
        color: "#292332",
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        fontSize: 64,
        fontWeight: 700,
      }}
    >
      <div>E-Queue.</div>
      <div style={{ color: "#49335d", marginTop: 24 }}>Know your turn. Own your time.</div>
      <div
        style={{
          background: "#d8f36a",
          borderRadius: 24,
          padding: "16px 28px",
          fontSize: 38,
          marginTop: 48,
          alignSelf: "flex-start",
        }}
      >
        A-023
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
