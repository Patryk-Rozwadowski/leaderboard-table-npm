import { ColumnProperties, SingleCellProperties } from "../../common/common.types";
import Cell from "../cell/Cell";
import ElementCreator from "../creators/ElementCreator";
import DOMController from "../../controllers/DOMController";
import ColumnController from "../../controllers/column/ColumnController";
import { CONTAINER_STYLE_CLASS } from "../../style/styleClasses/container.enum";
import { SEMANTIC_CONTAINER_TAGS } from "../../style/semanticTags/container.enum";

class Column {
   DOMController: DOMController;
   private _elementCreator: ElementCreator;
   private _columnController: ColumnController;

   constructor(private _root: HTMLElement, private _columnData: ColumnProperties) {
      this.DOMController = new DOMController();
      this._elementCreator = new ElementCreator();
      this._columnController = new ColumnController();
   }

   public create(): HTMLElement {
      return this._generateColumn();
   }

   /**
    * Generate single DOM container for column with prepared styles.
    * @private
    */
   private _generateColumnContainer(): HTMLElement {
      return this._elementCreator.createContainer(
         SEMANTIC_CONTAINER_TAGS.CONTAINER_PRIMARY,
         CONTAINER_STYLE_CLASS.COLUMN_CONTAINER
      );
   }

   private _instantiateCellComponent(rowData: SingleCellProperties): HTMLElement {
      return new Cell(this._root, rowData).create();
   }

   /**
    * Generate Row components
    * @param cells
    * @private
    * @return HTMLElement[]
    */
   private _generateCellElementsArray(cells: SingleCellProperties[]): HTMLElement[] {
      return cells.map(
         (rowData: SingleCellProperties): HTMLElement =>
            this._instantiateCellComponent(rowData)
      );
   }

   /**
    * Generate single Column component based on _columnData field.
    * @private
    * @return HTMLElement
    */
   private _generateColumn(): HTMLElement {
      const { header, cells } = this._columnData;
      const columnDOMElement = {
         container: this._generateColumnContainer(),
         header: this._elementCreator.createHeaderPrimary(header),
         cells: this._generateCellElementsArray(cells)
      };

      // Append rows and header to column's DOM container.
      return this._columnController.appendHeaderAndCellToColumnContainer(
         columnDOMElement
      );
   }
}

export default Column;
