import { SEMANTIC_TAGS } from "../components/style/common.enum";
import { LbCSSClass, LbSemanticTag } from "../common/common.types";

type TextElement = SEMANTIC_TAGS.PRIMARY_TEXT | SEMANTIC_TAGS.HEADER_TEXT;

/**
 * @class ElementCreator is used whenever is need to create
 * native DOM elements. Methods can be chained.
 */
class ElementCreator {
   private _element: HTMLElement;

   get getElement(): HTMLElement {
      return this._element;
   }

   public container(
      tag: SEMANTIC_TAGS = SEMANTIC_TAGS.CONTAINER_PRIMARY
   ): ElementCreator {
      this._element = this._createElement(tag);
      return this;
   }

   public createText(
      tag: TextElement = SEMANTIC_TAGS.PRIMARY_TEXT,
      text: string
   ): ElementCreator {
      const textElement = this._createElement(tag);
      textElement.textContent = `${text}`;
      this._element = textElement;
      return this;
   }

   public appendStyles(...styleArgs: LbCSSClass[]): ElementCreator {
      styleArgs.map((style) => this._element.classList.add(style));
      return this;
   }

   private _createElement(tag: LbSemanticTag): HTMLElement {
      return document.createElement(tag);
   }
}

export default ElementCreator;
