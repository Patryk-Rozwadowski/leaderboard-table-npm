import {
   ColumnProperties,
   Component,
   Newable,
   SingleRowProperties
} from "../../common/common.types";
import Row from "../row/Row";
import ElementCreator from "../ElementCreator";
import Logger from "../../common/Logger/Logger";
import DOMController from "../../controllers/DOMController";
import ColumnController from "./ColumnController";
import { CONTAINER_STYLE_CLASS } from "../../style/styleClasses/container.enum";
import { SEMANTIC_TAGS } from "../../style/semanticTags";

class Column implements Component {
   _elementCreator: ElementCreator;
   private _logger: Logger;
   private _DOMController: DOMController;
   private _columnController: ColumnController;

   constructor(private _root: HTMLElement, private _columnData: ColumnProperties) {
      this._elementCreator = new ElementCreator();
      this._logger = new Logger(this as unknown as Newable, false);
      this._DOMController = new DOMController();
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
      return this._elementCreator
         .container(SEMANTIC_TAGS.COLUMN)
         .appendStyles(CONTAINER_STYLE_CLASS.COLUMN_CONTAINER).getElement;
   }

   private _instantiateRowComponent(rowData: SingleRowProperties): HTMLElement {
      const instanceOfRow = new Row(this._root, rowData);
      return instanceOfRow.create();
   }

   private _instantiateHeaderComponent(txt: string): HTMLElement {
      return this._elementCreator.createText(SEMANTIC_TAGS.HEADER_TEXT, txt);
   }

   /**
    * Generate Row components
    * @param rows
    * @private
    * @return HTMLElement[]
    */
   private _generateRowElementsArray(rows: SingleRowProperties[]): HTMLElement[] {
      return rows.map(
         (rowData: SingleRowProperties): HTMLElement =>
            this._instantiateRowComponent(rowData)
      );
   }

   /**
    * Generate single Column component based on _columnData field.
    * @private
    * @return HTMLElement
    */
   private _generateColumn(): HTMLElement {
      this._logger.group(this.constructor.name);
      const { header, rows } = this._columnData;

      const columnDOMElement = {
         container: this._generateColumnContainer(),
         header: this._instantiateHeaderComponent(header),
         rows: this._generateRowElementsArray(rows)
      };

      // Append rows and header to column's DOM container.
      const columnContainerWithHeaderAndRows =
         this._columnController.appendHeaderAndRowToColumnContainer(columnDOMElement);
      this._logger.groupEnd();
      return columnContainerWithHeaderAndRows;
   }
}

export default Column;
