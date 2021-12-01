import { SEMANTIC_TAGS } from "../components/style/common.enum";
import { LbCSSClass } from "../common/common.types";

abstract class ComponentFactory {
   protected _tag: SEMANTIC_TAGS;
   protected _element: HTMLElement;

   protected _createElement(tag: SEMANTIC_TAGS): HTMLElement {
      return document.createElement(tag);
   }

   protected appendStyles(...styleArgs: LbCSSClass[]): void {
      styleArgs.map((style) => this._element.classList.add(style));
   }

   protected get _getTextElement(): HTMLElement {
      return this._element;
   }

   protected _setElementToCreate(elementToCreate: HTMLElement): void {
      this._element = elementToCreate;
   }
}

export default ComponentFactory;
