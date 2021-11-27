import { ColumnDomElement } from "../../creators/ColumnCreator";
import ElementController from "../../common/ElementController";
import {
   ColumnProperties,
   Component,
   SingleRowProperties
} from "../../common/common.types";
import Row from "../row/Row";
import Header from "../header/Header";
import LeaderboardHeader from "../header/Header";
import { COMMON_STYLE_CLASS } from "../style/common.enum";
import ElementCreator from "../../creators/ElementCreator";

class Column implements Component {
   _elementCreator: ElementCreator;

   constructor(private _root: HTMLElement, private _columnData: ColumnProperties) {
      this._elementCreator = new ElementCreator();
   }

   private _appendHeaderToColumnContainer(
      columnContainer: HTMLElement,
      columnHeaderElement: HTMLElement
   ): void {
      ElementController.appendElementsToContainer(columnContainer, columnHeaderElement);
   }

   private _appendRowsToColumnContainer(
      columnContainer: HTMLElement,
      columnsRows: HTMLElement[]
   ): void {
      columnsRows.forEach((rowElement: HTMLElement) =>
         ElementController.appendElementsToContainer(columnContainer, rowElement)
      );
   }

   /**
    * Generate single DOM container for column with prepared styles.
    * @private
    */
   private _generateColumnContainer(): HTMLElement {
      return this._elementCreator
         .container()
         .appendStyles(COMMON_STYLE_CLASS.COLUMN_CONTAINER).getElement;
   }

   /**
    * Generate Row components for single Column
    * @param rows
    * @private
    * @return HTMLElement[]
    */
   private _generateRowComponentsArray(rows: SingleRowProperties[]): HTMLElement[] {
      return rows.map(
         (rowData: SingleRowProperties): HTMLElement =>
            this._instantiateRowComponent(rowData)
      );
   }

   private _instantiateRowComponent(rowData: SingleRowProperties): HTMLElement {
      const instanceOfRow = new Row(this._root, rowData);
      return instanceOfRow.render();
   }

   private _instantiateHeaderComponent(txt: string): Header {
      return new LeaderboardHeader(this._root, txt);
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
    * Generate single Column component
    * @param column
    * @private
    * @return HTMLElement
    */
   private _generateColumn(): HTMLElement {
      const { header, rows } = this._columnData;

      const columnDOMElement = {
         container: this._generateColumnContainer(),
         rows: this._generateRowElementsArray(rows),
         header: this._instantiateHeaderComponent(header).render()
      };

      return this._prepareAndGetReadyColumnElement(columnDOMElement);
   }

   /**
    * Method which append header and rows to column container. Returning column
    * component ready to mount.
    * @param columnDOMElement {ColumnDomElement}
    * @private
    */
   private _prepareAndGetReadyColumnElement(
      columnDOMElement: ColumnDomElement
   ): HTMLElement {
      const { container, rows, header } = columnDOMElement;
      this._appendHeaderToColumnContainer(container, header);
      this._appendRowsToColumnContainer(container, rows);
      return container;
   }

   render(): HTMLElement {
      return this._generateColumn();
   }
}

export default Column;
