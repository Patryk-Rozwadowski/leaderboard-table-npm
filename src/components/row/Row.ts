import ElementCreator from "../../factories/ElementCreator";
import { COMMON_STYLE_CLASS, SEMANTIC_TAGS } from "../style/common.enum";
import { Creator, Newable } from "../../common/common.types";
import Logger from "../../common/Logger/Logger";
import { RowProperties } from "./types";
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
   placeTextElement: HTMLElement;
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

      if (this.isSimpleLeaderboard()) {
         this._createRowList();
      } else {
         this._createRow();
      }
      return this._rowListContainer;
   }

   private isSimpleLeaderboard() {
      // TODO parser will pass this option
      return !!Array.isArray(this._rowData.content);
   }

   private _createRowList() {
      this._rowData.map(({ place, content }: RowProperties) => {
         this._createRow();
      });
   }

   private _createRow() {
      const rowWrapper = this._elementCreator
         .container(SEMANTIC_TAGS.CONTAINER_ROW)
         .appendStyles(ROW_CLASS_STYLE.ROW_CONTAINER).getElement;

      const { placeContainer, contentContainer } = this._createRowContainers();
      const { contentTextElement, placeTextElement } = this._createRowTexts(
         this._rowData?.place.toString(),
         this._rowData?.content as string
      );

      ElementController.appendElementsToContainer(placeContainer, placeTextElement);
      ElementController.appendElementsToContainer(contentContainer, contentTextElement);
      ElementController.appendElementsToContainer(
         rowWrapper,
         placeContainer,
         contentContainer
      );

      rowWrapper.addEventListener("click", this._rowOnClickHandler);
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

   private _createRowTexts(placeText: string, contentText: string): RowTexts {
      const contentTextElement = this._elementCreator
         .createText(SEMANTIC_TAGS.PRIMARY_TEXT, contentText)
         .appendStyles(COMMON_STYLE_CLASS.TEXT_PRIMARY).getElement;

      const placeTextElement = this._elementCreator
         .createText(SEMANTIC_TAGS.PRIMARY_TEXT, placeText)
         .appendStyles(COMMON_STYLE_CLASS.TEXT_PRIMARY).getElement;

      return { contentTextElement, placeTextElement };
   }

   private _rowOnClickHandler(e: Event) {
      console.log(e.target);
   }
}
export { ROW_CLASS_STYLE };
export default Row;
