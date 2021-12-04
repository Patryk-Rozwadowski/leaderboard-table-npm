import { LbCSSClass } from "../common/common.types";
import { SEMANTIC_TAGS } from "../components/style/semanticTags/semanticContainerTags.enum";

abstract class DOMController {
   protected _tag: SEMANTIC_TAGS;
   protected _element: HTMLElement;

   protected get _getTextElement(): HTMLElement {
      return this._element;
   }

   protected _setElementToProcess(elementToCreate: HTMLElement): void {
      this._element = elementToCreate;
   }

   protected _createElement(tag: SEMANTIC_TAGS): HTMLElement {
      this._element = document.createElement(tag);
      return this._element;
   }

   protected _appendStyles(...styleArgs: LbCSSClass[]): void {
      styleArgs.map((style) => this._element.classList.add(style));
   }

   protected static _appendElementsToContainer(
      container: HTMLElement,
      ...elements: HTMLElement[]
   ): void {
      elements.forEach((element) => container.appendChild(element));
   }

   protected static _appendStyles(
      htmlElement: HTMLElement,
      ...cssStyleClasses: LbCSSClass[]
   ): HTMLElement {
      const htmlElementToProcess = htmlElement;
      cssStyleClasses.forEach((style) => htmlElementToProcess.classList.add(style));
      return htmlElementToProcess;
   }
}

export default DOMController;
