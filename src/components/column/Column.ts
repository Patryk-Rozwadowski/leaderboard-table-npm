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
import ColumnAppender from "./ColumnAppender";

class Column implements Component {
   _elementCreator: ElementCreator;

   constructor(private _root: HTMLElement, private _columnData: ColumnProperties) {
      this._elementCreator = new ElementCreator();
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
      const { header, rows } = this._columnData;

      const columnDOMElement = {
         container: this._generateColumnContainer(),
         rows: this._generateRowElementsArray(rows),
         header: this._instantiateHeaderComponent(header).render()
      };

      // Append rows and header to column's DOM container.
      ColumnAppender.appendHeaderAndRowToColumnContainer(columnDOMElement);
      return columnDOMElement.container;
   }
}

export default Column;
