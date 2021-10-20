class ElementController {
   public static appendElementsToContainer(
      container: HTMLElement,
      ...elements: HTMLElement[]
   ): void {
      elements.forEach((element) => container.appendChild(element));
   }
}

export default ElementController;
