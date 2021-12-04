import { SEMANTIC_TEXT_TAGS } from "../../components/style/semanticTags/semanticTextTags.enum";
import TypographyFactory from "./typography/TypographyFactory";
import { LbCSSClass } from "../../common/common.types";
import { SEMANTIC_TAGS } from "../../components/style/semanticTags/semanticContainerTags.enum";
import DOMController from "../../controllers/DOMController";

/**
 * @class ComponentCreator is used whenever is need to create
 * native DOM elements. Methods can be chained.
 */
class ComponentCreator extends DOMController {
   private _textFactory: TypographyFactory;

   constructor() {
      super();
      this._textFactory = new TypographyFactory();
   }

   get getElement(): HTMLElement {
      return this._element;
   }

   // TODO: move to container factory
   container(tag: SEMANTIC_TAGS = SEMANTIC_TAGS.CONTAINER_PRIMARY): ComponentCreator {
      this._element = this._createElement(tag);
      return this;
   }

   createText(tag: SEMANTIC_TEXT_TAGS, text: string): HTMLElement {
      const textProps = {
         tag,
         text
      };
      return this._textFactory.createText(textProps);
   }

   appendStyles(...styleArgs: LbCSSClass[]): ComponentCreator {
      styleArgs.map((style) => this._element.classList.add(style));
      return this;
   }
}

export default ComponentCreator;
