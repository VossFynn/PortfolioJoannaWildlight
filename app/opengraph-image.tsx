import { ImageResponse } from "next/og";

import { getContentProvider } from "@/lib/content/provider";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social-Share-Vorschaubild (Link-Previews in WhatsApp/iMessage/Slack/…). */
export default async function OpengraphImage() {
  const site = await getContentProvider().getSiteContent();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f4ee",
        }}
      >
        <div style={{ display: "flex", fontSize: 76, fontStyle: "italic", color: "#3b372f" }}>
          {site.logo.top} {site.logo.bottom}
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#8a6d3f" }}>
          {site.footer.tagline}
        </div>
      </div>
    ),
    size
  );
}
