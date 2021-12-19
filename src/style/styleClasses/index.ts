import { TEXT_STYLE_CLASS } from "./typography.enum";
import { CONTAINER_STYLE_CLASS } from "./container.enum";
import { CELL_CLASS_STYLE } from "./cell.enum";

export const COMPONENT_STYLES = {
   ...CONTAINER_STYLE_CLASS,
   ...CELL_CLASS_STYLE,
   ...TEXT_STYLE_CLASS
};

export type COMPONENT_STYLES =
   | CONTAINER_STYLE_CLASS
   | TEXT_STYLE_CLASS
   | CELL_CLASS_STYLE;
