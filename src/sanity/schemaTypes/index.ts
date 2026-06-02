import type { SchemaTypeDefinition } from "sanity";

import { postType } from "./postType";
import { calloutType } from "./calloutType";

export const schemaTypes: SchemaTypeDefinition[] = [postType, calloutType];
