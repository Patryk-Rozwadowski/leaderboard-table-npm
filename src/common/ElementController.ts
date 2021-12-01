import { LbCSSClass } from "./common.types";

class ElementController {
   public static appendElementsToContainer(
      container: HTMLElement,
      ...elements: HTMLElement[]
   ): void {
      // TODO: fix mutation
      elements.forEach((element) => container.appendChild(element));
   }

   public static appendStyles(
      htmlElement: HTMLElement,
      ...cssStyleClasses: LbCSSClass[]
   ): HTMLElement {
      const htmlElementToProcess = htmlElement;
      cssStyleClasses.forEach((style) => htmlElementToProcess.classList.add(style));
      return htmlElementToProcess;
   }
}

export default ElementController;
