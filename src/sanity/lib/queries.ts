import { groq } from "next-sanity";

const POST_FIELDS = groq`
  "slug": slug.current,
  title,
  excerpt,
  category,
  author,
  "publishedAt": publishedAt,
  readMinutes,
  body
`;

export const ALL_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS}
  }
`;
