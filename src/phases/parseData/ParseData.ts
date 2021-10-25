import PhasesState from "../PhasesState";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";
import { LeaderboardOptions, LeaderboardOptionType } from "../../index";
import { RowProperties } from "../../components/row/types";
import PlaceSorter from "../../sorters/PlaceSorter";

class ParseData extends PhasesState {
   private _logger: Logger;
   private _rows: RowProperties[];
   private _columnsData: any;
   private _userOptions: LeaderboardOptionType;
   private _rootContainer: HTMLElement;
   private _sorter: PlaceSorter;

   constructor(
      rootContainer: HTMLElement,
      data: RowProperties[],
      userOptions: LeaderboardOptions
   ) {
      super();
      this._sorter = new PlaceSorter(data);
      this._logger = new Logger(this as unknown as Newable);
      this._rootContainer = rootContainer;
      this._rows = data;
      this._userOptions = userOptions;
   }

   public execute(): RowProperties[] {
      this._parseData();
      this._logger.groupEnd();
      return this._rows;
   }

   public getOptions(): LeaderboardOptions {
      return this._userOptions;
   }

   public createColumn(): void {
      this._columnsData = this._rows.reduce(
         (rowAcc: any, { place, content }: RowProperties) => {
            if (!content) return "";
            rowAcc = [...rowAcc, { place, content }];
            return rowAcc;
         },
         []
      );
   }

   private _userInputValidation() {
      this._logger.log(`User's input validation.`);
      this._checkRootContainer();
      this._checkData();
   }

   private _sort() {
      if (this._userOptions) this._rows = this._sorter.ascendant();
   }

   private _checkData() {
      this._logger.log("Checking data types.");

      // TODO handler for columns data
      if (!Array.isArray(this._rows) || !this._rows) {
         this._logger.error("Data is not defined. Pass leaderboard information.");
         return;
      }
      this._logger.log(`Data is valid.`);
   }

   private _checkRootContainer(): void {
      if (
         typeof this._rootContainer === "undefined" ||
         !(this._rootContainer instanceof HTMLElement)
      ) {
         throw new Error(
            `Expected e to be an HTMLElement, was ${typeof this._rootContainer}.`
         );
      }
      this._logger.log("Root element is valid.");
   }

   private _parseData(): RowProperties[] {
      this._logger.log(`Started parsing data.`);
      this._userInputValidation();
      this._sort();

      if (this._isExtended()) {
         return this._columnsData;
      }
      return this._rows;
   }

   private _isExtended(): boolean {
      return !!this._userOptions.extended;
   }
}

export default ParseData;
