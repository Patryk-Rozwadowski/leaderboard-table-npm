import PhasesState from "../PhasesState";
import Logger from "../../common/logger/Logger";
import { ColumnProperties, SingleCellProperties } from "../../common/common.types";
import { LeaderboardData } from "../../leaderboard/Leaderboard";
import PlaceSorter from "../../sorters/PlaceSorter";
import DataParsingUtils from "./utils/DataParsingUtils";
import { lbLogger } from "../../common/logger/lbLogger";
import { lbOptions } from "../../common/options/lbOptions";

type ValuesToSaveOrAppend = {
   columnsAccumulator: ColumnProperties[];
   singleCellValuesForHeader: SingleCellProperties;
   header: string;
};

type MissingCell = {
   columns: ColumnProperties[];
   index: number;
   content: string;
};

type ColumnsToFillWithCell = {
   allColumns: ColumnProperties[];
   columnsToCheck: string[];
   indexForEmptyArray: number;
};

type ColumnsToParse = {
   clientHeaders: string[];
   columnsAccumulator: ColumnProperties[];
   currentColumn: Partial<LeaderboardData>;
   iteration: number;
};

class ParseData extends PhasesState {
   private readonly _logger: Logger;
   private _sorter: PlaceSorter;
   private _lbData: LeaderboardData[];

   constructor(private _rootContainer: HTMLElement, data: LeaderboardData[]) {
      super();
      this._lbData = data;
      this._logger = lbLogger;
   }

   public execute(): ColumnProperties[] {
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
            currentColumn: Partial<LeaderboardData>,
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

            const columnsToFillWithCells: ColumnsToFillWithCell = {
               allColumns: columnsAccumulator,
               columnsToCheck: clientHeaders,
               indexForEmptyArray: index
            };

            this._fillMissingCellsWithIndex(columnsToFillWithCells);
            this._logger?.groupEnd();
            return columnsAccumulator;
         },
         []
      );
   }

   private _parseClientColumns(data: ColumnsToParse) {
      const { clientHeaders, columnsAccumulator, currentColumn, iteration } = data;
      clientHeaders.forEach((clientHeader: string): void => {
         const isHeaderAlreadyExistsInAcc = columnsAccumulator.findIndex(
            (column: ColumnProperties) => {
               return column.header === clientHeader;
            }
         );

         const headerAlreadyExists = isHeaderAlreadyExistsInAcc !== -1;
         const singleCellValuesPerHeader = currentColumn[
            clientHeader
         ] as unknown as SingleCellProperties;

         const valuesToSaveOrAppend: ValuesToSaveOrAppend = {
            columnsAccumulator,
            header: clientHeader,
            singleCellValuesForHeader: singleCellValuesPerHeader
         };

         if (headerAlreadyExists) {
            this._appendNewCellToExistingHeader(valuesToSaveOrAppend);
         } else {
            this._appendNewHeaderAndCellToAcc(valuesToSaveOrAppend, iteration);
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
      const { columnsAccumulator, header, singleCellValuesForHeader } = val;

      const headerIndexInAcc = columnsAccumulator.findIndex(
         (column: ColumnProperties) => column.header === header
      );

      const existingHeaderInAcc = columnsAccumulator[headerIndexInAcc];
      existingHeaderInAcc.cells.push(singleCellValuesForHeader);
   }

   /**
    * Method for filling AFTER whole parsing process. It's the last step of
    * preparing data before rendering.
    * @private
    * @param columnsToFillWithCells
    */
   private _fillMissingCellsWithIndex(
      columnsToFillWithCells: ColumnsToFillWithCell
   ): void {
      const { allColumns, indexForEmptyArray, columnsToCheck } = columnsToFillWithCells;
      const columnsNotInCurrentIteration = DataParsingUtils.columnsNotInCurrentIteration(
         allColumns,
         columnsToCheck
      );

      const missingCell = {
         columns: columnsNotInCurrentIteration,
         index: indexForEmptyArray,
         content: lbOptions.getOptions().contentForEmptyCells
      };

      this._insertColumnsWithMissingCells(missingCell);
   }

   /**
    * Inserting cells for columns which weren't in iteration.
    * @param missingCell {MissingCell}
    * @private
    */
   private _insertColumnsWithMissingCells(missingCell: MissingCell): void {
      const { columns, index, content } = missingCell;
      columns.forEach((column) => column.cells.splice(index, 0, content));
   }

   /**
    * Appending new header with its single cell value to data which will be used
    * for rendering.
    * @param headersAccumulator
    * @param header
    * @param singleCellValuesForHeader
    * @param nOfArrays
    * @private
    */
   private _appendNewHeaderAndCellToAcc(
      { columnsAccumulator, header, singleCellValuesForHeader }: ValuesToSaveOrAppend,
      nOfArrays: number
   ) {
      const columnToSave = {
         header,
         cells: []
      } as ColumnProperties;

      this._addEmptyCells(columnToSave, nOfArrays);
      DataParsingUtils.insertValuesToColumnCells(columnToSave, singleCellValuesForHeader);
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
      const arraysToFillWithContent = this._insertContentIntoCells(emptyCells);
      column.cells.push(...arraysToFillWithContent);
   }

   private _insertContentIntoCells(cells: string[] | unknown[]) {
      return cells.map(() => lbOptions.getOptions().contentForEmptyCells);
   }
}

export default ParseData;
