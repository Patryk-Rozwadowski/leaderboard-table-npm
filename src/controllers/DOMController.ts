import { LbCSSClass } from "../common/common.types";
import { SEMANTIC_TAGS } from "../style/semanticTags/semanticContainerTags.enum";

class DOMController {
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

   appendChildrenToContainer(
      container: HTMLElement,
      ...elements: HTMLElement[]
   ): HTMLElement {
      elements.forEach((element) => {
         if (Array.isArray(element))
            element.forEach((el) => this._element.appendChild(el));
         else this._element.appendChild(element);
      });
      return this._element;
   }

   static appendChildrenToContainer(
      container: HTMLElement,
      ...elements: HTMLElement[]
   ): void {
      elements.forEach((element) => {
         if (Array.isArray(element)) element.forEach((el) => container.appendChild(el));
         else container.appendChild(element);
      });
   }

   appendStyles(...cssStyleClasses: LbCSSClass[]): HTMLElement {
      cssStyleClasses.forEach((style) => this._element.classList.add(style));
      return this._element;
   }
}

export default DOMController;
