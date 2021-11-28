import {
   ColumnProperties,
   Component,
   Newable,
   SingleRowProperties
} from "../../common/common.types";
import Row from "../row/Row";
import Header from "../header/Header";
import LeaderboardHeader from "../header/Header";
import { COMMON_STYLE_CLASS } from "../style/common.enum";
import ElementCreator from "../../creators/ElementCreator";
import ColumnAppender from "./ColumnAppender";
import Logger from "../../common/Logger/Logger";

class Column implements Component {
   _elementCreator: ElementCreator;
   private _logger: Logger;
   constructor(private _root: HTMLElement, private _columnData: ColumnProperties) {
      this._elementCreator = new ElementCreator();
      this._logger = new Logger(this as unknown as Newable, false);
   }

   public render(): HTMLElement {
      return this._generateColumn();
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
    * Generate single Column component based on _columnData field.
    * @private
    * @return HTMLElement
    */
   private _generateColumn(): HTMLElement {
      this._logger.group(this.constructor.name);
      const { header, rows } = this._columnData;

      const columnDOMElement = {
         container: this._generateColumnContainer(),
         header: this._instantiateHeaderComponent(header).render(),
         rows: this._generateRowElementsArray(rows)
      };

      // Append rows and header to column's DOM container.
      ColumnAppender.appendHeaderAndRowToColumnContainer(columnDOMElement);
      this._logger.groupEnd();
      return columnDOMElement.container;
   }
}

export default Column;
