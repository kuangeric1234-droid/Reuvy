import { NextStudio } from "next-sanity/studio";

import { sanityEnabled } from "@/sanity/env";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!sanityEnabled) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "var(--font-sans, system-ui)",
        }}
      >
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <h1 style={{ fontSize: 22, marginBottom: 12 }}>Studio not configured yet</h1>
          <p style={{ color: "#666", lineHeight: 1.6 }}>
            Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and optionally{" "}
            <code>NEXT_PUBLIC_SANITY_DATASET</code>) to <code>.env.local</code>, then
            restart. See <code>docs/marketing/sanity-blog.md</code> for the full setup.
          </p>
        </div>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
