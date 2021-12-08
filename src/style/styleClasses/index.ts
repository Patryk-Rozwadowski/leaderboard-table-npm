import { TEXT_STYLE_CLASS } from "./typography.enum";
import { CONTAINER_STYLE_CLASS } from "./container.enum";
import { ROW_CLASS_STYLE } from "./row.enum";

export const COMPONENT_STYLES = {
   ...CONTAINER_STYLE_CLASS,
   ...ROW_CLASS_STYLE,
   ...TEXT_STYLE_CLASS
};

export type COMPONENT_STYLES = CONTAINER_STYLE_CLASS | TEXT_STYLE_CLASS | ROW_CLASS_STYLE;
