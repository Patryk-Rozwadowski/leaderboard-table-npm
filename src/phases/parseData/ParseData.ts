import PhasesState from "../PhasesState";
import Logger from "../../common/Logger/Logger";
import {
   ColumnProperties,
   HeaderKey,
   Newable,
   SingleRowProperties
} from "../../common/common.types";
import { LeaderboardOptions, PreParsedLeaderboardData } from "../../index";
import PlaceSorter from "../../sorters/PlaceSorter";
import ClientInputVerification from "../../common/ClientInputVerificator/ClientInputVerification";
import DataParsingUtils from "../../utils/DataParsingUtils";

type ValuesToSaveOrAppend = {
   headersAccumulator: ColumnProperties[];
   singleRowValuesForHeader: SingleRowProperties;
} & HeaderKey;

type MissingRow = {
   columns: ColumnProperties[];
   index: number;
   content: string;
};

type ColumnsToFillWithRows = {
   allColumns: ColumnProperties[];
   columnsToCheck: string[];
   indexForEmptyArray: number;
};

class ParseData extends PhasesState {
   private _logger: Logger;
   private _userOptions: LeaderboardOptions;
   private _rootContainer: HTMLElement;
   private _sorter: PlaceSorter;
   private _clientInputVerification: ClientInputVerification;
   private _lbData: PreParsedLeaderboardData[];
   private _contentForEmptyRows: string;

   constructor(
      rootContainer: HTMLElement,
      data: PreParsedLeaderboardData[],
      userOptions: LeaderboardOptions
   ) {
      super();
      this._sorter = new PlaceSorter(data);
      this._logger = new Logger(this as unknown as Newable);
      this._clientInputVerification = new ClientInputVerification(this._logger);
      this._rootContainer = rootContainer;
      this._lbData = data;
      this._userOptions = userOptions;
      this._contentForEmptyRows = "-";
   }

   public execute(): ColumnProperties[] {
      this._logger.groupEnd();
      return this._parseData();
   }

   public getOptions(): LeaderboardOptions {
      return this._userOptions;
   }

   private _sort() {
      if (this._userOptions) this._lbData = this._sorter.ascendant();
   }

   private _parseData(): ColumnProperties[] {
      this._logger.log(`Started parsing data.`);
      this._userInputValidation();
      this._sort();

      const parsedLbData = this._lbData.reduce(
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

               if (isHeaderAlreadyExistsInAcc !== -1) {
                  this._appendNewRowToExistingHeader(valuesToSaveOrAppend);
               } else {
                  this._appendNewHeaderAndRowToAcc(valuesToSaveOrAppend, index);
               }
            });

            const columnsToFillWithRows: ColumnsToFillWithRows = {
               allColumns: headersAccumulator,
               columnsToCheck: clientHeaders,
               indexForEmptyArray: index
            };
            this._fillMissingRowsPOST(columnsToFillWithRows);
            return headersAccumulator;
         },
         []
      );

      return parsedLbData as ColumnProperties[];
   }

   private _appendNewRowToExistingHeader(val: ValuesToSaveOrAppend): void {
      const { headersAccumulator, header, singleRowValuesForHeader } = val;
      const headerIndexInAcc = headersAccumulator.findIndex((element: HeaderKey) => {
         return element.header === header;
      });

      const existingHeaderInAcc = headersAccumulator[headerIndexInAcc];
      existingHeaderInAcc.rows.push(singleRowValuesForHeader);
   }

   private _fillMissingRowsPRE() {}

   /**
    * Method for filling AFTER whole parsing process. It's the last step of
    * preparing data before rendering.
    * @private
    * @param columnsToFillWithRows
    */
   private _fillMissingRowsPOST(columnsToFillWithRows: ColumnsToFillWithRows): void {
      const { allColumns, indexForEmptyArray, columnsToCheck } = columnsToFillWithRows;
      const columnsNotInCurrentIteration = DataParsingUtils.columnsNotInCurrentIteration(
         allColumns,
         columnsToCheck
      );

      const missingRow = {
         columns: columnsNotInCurrentIteration,
         index: indexForEmptyArray,
         content: this._contentForEmptyRows
      };

      this._insertColumnsWithMissingRows(missingRow);
   }

   /**
    * Inserting rows for columns which weren't in iteration.
    * @param missingRow {MissingRow}
    * @private
    */
   private _insertColumnsWithMissingRows(missingRow: MissingRow): void {
      const { columns, index, content } = missingRow;
      columns.forEach((column) => column.rows.splice(index, 0, content));
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
      const emptyRows = DataParsingUtils.createNOfEmptyArrays(nOfArrays);
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

   private _userInputValidation() {
      this._logger.log(`User's input validation.`);
      if (this._clientInputVerification.isRootContainerValid(this._rootContainer)) {
         this._checkData();
      }
   }

   private _checkData() {
      this._logger.log("Checking data types.");
      if (!this._clientInputVerification.isDataStructureValid(this._lbData)) return;
      this._logger.log(`Data is valid.`);
   }
}

export default ParseData;
