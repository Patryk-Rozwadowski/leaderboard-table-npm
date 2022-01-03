import { SEMANTIC_TAGS } from "./index";

enum SEMANTIC_TYPOGRAPHY_TYPES {
   PRIMARY = "primary",
   SECONDARY = "secondary"
}

enum SEMANTIC_TYPOGRAPHY_TAGS {
   HEADER_PRIMARY_TEXT = "h3",
   SUB_HEADER_TEXT = "h5",
   PRIMARY_TEXT = "p",
   SECONDARY_TEXT = "p"
}

type SemanticTypographyTags = Record<SEMANTIC_TYPOGRAPHY_TAGS, string>;

type SemanticHeaderTags = Pick<
   typeof SEMANTIC_TYPOGRAPHY_TAGS,
   "HEADER_PRIMARY_TEXT" | "SUB_HEADER_TEXT"
> &
   SemanticTypographyTags &
   SEMANTIC_TAGS;

type SemanticTextTags = Pick<
   typeof SEMANTIC_TYPOGRAPHY_TAGS,
   "PRIMARY_TEXT" | "SECONDARY_TEXT"
> &
   SemanticTypographyTags &
   SEMANTIC_TAGS;

export {
   SEMANTIC_TYPOGRAPHY_TAGS,
   SEMANTIC_TYPOGRAPHY_TYPES,
   SemanticHeaderTags,
   SemanticTextTags,
   SemanticTypographyTags
};
