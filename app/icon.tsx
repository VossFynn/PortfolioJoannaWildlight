import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Monogramm-Favicon (Gold-Initiale auf Ivory), bis ein eigenes Icon-Asset existiert. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f4ee",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            fontFamily: "serif",
            fontStyle: "italic",
            fontSize: 22,
            color: "#8a6d3f",
          }}
        >
          J
        </div>
      </div>
    ),
    size
  );
}
