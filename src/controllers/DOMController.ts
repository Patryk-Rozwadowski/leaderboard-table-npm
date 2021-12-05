import { LbCSSClass } from "../common/common.types";
import { SEMANTIC_TAGS } from "../style/semanticTags/semanticContainerTags.enum";

class DOMController {
   _tag: SEMANTIC_TAGS;
   _element: HTMLElement;

   get getElement(): HTMLElement {
      return this._element;
   }

   setElementToProcess(elementToCreate: HTMLElement): void {
      this._element = elementToCreate;
   }

   createDOMElementWithTag(tag: SEMANTIC_TAGS): HTMLElement {
      this._element = document.createElement(tag);
      return this._element;
   }

   static appendChildrenToContainer(
      container: HTMLElement,
      ...elements: HTMLElement[]
   ): void {
      elements.forEach((element) => container.appendChild(element));
   }

   appendStyles(...cssStyleClasses: LbCSSClass[]): HTMLElement {
      cssStyleClasses.forEach((style) => this._element.classList.add(style));
      return this._element;
   }
}

export default DOMController;
