import { COMMON_STYLE_CLASS, SEMANTIC_TAGS } from "../components/style/common.enum";

export interface Column {
   header: string;
   content: string;
}

type TextElement = SEMANTIC_TAGS.PRIMARY_TEXT | (SEMANTIC_TAGS.HEADER_TEXT & HTMLElement);

class ElementCreator {
   public container(): HTMLElement {
      const container = this.createElement(SEMANTIC_TAGS.CONTAINER_PRIMARY);
      container.classList.add(COMMON_STYLE_CLASS.CONTAINER);
      return container;
   }

   public createText(tag: TextElement, text: string): HTMLElement {
      const textElement = this.createElement(tag);
      textElement.classList.add(
         tag === SEMANTIC_TAGS.HEADER_TEXT
            ? COMMON_STYLE_CLASS.HEADER_PRIMARY
            : COMMON_STYLE_CLASS.TEXT_PRIMARY
      );
      textElement.textContent = `${text}`;
      return textElement;
   }

   // TODO wip
   public column(columnData: Column) {
      const columnElement = this.createElement(SEMANTIC_TAGS.CONTAINER_PRIMARY);
      return columnElement;
   }

   private createElement(tag: SEMANTIC_TAGS): HTMLElement {
      return document.createElement(tag);
   }
}

export default ElementCreator;
