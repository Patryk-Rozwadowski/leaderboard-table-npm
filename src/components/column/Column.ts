import { Component, Newable, RootElementConnector } from "../../common/common.types";
import LeaderboardHeader from "../header/Header";
import Header from "../header/Header";
import ElementCreator from "../../factories/ElementCreator";
import Row from "../row/Row";
import Logger from "../../common/Logger/Logger";
import ElementController from "../../common/ElementController";
import { PreParsedLeaderboardData } from "../../index";
import { COMMON_STYLE_CLASS } from "../style/common.enum";

/**
 * @type ColumnProperties type for column data which is after whole
 * data parsing process and ready to use.
 */
interface ColumnProperties {
   header: string;
   rows: SingleRowProperties[] | [];
}

export type SingleRowProperties = { [key: string]: string | number };

interface ValuesToSaveOrAppend {
   headersAccumulator: ColumnProperties[];
   header: string;
   singleRowValuesForHeader: SingleRowProperties;
}

class Column implements RootElementConnector, Component {
   root: HTMLElement;
   _elementCreator: ElementCreator;
   private _logger: Logger;
   private _isAdditionalKey: boolean;
   private _newKey: string | ColumnProperties;

   constructor(root: HTMLElement, private _lbData: Partial<PreParsedLeaderboardData>[]) {
      this.root = root;
      this._elementCreator = new ElementCreator();
      this._logger = new Logger(this as unknown as Newable);
   }

   public render(): HTMLElement[] {
      return this._prepareColumns();
   }

   private _prepareColumns() {
      const columnsData = this._lbData.reduce(
         (
            headersAccumulator: ColumnProperties[],
            preParsedElement: Partial<PreParsedLeaderboardData>,
            index: number
         ): ColumnProperties[] => {
            const clientHeaders: string[] = Object.keys(preParsedElement);
            clientHeaders.forEach((clientHeader: string): void => {
               const isHeaderAlreadyExistsInAcc: boolean = headersAccumulator.some(
                  (currentIteratedElement: { header: string }) =>
                     currentIteratedElement.header === clientHeader
               );

               const singleRowValuesForHeader = preParsedElement[
                  clientHeader
               ] as unknown as SingleRowProperties;

               const valuesToSaveOrAppend: ValuesToSaveOrAppend = {
                  headersAccumulator,
                  header: clientHeader,
                  singleRowValuesForHeader
               };

               if (isHeaderAlreadyExistsInAcc) {
                  this._newKeyHandler(clientHeaders, headersAccumulator);
               }

               if (isHeaderAlreadyExistsInAcc) {
                  this._appendNewRowToExistingHeader(valuesToSaveOrAppend);
               } else {
                  this._appendNewHeaderAndRowToAcc(valuesToSaveOrAppend);
                  if (this._isAdditionalKey) {
                     headersAccumulator.forEach((col) => {
                        // Finding new key which is new
                        const isNewKey = col.header === this._newKey;
                        if (isNewKey) {
                           this._unshiftEmptyRowsToNewKey(col, index);
                        }
                     });
                  }
                  console.log({ headersAccumulator });
               }
            });

            return headersAccumulator;
         },
         []
      );

      console.log({ columnsData });

      return this._generateColumnsElements(columnsData);
   }

   private _unshiftEmptyRowsToNewKey(column: ColumnProperties, nOfArrays: number): void {
      const n = Array.apply(null, Array(nOfArrays));
      n.forEach((emptyArr): void => {
         column.rows.unshift(emptyArr as never);
      });
   }
   private _checkIsNewKey(
      headersAcc: string[],
      clientHeaders: string[],
      index: number
   ): void {
      this._isAdditionalKey = !headersAcc.includes(clientHeaders[index]);
      if (this._isAdditionalKey) this._newKey = clientHeaders[index];
   }

   private _newKeyHandler(
      clientHeaders: string[],
      headersAccumulator: { header: string }[]
   ) {
      const accHeaders: string[] = this._extractHeadersFromAcc(headersAccumulator);
      clientHeaders.forEach((accHeader, index) => {
         this._checkIsNewKey(accHeaders, clientHeaders, index);
      });
   }

   private _extractHeadersFromAcc(headersAccumulator: { header: string }[]) {
      return headersAccumulator.map(({ header }) => header);
   }

   private _findElementWithMostKeys(headersArray: any): ColumnProperties {
      const headersArrayLength = headersArray.map((el: {}) => Object.keys(el).length);
      const longestArrayIndex = headersArrayLength.indexOf(
         Math.max(...headersArrayLength)
      );
      return headersArray[longestArrayIndex];
   }

   private _generateColumnsElements(columnsData: ColumnProperties[]) {
      return columnsData.map(({ rows, header }: ColumnProperties): HTMLElement => {
         const columnContainer = this._elementCreator
            .container()
            .appendStyles(COMMON_STYLE_CLASS.COLUMN_CONTAINER).getElement;

         const columnsRows = rows.map(
            (rowData: SingleRowProperties): HTMLElement =>
               this._generateRowElement(rowData)
         );

         const headerElement = this._instantiateHeader(header).render();

         this._appendHeaderToColumnContainer(columnContainer, headerElement);
         this._appendElementsToColumnContainer(columnsRows, columnContainer);
         return columnContainer;
      });
   }

   private _appendNewHeaderAndRowToAcc({
      headersAccumulator,
      header,
      singleRowValuesForHeader
   }: ValuesToSaveOrAppend) {
      headersAccumulator.push({ header, rows: [singleRowValuesForHeader] });
   }

   private _appendHeaderToColumnContainer(
      columnContainer: HTMLElement,
      columnHeaderElement: HTMLElement
   ): void {
      ElementController.appendElementsToContainer(columnContainer, columnHeaderElement);
   }

   private _appendNewRowToExistingHeader({
      headersAccumulator,
      header,
      singleRowValuesForHeader
   }: ValuesToSaveOrAppend) {
      const headerIndexInAcc = headersAccumulator.findIndex(
         (element: { header: string }) => {
            return element.header === header;
         }
      );
      const existingHeaderInAcc = headersAccumulator[headerIndexInAcc];
      // @ts-ignore
      return existingHeaderInAcc.rows.push(singleRowValuesForHeader);
   }

   private _appendElementsToColumnContainer(
      columnsRows: HTMLElement[],
      columnContainer: HTMLElement
   ): void {
      columnsRows.forEach((rowElement: HTMLElement) =>
         ElementController.appendElementsToContainer(columnContainer, rowElement)
      );
   }

   private _generateRowElement(rowData: SingleRowProperties): HTMLElement {
      const instanceOfRow = new Row(this.root, rowData);
      return instanceOfRow.render();
   }

   private _instantiateHeader(txt: string): Header {
      return new LeaderboardHeader(this.root, txt);
   }
}

export default Column;
