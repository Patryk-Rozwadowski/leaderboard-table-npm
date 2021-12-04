import ComponentCreator from "../../factories/Component/ComponentCreator";
import { Component, Newable, SingleRowProperties } from "../../common/common.types";
import ElementController from "../../controllers/ElementController";
import Logger from "../../common/Logger/Logger";
import { SEMANTIC_TAGS } from "../style/semanticTags/semanticContainerTags.enum";

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

class Row implements Component {
   _elementCreator: ComponentCreator;
   _rowListContainer: HTMLElement;
   private _logger: Logger;

   constructor(
      private _rootContainer: HTMLElement,
      private _rowData: SingleRowProperties
   ) {
      this._elementCreator = new ComponentCreator();
      this._logger = new Logger(this as unknown as Newable);
   }

   public render(): HTMLElement {
      this._rowListContainer = this._elementCreator
         .container(SEMANTIC_TAGS.CONTAINER_ROW)
         .appendStyles(ROW_CLASS_STYLE.ROW_LIST_CONTAINER).getElement;

      this._createRow();
      this._logger.groupEnd();
      return this._rowListContainer;
   }

   private _createRow() {
      const rowWrapper = this._elementCreator
         .container(SEMANTIC_TAGS.CONTAINER_ROW)
         .appendStyles(ROW_CLASS_STYLE.ROW_CONTAINER).getElement;

      const { contentContainer } = this._createRowContainers();
      const textContent = this._createRowTexts(this._rowData?.toString());

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
      return this._elementCreator.createText(SEMANTIC_TAGS.PRIMARY_TEXT, txt);
   }
}

export { ROW_CLASS_STYLE };
export default Row;
