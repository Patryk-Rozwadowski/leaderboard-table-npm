import { SEMANTIC_TEXT_TAGS } from "./semanticTextTags.enum";

enum SEMANTIC_CONTAINER_TAGS {
   CONTAINER_LEADERBOARD = "main",
   CONTAINER_PRIMARY = "div",
   CONTAINER_ROW = "div"
}

type ALL_SEMANTIC_TAGS = SEMANTIC_TEXT_TAGS | SEMANTIC_CONTAINER_TAGS;

export const SEMANTIC_TAGS = {
   container: { ...SEMANTIC_CONTAINER_TAGS },
   text: { ...SEMANTIC_TEXT_TAGS }
};
export type SEMANTIC_TAGS<T = ALL_SEMANTIC_TAGS> = {
   [key in keyof T]: string;
};

export { SEMANTIC_CONTAINER_TAGS, ALL_SEMANTIC_TAGS };
