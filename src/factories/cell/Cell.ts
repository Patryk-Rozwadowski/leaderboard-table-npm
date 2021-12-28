import ElementCreator, { ComponentFactory } from "../creators/ElementCreator";
import { SingleCellProperties } from "../../common/common.types";
import DOMController from "../../controllers/DOMController";
import { SEMANTIC_TAGS } from "../../style/semanticTags";
import { COMPONENT_STYLES } from "../../style/styleClasses";

class Cell implements ComponentFactory<Cell> {
   DOMController: DOMController;

   private _elementCreator: ElementCreator;
   private _rowListContainer: HTMLElement;

   constructor(
      private _rootContainer: HTMLElement,
      private _rowData: SingleCellProperties
   ) {
      this._elementCreator = new ElementCreator();
      this.DOMController = new DOMController();
   }

   public create(): HTMLElement {
      this._rowListContainer = this._createCellContainer();
      this._createCell();
      return this._rowListContainer;
   }

   private _createCellContainer() {
      return this._elementCreator.createContainer(
         SEMANTIC_TAGS.CELL_CONTAINER,
         COMPONENT_STYLES.CELL_CONTAINER
      );
   }

   private _createCell() {
      const contentContainer = this._createRowContentContainer();
      const textContent = this._rowContentText();
      DOMController.appendChildrenToContainer(contentContainer, textContent);
      this._rowListContainer.appendChild(contentContainer);
   }

   private _rowContentText(): HTMLElement {
      return this._elementCreator.createText(
         SEMANTIC_TAGS.PRIMARY_TEXT,
         this._rowData.toString()
      );
   }

   private _createRowContentContainer(): HTMLElement {
      return this._elementCreator.createContainer(
         SEMANTIC_TAGS.CELL_CONTAINER,
         COMPONENT_STYLES.CELL
      );
   }
}

export default Cell;
