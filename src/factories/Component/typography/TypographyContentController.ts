class TypographyContentController {
   public fillTextWithContent(textElement: HTMLElement, text: string): HTMLElement {
      const textElementToFill = textElement;
      textElementToFill.textContent = `${text}`;
      return textElementToFill;
   }
}

export default TypographyContentController;