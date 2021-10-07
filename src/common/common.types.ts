import ElementCreator from "../factories/ElementCreator";
import { ROW_CLASS_STYLE } from "../components/row/Row";
import { COMMON_STYLE_CLASS, SEMANTIC_TAGS } from "../components/style/common.enum";

type Newable = { new (...args: any[]): any };

interface Creator {
   _elementCreator: ElementCreator;
}

type LbCSSClass = ROW_CLASS_STYLE | COMMON_STYLE_CLASS;
type LbSemanticTag = SEMANTIC_TAGS;

export { Newable, Creator, LbCSSClass, LbSemanticTag };
