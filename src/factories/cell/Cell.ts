import ElementCreator from "../creators/ElementCreator";
import { SingleCellProperties } from "../../common/common.types";
import DOMController from "../../controllers/DOMController";
import { CONTAINER_STYLE_CLASS } from "../../common/styleClasses/container.enum";
import { SEMANTIC_CONTAINER_TAGS } from "../../common/semanticTags/container.enum";

class Cell {
   private _DOMController: DOMController;
   private _elementCreator: ElementCreator;
   private _cellContainer: HTMLElement;

   constructor(
      private _rootContainer: HTMLElement,
      private _cellData: SingleCellProperties
   ) {
      this._elementCreator = new ElementCreator();
      this._DOMController = new DOMController();
   }

   public create(): HTMLElement {
      this._cellContainer = this._createCellContainer();
      this._createCell();
      return this._cellContainer;
   }

   private _createCellContainer() {
      return this._elementCreator.createContainer(
         SEMANTIC_CONTAINER_TAGS.CONTAINER_PRIMARY,
         CONTAINER_STYLE_CLASS.CELL_CONTAINER
      );
   }

   private _createCell() {
      const contentContainer = this._createCellContentContainer();
      const textContent = this._cellContentText();
      DOMController.appendChildrenToContainer(contentContainer, textContent);
      this._cellContainer.appendChild(contentContainer);
   }

   private _cellContentText(): HTMLElement {
      return this._elementCreator.createTextPrimary(this._cellData.toString());
   }

   private _createCellContentContainer(): HTMLElement {
      return this._elementCreator.createContainer(
         SEMANTIC_CONTAINER_TAGS.CONTAINER_PRIMARY,
         CONTAINER_STYLE_CLASS.CELL
      );
   }
}

export default Cell;
