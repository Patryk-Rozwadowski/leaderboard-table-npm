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
   SemanticTypographyTags;

type SemanticTextTags = Pick<
   typeof SEMANTIC_TYPOGRAPHY_TAGS,
   "PRIMARY_TEXT" | "SECONDARY_TEXT"
> &
   SemanticTypographyTags;

export {
   SEMANTIC_TYPOGRAPHY_TAGS,
   SemanticHeaderTags,
   SemanticTextTags,
   SemanticTypographyTags
};
