import { SEMANTIC_TYPOGRAPHY_TAGS } from "./typography.enum";
import { SEMANTIC_CONTAINER_TAGS } from "./container.enum";
import { SEMANTIC_CELL_TAGS } from "./cell.enum";
import { SEMANTIC_COLUMN_TAGS } from "./column.enum";

export const SEMANTIC_TAGS = {
   ...SEMANTIC_CONTAINER_TAGS,
   ...SEMANTIC_TYPOGRAPHY_TAGS,
   ...SEMANTIC_CELL_TAGS,
   ...SEMANTIC_COLUMN_TAGS
};

export type SEMANTIC_TAGS =
   | SEMANTIC_CONTAINER_TAGS
   | SEMANTIC_TYPOGRAPHY_TAGS
   | SEMANTIC_CELL_TAGS
   | SEMANTIC_COLUMN_TAGS;
