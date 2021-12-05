import { COMPONENT_TYPES } from "../semanticTags/container.enum";
import { TEXT_STYLE_CLASS } from "./typography.enum";
import { CONTAINER_STYLE_CLASS } from "./container.enum";

const COMPONENT_STYLES = {
   [COMPONENT_TYPES.CONTAINER]: { ...CONTAINER_STYLE_CLASS },
   [COMPONENT_TYPES.TYPOGRAPHY]: { ...TEXT_STYLE_CLASS }
};

export { COMPONENT_STYLES, CONTAINER_STYLE_CLASS };
