import ElementCreator from "../../factories/ElementCreator";
import { COMMON_STYLE_CLASS, SEMANTIC_TAGS } from "../style/common.enum";
import { Creator, Newable } from "../../common/common.types";
import Logger from "../../common/Logger/Logger";
import ElementController from "../../common/ElementController";

enum ROW_CLASS_STYLE {
   ROW_LIST_CONTAINER = "lb_row_wrapper",
   ROW_CONTAINER = "lb_row",
   PLACE_CONTAINER = "lb_row_place",
   CONTENT_CONTAINER = "lb_row_content"
}

interface RowContainers {
   placeContainer: HTMLElement;
   contentContainer: HTMLElement;
}

interface RowTexts {
   contentTextElement: HTMLElement;
   textContent: HTMLElement;
}

class Row implements Creator {
   _elementCreator: ElementCreator;
   _rowListContainer: HTMLElement;
   _logger: Logger;

   constructor(private _rootContainer: HTMLElement, private _rowData: any) {
      this._elementCreator = new ElementCreator();
      this._logger = new Logger(this as unknown as Newable);
   }

   public render(): HTMLElement {
      this._rowListContainer = this._elementCreator
         .container(SEMANTIC_TAGS.CONTAINER_ROW)
         .appendStyles(ROW_CLASS_STYLE.ROW_LIST_CONTAINER).getElement;

      this._createRow();
      return this._rowListContainer;
   }

   private _createRow() {
      const rowWrapper = this._elementCreator
         .container(SEMANTIC_TAGS.CONTAINER_ROW)
         .appendStyles(ROW_CLASS_STYLE.ROW_CONTAINER).getElement;

      const { contentContainer } = this._createRowContainers();
      const textContent = this._createRowTexts(this._rowData.toString());

      ElementController.appendElementsToContainer(contentContainer, textContent);
      ElementController.appendElementsToContainer(rowWrapper, contentContainer);

      this._rowListContainer.appendChild(rowWrapper);
   }

   private _createRowContainers(): RowContainers {
      const placeContainer = this._elementCreator
         .container(SEMANTIC_TAGS.CONTAINER_ROW)
         .appendStyles(ROW_CLASS_STYLE.PLACE_CONTAINER).getElement;

      const contentContainer = this._elementCreator
         .container(SEMANTIC_TAGS.CONTAINER_ROW)
         .appendStyles(ROW_CLASS_STYLE.CONTENT_CONTAINER).getElement;

      return { placeContainer, contentContainer };
   }

   private _createRowTexts(txt: string): HTMLElement {
      return this._elementCreator
         .createText(SEMANTIC_TAGS.PRIMARY_TEXT, txt)
         .appendStyles(COMMON_STYLE_CLASS.TEXT_PRIMARY).getElement;
   }
}
export { ROW_CLASS_STYLE };
export default Row;
