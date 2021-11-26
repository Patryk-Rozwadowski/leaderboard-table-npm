import {
   ColumnProperties,
   Component,
   Newable,
   RootElementConnector,
   SingleRowProperties
} from "../../common/common.types";
import LeaderboardHeader from "../header/Header";
import Header from "../header/Header";
import ElementCreator from "../../creators/ElementCreator";
import Row from "../row/Row";
import Logger from "../../common/Logger/Logger";
import ElementController from "../../common/ElementController";
import { COMMON_STYLE_CLASS } from "../style/common.enum";

/**
 * Type used for defining column component which is ready to mount.
 * @type ColumnDomElement
 */
type ColumnDomElement = {
   container: HTMLElement;
   rows: HTMLElement[];
   header: HTMLElement;
};

class Column implements RootElementConnector, Component {
   root: HTMLElement;
   _elementCreator: ElementCreator;
   private _logger: Logger;

   constructor(root: HTMLElement, private _lbData: ColumnProperties[]) {
      this.root = root;
      this._elementCreator = new ElementCreator();
      this._logger = new Logger(this as unknown as Newable);
   }

   public render(): HTMLElement[] {
      return this._prepareColumns();
   }

   private _prepareColumns() {
      return this._generateColumnsElements(this._lbData);
   }

   /**
    * Generating DOM elements based on parsed data.
    * @param columnsData   Parsed and prepared data
    * @private
    */
   private _generateColumnsElements(columnsData: ColumnProperties[]) {
      return columnsData.map(
         (column: ColumnProperties): HTMLElement => this._generateColumn(column)
      );
   }

   /**
    * Generate single Column component
    * @param column
    * @private
    * @return HTMLElement
    */
   private _generateColumn(column: ColumnProperties): HTMLElement {
      const { header, rows } = column;

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

   private _instantiateRowComponent(rowData: SingleRowProperties): HTMLElement {
      const instanceOfRow = new Row(this.root, rowData);
      return instanceOfRow.render();
   }

   private _instantiateHeaderComponent(txt: string): Header {
      return new LeaderboardHeader(this.root, txt);
   }
}

export default Column;
