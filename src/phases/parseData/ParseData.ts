import PhasesState from "../PhasesState";
import Logger from "../../common/Logger/Logger";
import { ColumnProperties, SingleCellProperties } from "../../common/common.types";
import { PreParsedLeaderboardData } from "../../index";
import PlaceSorter from "../../sorters/PlaceSorter";
import ClientInputVerification from "../../common/ClientInputVerificator/ClientInputVerification";
import DataParsingUtils from "./utils/DataParsingUtils";
import { lbLogger } from "../../common/Logger/lbLogger";
import { lbOptions } from "../../common/options/lbOptions";

type ValuesToSaveOrAppend = {
   columnsAccumulator: ColumnProperties[];
   singleRowValuesForHeader: SingleCellProperties;
   header: string;
};

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
   private _sorter: PlaceSorter;
   private _clientInputVerification: ClientInputVerification;
   private _lbData: PreParsedLeaderboardData[];

   constructor(private _rootContainer: HTMLElement, data: PreParsedLeaderboardData[]) {
      super();
      this._lbData = data;
      this._logger = lbLogger;
   }

   public execute(): ColumnProperties[] {
      this._userInputValidation();
      this._sort();
      return this._getParsedData();
   }

   private _getParsedData() {
      return this._parseData();
   }

   private _parseData(): ColumnProperties[] {
      this._logger?.log(`Started parsing data.`);
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

            this._fillMissingCellsWithIndex(columnsToFillWithRows);
            this._logger?.groupEnd();
            return columnsAccumulator;
         },
         []
      );
   }

   private _parseClientColumns(data: ColumnsToParse) {
      const { clientHeaders, columnsAccumulator, currentColumn, iteration } = data;
      clientHeaders.forEach((clientHeader: string): void => {
         // TODO: extract to method
         const isHeaderAlreadyExistsInAcc = columnsAccumulator.findIndex(
            (column: ColumnProperties) => {
               return column.header === clientHeader;
            }
         );

         const headerAlreadyExists = isHeaderAlreadyExistsInAcc !== -1;
         const singleRowValuesForHeader = currentColumn[
            clientHeader
         ] as unknown as SingleCellProperties;

         const valuesToSaveOrAppend: ValuesToSaveOrAppend = {
            columnsAccumulator,
            header: clientHeader,
            singleRowValuesForHeader
         };

         if (headerAlreadyExists) {
            this._appendNewCellToExistingHeader(valuesToSaveOrAppend);
         } else {
            this._appendNewHeaderAndRowToAcc(valuesToSaveOrAppend, iteration);
         }
      });
   }

   private _sort() {
      if (lbOptions.getOptions().sortByPlaces) {
         this._sorter = new PlaceSorter(this._lbData, this._logger);
         this._lbData = this._sorter.ascendant();
      }
   }

   private _appendNewCellToExistingHeader(val: ValuesToSaveOrAppend): void {
      const { columnsAccumulator, header, singleRowValuesForHeader } = val;

      const headerIndexInAcc = columnsAccumulator.findIndex(
         (column: ColumnProperties) => column.header === header
      );

      const existingHeaderInAcc = columnsAccumulator[headerIndexInAcc];
      existingHeaderInAcc.cells.push(singleRowValuesForHeader);
   }

   /**
    * Method for filling AFTER whole parsing process. It's the last step of
    * preparing data before rendering.
    * @private
    * @param columnsToFillWithRows
    */
   private _fillMissingCellsWithIndex(
      columnsToFillWithRows: ColumnsToFillWithRows
   ): void {
      const { allColumns, indexForEmptyArray, columnsToCheck } = columnsToFillWithRows;
      const columnsNotInCurrentIteration = DataParsingUtils.columnsNotInCurrentIteration(
         allColumns,
         columnsToCheck
      );

      const missingRow = {
         columns: columnsNotInCurrentIteration,
         index: indexForEmptyArray,
         content: lbOptions.getOptions().contentForEmptyCells
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
      columns.forEach((column) => column.cells.splice(index, 0, content));
   }

   /**
    * Appending new header with its single cell value to data which will be used
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
         cells: []
      } as ColumnProperties;

      this._addEmptyCells(columnToSave, nOfArrays);
      DataParsingUtils.insertValuesToColumnRows(columnToSave, singleRowValuesForHeader);
      columnsAccumulator.push(columnToSave);
   }

   /**
    * Method is used for filling columns with empty cells, without any content.
    * Use case: first initialization of columns based on client's header.
    * @param column
    * @param nOfArrays
    * @private
    */
   private _addEmptyCells(column: ColumnProperties, nOfArrays: number) {
      const emptyCells = DataParsingUtils.createNOfEmptyArrays(nOfArrays);
      const arraysToFillWithContent = this._insertContentIntoRows(emptyCells);
      column.cells.push(...arraysToFillWithContent);
   }

   private _insertContentIntoRows(rows: string[] | unknown[]) {
      return rows.map(() => lbOptions.getOptions().contentForEmptyCells);
   }

   private _userInputValidation() {
      this._clientInputVerification = new ClientInputVerification(this._logger);
      this._logger?.log(`User's input validation.`);
      if (this._clientInputVerification.isRootContainerValid(this._rootContainer)) {
         this._checkData();
      }
   }

   private _checkData() {
      this._logger?.log("Checking data types.");
      const isInvalidData = !this._clientInputVerification.isDataStructureValid(
         this._lbData
      );

      if (isInvalidData) return;
      this._logger?.log(`Data is valid.`);
   }
}

export default ParseData;
