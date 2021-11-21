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
   rows: SingleRowProperties[];
}

// Single pre parsed client column
export type SingleRowProperties = { [key: string]: string | number } | string;

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
               const isHeaderAlreadyExistsInAcc = headersAccumulator.findIndex(
                  (element: { header: string }) => {
                     return element.header === clientHeader;
                  }
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
                  this._newKeyHandler(headersAccumulator, clientHeaders);
               }

               if (isHeaderAlreadyExistsInAcc !== -1) {
                  this._appendNewRowToExistingHeader(valuesToSaveOrAppend);
               } else {
                  this._appendNewHeaderAndRowToAcc(valuesToSaveOrAppend, index);
               }
            });

            // Fill each header which has lower rows amount with empty rows
            this._fillMissingRowsPOST(headersAccumulator, clientHeaders, index);
            return headersAccumulator;
         },
         []
      );

      console.log({ columnsData });

      return this._generateColumnsElements(columnsData);
   }

   /**
    * Insert empty arrays in start of column's row, which has new key.
    * @param column     Column which has new key.
    * @param nOfArrays  Number of empty arrays to add
    * @private
    */
   private _unshiftEmptyRowsToNewKey(column: ColumnProperties, nOfArrays: number): void {
      // eslint-disable-next-line prefer-spread
      const n = Array.apply(null, Array(nOfArrays));
      n.forEach((emptyArr): void => {
         column.rows.unshift(emptyArr as never);
      });
   }

   /**
    * Check if is there any new header key in data accumulator.
    * @param headersKeysInAccumulator Array of header's string.
    * @param clientHeaders            Raw headers from client's code.
    * @param index                    Index of current iteration
    * @private
    */
   private _checkIsNewKey(
      headersKeysInAccumulator: string[],
      clientHeaders: string[],
      index: number
   ): void {
      const newKey: string = clientHeaders[index];
      this._isAdditionalKey = !headersKeysInAccumulator.includes(newKey);
      if (this._isAdditionalKey) this._newKeyFound(newKey);
   }

   /**
    * Save information about newly
    * @param newKey
    * @private
    */
   private _newKeyFound(newKey: string): void {
      this._newKey = newKey;
   }

   /**
    * Handler for checking for new key and if found then assigning to
    * newKey information about that new header.
    * @param headersAccumulator Array of header's string.
    * @param clientHeaders      Raw headers from client's code.
    * @private
    */
   private _newKeyHandler(
      headersAccumulator: ColumnProperties[],
      clientHeaders: string[]
   ) {
      const keysOfAccumulatorHeaders: string[] =
         this._extractHeadersFromAcc(headersAccumulator);

      // Iteration over client raw headers
      clientHeaders.forEach((accHeader, index) => {
         this._checkIsNewKey(keysOfAccumulatorHeaders, clientHeaders, index);
      });
   }

   private _extractHeadersFromAcc(headersAccumulator: ColumnProperties[]): string[] {
      return headersAccumulator.map(({ header }) => header);
   }

   private _findElementWithMostKeys(headersArray: any): ColumnProperties {
      const headersArrayLength = headersArray.map(
         (el: ColumnProperties) => Object.keys(el).length
      );
      const longestArrayIndex = headersArrayLength.indexOf(
         Math.max(...headersArrayLength)
      );
      return headersArray[longestArrayIndex];
   }

   /**
    * Generating DOM elements based on parsed data.
    * @param columnsData   Parsed and prepared data
    * @private
    */
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

   /**
    * Appending new header with its single row value to data which will be used
    * for rendering.
    * @param headersAccumulator
    * @param header
    * @param singleRowValuesForHeader
    * @param nOfArrays
    * @private
    */
   private _appendNewHeaderAndRowToAcc(
      { headersAccumulator, header, singleRowValuesForHeader }: ValuesToSaveOrAppend,
      nOfArrays: number
   ) {
      // eslint-disable-next-line prefer-spread
      const emptyArrays = this._createNOfEmptyArrays(nOfArrays).map(() => "");
      const columnToSave = {
         header,
         rows: [...emptyArrays, singleRowValuesForHeader]
      } as ColumnProperties;
      headersAccumulator.push(columnToSave);
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
      existingHeaderInAcc.rows.push(singleRowValuesForHeader);
   }

   private _fillMissingRowsPRE() {}

   /**
    * Method for filling AFTER whole parsing process. It's the last step of
    * preparing data for rendering.
    * @param headersAccumulator
    * @param clientHeaders
    * @param indexForEmptyArray
    * @private
    */
   private _fillMissingRowsPOST(
      headersAccumulator: ColumnProperties[],
      clientHeaders: string[],
      indexForEmptyArray: number
   ): void {
      const headersNotInCurrentIteration = this._columnsNotInCurrentIteration(
         headersAccumulator,
         clientHeaders
      );

      headersNotInCurrentIteration.forEach((el) =>
         el?.rows.splice(indexForEmptyArray, 0, "")
      );
   }

   private _columnIcludesHeader(
      source: SingleRowProperties[],
      accEl: { header: string }
   ) {
      return !source.includes(accEl.header);
   }

   private _columnsNotInCurrentIteration(
      columns: ColumnProperties[],
      clientHeaders: string[]
   ) {
      return this._getColumnByQuery(columns, clientHeaders, this._columnIcludesHeader);
   }

   /**
    * Getting column by header from source which contains columns.
    * @param columns
    * @param source
    * @param query
    * @private
    */
   private _getColumnByQuery(columns: ColumnProperties[], source: string[], query) {
      return columns.filter((sourceElement) => query(source, sourceElement));
   }

   private _createNOfEmptyArrays(nOfArrays: number) {
      // eslint-disable-next-line prefer-spread
      return Array.apply(null, Array(nOfArrays));
   }

   private _appendHeaderToColumnContainer(
      columnContainer: HTMLElement,
      columnHeaderElement: HTMLElement
   ): void {
      ElementController.appendElementsToContainer(columnContainer, columnHeaderElement);
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
