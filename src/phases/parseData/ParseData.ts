import PhasesState from "../PhasesState";
import Logger from "../../common/Logger/Logger";
import {
   ColumnProperties,
   HeaderKey,
   Newable,
   SingleRowProperties
} from "../../common/common.types";
import { PreParsedLeaderboardData } from "../../index";
import PlaceSorter from "../../sorters/PlaceSorter";
import ClientInputVerification from "../../common/ClientInputVerificator/ClientInputVerification";
import DataParsingUtils from "../../utils/DataParsingUtils";
import { LeaderboardOptions } from "../../controllers/OptionsController";

type ValuesToSaveOrAppend = {
   columnsAccumulator: ColumnProperties[];
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

type ColumnsToParse = {
   clientHeaders: string[];
   columnsAccumulator: ColumnProperties[];
   currentColumn: Partial<PreParsedLeaderboardData>;
   iteration: number;
};

class ParseData extends PhasesState {
   private readonly _logger: Logger;
   private readonly _options: LeaderboardOptions;
   private readonly _rootContainer: HTMLElement;
   private readonly _contentForEmptyRows: string;
   private _sorter: PlaceSorter;
   private _clientInputVerification: ClientInputVerification;
   private _lbData: PreParsedLeaderboardData[];

   constructor(
      rootContainer: HTMLElement,
      data: PreParsedLeaderboardData[],
      options: LeaderboardOptions
   ) {
      super();
      this._logger = new Logger(this as unknown as Newable);
      this._clientInputVerification = new ClientInputVerification(this._logger);
      this._rootContainer = rootContainer;
      this._lbData = data;
      this._options = options;
      this._contentForEmptyRows = options?.contentForEmptyRows || "";
   }

   public execute(): ColumnProperties[] {
      this._userInputValidation();
      this._sort();

      return this._parseData();
   }

   private _parseData(): ColumnProperties[] {
      this._logger.log(`Started parsing data.`);
      return this._lbData.reduce(
         (
            columnsAccumulator: ColumnProperties[],
            currentColumn: Partial<PreParsedLeaderboardData>,
            index: number
         ): ColumnProperties[] => {
            const clientHeaders: string[] = Object.keys(currentColumn);

            const columnsToParse = {
               clientHeaders,
               columnsAccumulator,
               currentColumn,
               iteration: index
            };
            this._parseClientColumns(columnsToParse);

            const columnsToFillWithRows: ColumnsToFillWithRows = {
               allColumns: columnsAccumulator,
               columnsToCheck: clientHeaders,
               indexForEmptyArray: index
            };

            this._fillMissingRowsPOST(columnsToFillWithRows);
            this._logger.groupEnd();
            return columnsAccumulator;
         },
         []
      );
   }

   private _parseClientColumns(data: ColumnsToParse) {
      const { clientHeaders, columnsAccumulator, currentColumn, iteration } = data;

      clientHeaders.forEach((clientHeader: string): void => {
         const isHeaderAlreadyExistsInAcc = columnsAccumulator.findIndex(
            (element: HeaderKey) => {
               return element.header === clientHeader;
            }
         );

         const singleRowValuesForHeader = currentColumn[
            clientHeader
         ] as unknown as SingleRowProperties;

         const valuesToSaveOrAppend: ValuesToSaveOrAppend = {
            columnsAccumulator,
            header: clientHeader,
            singleRowValuesForHeader
         };

         if (isHeaderAlreadyExistsInAcc !== -1) {
            this._appendNewRowToExistingHeader(valuesToSaveOrAppend);
         } else {
            this._appendNewHeaderAndRowToAcc(valuesToSaveOrAppend, iteration);
         }
      });
   }

   public getOptions(): LeaderboardOptions {
      return this._options;
   }

   private _sort() {
      if (this._options?.sortByPlaces) {
         this._sorter = new PlaceSorter(this._lbData);
         this._lbData = this._sorter.ascendant();
      }
   }

   private _appendNewRowToExistingHeader(val: ValuesToSaveOrAppend): void {
      const { columnsAccumulator, header, singleRowValuesForHeader } = val;
      const headerIndexInAcc = columnsAccumulator.findIndex((element: HeaderKey) => {
         return element.header === header;
      });

      const existingHeaderInAcc = columnsAccumulator[headerIndexInAcc];
      existingHeaderInAcc.rows.push(singleRowValuesForHeader);
   }

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
      { columnsAccumulator, header, singleRowValuesForHeader }: ValuesToSaveOrAppend,
      nOfArrays: number
   ) {
      const columnToSave = {
         header,
         rows: []
      } as ColumnProperties;

      this._fillMissingRowsPRE(columnToSave, nOfArrays);
      DataParsingUtils.insertValuesToColumnRows(columnToSave, singleRowValuesForHeader);
      columnsAccumulator.push(columnToSave);
   }
   private _fillMissingRowsPRE(column: ColumnProperties, nOfArrays: number) {
      const emptyRows = DataParsingUtils.createNOfEmptyArrays(nOfArrays);
      const arraysToFillWithContent = this._insertContentIntoRows(emptyRows);
      column.rows.push(...arraysToFillWithContent);
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
