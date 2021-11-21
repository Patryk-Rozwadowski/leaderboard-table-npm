import PhasesState from "../PhasesState";
import Logger from "../../common/Logger/Logger";
import {
   ColumnProperties,
   HeaderKey,
   Newable,
   SingleRowProperties
} from "../../common/common.types";
import { LeaderboardOptions, PreParsedLeaderboardData } from "../../index";
import { SortableProperties } from "../../components/row/types";
import PlaceSorter from "../../sorters/PlaceSorter";
import ClientInputVerification from "../../common/ClientInputVerificator/ClientInputVerification";

type ValuesToSaveOrAppend = {
   headersAccumulator: ColumnProperties[];
   singleRowValuesForHeader: SingleRowProperties;
} & HeaderKey;

class ParseData extends PhasesState {
   private _logger: Logger;
   private _data: SortableProperties[];
   private _userOptions: LeaderboardOptions;
   private _rootContainer: HTMLElement;
   private _sorter: PlaceSorter;
   private _clientInputVerification: ClientInputVerification;
   private _lbData: any;
   private _newKey: string;
   private _isAdditionalKey: boolean;
   private _contentForEmptyRows: string;

   constructor(rootContainer: HTMLElement, data: any, userOptions: LeaderboardOptions) {
      super();
      this._sorter = new PlaceSorter(data);
      this._logger = new Logger(this as unknown as Newable);
      this._clientInputVerification = new ClientInputVerification(this._logger);
      this._rootContainer = rootContainer;
      this._lbData = data;
      this._userOptions = userOptions;
      this._contentForEmptyRows = "-";
   }

   public execute(): SortableProperties[] {
      this._logger.groupEnd();
      return this._parseData();
   }

   public getOptions(): LeaderboardOptions {
      return this._userOptions;
   }

   private _userInputValidation() {
      this._logger.log(`User's input validation.`);
      if (this._clientInputVerification.isRootContainerValid(this._rootContainer)) {
         this._checkData();
      }
   }

   private _sort() {
      if (this._userOptions) this._lbData = this._sorter.ascendant();
   }

   private _checkData() {
      this._logger.log("Checking data types.");
      if (!this._clientInputVerification.isDataStructureValid(this._lbData)) return;
      this._logger.log(`Data is valid.`);
   }

   private _parseData(): SortableProperties[] {
      this._logger.log(`Started parsing data.`);
      this._userInputValidation();
      this._sort();

      return this._lbData.reduce(
         (
            headersAccumulator: ColumnProperties[],
            preParsedElement: Partial<PreParsedLeaderboardData>,
            index: number
         ): ColumnProperties[] => {
            const clientHeaders: string[] = Object.keys(preParsedElement);

            clientHeaders.forEach((clientHeader: string): void => {
               const isHeaderAlreadyExistsInAcc = headersAccumulator.findIndex(
                  (element: HeaderKey) => {
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
   }

   private _appendNewRowToExistingHeader({
      headersAccumulator,
      header,
      singleRowValuesForHeader
   }: ValuesToSaveOrAppend) {
      const headerIndexInAcc = headersAccumulator.findIndex((element: HeaderKey) => {
         return element.header === header;
      });

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
      const columnsNotInCurrentIteration = this._columnsNotInCurrentIteration(
         headersAccumulator,
         clientHeaders
      );

      this._fillColumnsWithMissingRows(
         columnsNotInCurrentIteration,
         indexForEmptyArray,
         this._contentForEmptyRows
      );
   }

   private _fillColumnsWithMissingRows(
      columns: ColumnProperties[],
      indexInRows: number,
      content: string
   ) {
      columns.forEach((column) => column?.rows.splice(indexInRows, 0, content));
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
   private _getColumnByQuery(
      columns: ColumnProperties[],
      source: string[],
      query: {
         (source: SingleRowProperties[], accEl: { header: string }): boolean;
         (arg0: string[], arg1: ColumnProperties): unknown;
      }
   ) {
      return columns.filter((sourceElement) => query(source, sourceElement));
   }

   private _createNOfEmptyArrays(nOfArrays: number) {
      // eslint-disable-next-line prefer-spread
      return Array.apply(null, Array(nOfArrays));
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
      const emptyRows = this._createNOfEmptyArrays(nOfArrays);
      const arraysToFillWithContent = this._insertContentIntoRows(emptyRows);
      const columnToSave = {
         header,
         rows: [...arraysToFillWithContent, singleRowValuesForHeader]
      } as ColumnProperties;
      headersAccumulator.push(columnToSave);
   }

   private _insertContentIntoRows(rows: string[] | unknown[]) {
      return rows.map(() => this._contentForEmptyRows);
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
      if (this._isAdditionalKey) this._setNewKey(newKey);
   }

   /**
    * Save information about newly
    * @param newKey
    * @private
    */
   private _setNewKey(newKey: string): void {
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
}

export default ParseData;
