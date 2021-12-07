import { SEMANTIC_TYPOGRAPHY_TAGS } from "./typography.enum";
import { SEMANTIC_CONTAINER_TAGS } from "./container.enum";
import { SEMANTIC_ROW_TAGS } from "./row.enum";
import { SEMANTIC_COLUMN_TAGS } from "./column.enum";

export const SEMANTIC_TAGS = {
   ...SEMANTIC_CONTAINER_TAGS,
   ...SEMANTIC_TYPOGRAPHY_TAGS,
   ...SEMANTIC_ROW_TAGS,
   ...SEMANTIC_COLUMN_TAGS
};

export type SEMANTIC_TAGS =
   | SEMANTIC_CONTAINER_TAGS
   | SEMANTIC_TYPOGRAPHY_TAGS
   | SEMANTIC_ROW_TAGS
   | SEMANTIC_COLUMN_TAGS;
