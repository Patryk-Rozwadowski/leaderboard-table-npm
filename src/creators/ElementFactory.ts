import { SEMANTIC_TAGS } from "../components/style/common.enum";
import TextFactory from "./textFactory/TextFactory";
import { LbCSSClass } from "../common/common.types";

type TextElement = SEMANTIC_TAGS.PRIMARY_TEXT | SEMANTIC_TAGS.HEADER_TEXT;

/**
 * @class ElementFactory is used whenever is need to create
 * native DOM elements. Methods can be chained.
 */
class ElementFactory {
   private _element: HTMLElement;
   private _textFactory: TextFactory;

   constructor() {
      this._textFactory = new TextFactory();
   }

   get getElement(): HTMLElement {
      return this._element;
   }

   public container(
      tag: SEMANTIC_TAGS = SEMANTIC_TAGS.CONTAINER_PRIMARY
   ): ElementFactory {
      this._element = this._createElement(tag);
      return this;
   }

   public createText(tag: SEMANTIC_TAGS = SEMANTIC_TAGS.PRIMARY_TEXT, text: string) {
      const textProps = {
         tag,
         text
      };
      return this._textFactory.createText(textProps);
   }

   public appendStyles(...styleArgs: LbCSSClass[]): ElementFactory {
      styleArgs.map((style) => this._element.classList.add(style));
      return this;
   }

   private _createElement(tag: SEMANTIC_TAGS): HTMLElement {
      return document.createElement(tag);
   }
}

export default ElementFactory;
