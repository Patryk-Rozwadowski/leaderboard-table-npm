import { COMMON_STYLE_CLASS, SEMANTIC_TAGS } from "../components/style/common.enum";

export interface Column {
   header: string;
   content: string;
}

class ElementCreator {
   public container(): HTMLElement {
      const container = this.createElement(SEMANTIC_TAGS.CONTAINER_PRIMARY);
      container.classList.add(COMMON_STYLE_CLASS.CONTAINER);
      return container;
   }

   public column(columnData: Column) {
      const columnElement = this.createElement(SEMANTIC_TAGS.CONTAINER_PRIMARY);
      return columnElement;
   }

   private createElement(tag: SEMANTIC_TAGS) {
      return document.createElement(tag);
   }
}

export default ElementCreator;
