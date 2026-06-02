import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, sanityEnabled } from "../env";

/** Read-only client. Null until a real project id is configured. */
export const sanityClient = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // published content via the edge CDN
      perspective: "published",
    })
  : null;
