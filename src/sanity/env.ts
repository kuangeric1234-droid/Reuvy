// Sanity environment config.
//
// The marketing site works with NO Sanity project configured — `sanityEnabled`
// is false and the blog falls back to the local POSTS array. Set the env vars
// (see .env.local.example) to switch the blog over to the Studio-authored content.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

/** True only when a real project id is configured. Drives the blog fallback. */
export const sanityEnabled = Boolean(rawProjectId);

/** A valid placeholder keeps `defineConfig` from throwing before setup. */
export const projectId = rawProjectId || "placeholder-project";
