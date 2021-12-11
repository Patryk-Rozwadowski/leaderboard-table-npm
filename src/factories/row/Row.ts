import ElementCreator, { ComponentFactory } from "../ElementCreator";
import { Newable, SingleRowProperties } from "../../common/common.types";
import Logger from "../../common/Logger/Logger";
import DOMController from "../../controllers/DOMController";
import { SEMANTIC_TAGS } from "../../style/semanticTags";
import { COMPONENT_STYLES } from "../../style/styleClasses";

interface RowContainers {
   contentContainer: HTMLElement;
   rowContainer: HTMLElement;
}

class Row implements ComponentFactory {
   DOMController: DOMController;

   private _elementCreator: ElementCreator;
   private _rowListContainer: HTMLElement;
   private _logger: Logger;

   constructor(
      private _rootContainer: HTMLElement,
      private _rowData: SingleRowProperties
   ) {
      this._elementCreator = new ElementCreator();
      this._logger = new Logger(this as unknown as Newable);
      this.DOMController = new DOMController();
   }

   public create(): HTMLElement {
      this._rowListContainer = this._createMainRowContainer();
      this._createRow();
      this._logger.groupEnd();
      return this._rowListContainer;
   }

   private _createMainRowContainer() {
      return this._elementCreator.createContainer(
         SEMANTIC_TAGS.CONTAINER_ROW,
         COMPONENT_STYLES.CONTENT_CONTAINER
      );
   }

   private _createRow() {
      const { rowContainer, contentContainer } = this._createRowContainers();
      const textContent = this._rowContentText();

      DOMController.appendChildrenToContainer(contentContainer, textContent);
      DOMController.appendChildrenToContainer(rowContainer, contentContainer);

      this._rowListContainer.appendChild(rowContainer);
   }

   private _rowContentText(): HTMLElement {
      return this._elementCreator.createText(
         SEMANTIC_TAGS.PRIMARY_TEXT,
         this._rowData.toString()
      );
   }

   private _createRowContainers(): RowContainers {
      const rowContainer = this._createRowContainer();
      const contentContainer = this._createRowContentContainer();

      return { rowContainer, contentContainer };
   }

   private _createRowContainer(): HTMLElement {
      return this._elementCreator.createContainer(
         SEMANTIC_TAGS.CONTAINER_ROW,
         COMPONENT_STYLES.ROW_CONTAINER
      );
   }

   private _createRowContentContainer(): HTMLElement {
      return this._elementCreator.createContainer(
         SEMANTIC_TAGS.CONTAINER_ROW,
         COMPONENT_STYLES.CONTENT_CONTAINER
      );
   }
}

export default Row;
