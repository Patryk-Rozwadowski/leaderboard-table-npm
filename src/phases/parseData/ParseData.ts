import PhasesState from "../PhasesState";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";
import { LeaderboardOptions, LeaderboardOptionType, LeaderboardType } from "../../index";
import { Row } from "../../components/row/types";
import PlaceSorter from "../../sorters/PlaceSorter";

class ParseData extends PhasesState {
   private _logger: Logger;
   private _rows: Row[];
   private _columnsData: any;
   private _userOptions: LeaderboardOptionType;
   private _rootContainer: HTMLElement;
   private _sorter: PlaceSorter;

   constructor(rootContainer: HTMLElement, data: Row[], userOptions: LeaderboardOptions) {
      super();
      this._sorter = new PlaceSorter(data);
      this._logger = new Logger(this as unknown as Newable);
      this._rootContainer = rootContainer;
      this._rows = data;
      this._userOptions = userOptions;
   }

   public execute(): Row[] {
      this._parseData();
      return this._rows;
   }

   public getOptions(): LeaderboardOptions {
      return this._userOptions;
   }

   public getLeaderboardData(): Row[] {
      return this._rows;
   }

   public createColumn(): void {
      this._columnsData = this._rows.reduce((rowAcc: any, { place, content }: Row) => {
         if (!content) return "";
         rowAcc = [...rowAcc, { place, content }];
         return rowAcc;
      }, []);
   }

   public execute(): any {
      // TODO implementation for rows / columns
      this.userInputValidation();
      this._logger.groupEnd();

      // TODO return data based upon whether its column or just simple rows
      // return this._columnsData;
      this._sort();
      return this._rows;
   }

   private userInputValidation() {
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

   private _parseData(): void {
      this._logger.log(`Started parsing data.`);
      // TODO implementation for rows / columns

      this._userInputValidation();
      this._logger.groupEnd();

      // TODO return data based upon whether its column or just simple rows
      // return this._columnsData;
      this._sort();
   }

   private checkLeaderboardType(): LeaderboardType {
      const leaderboardType = this._userOptions.extended;
      return leaderboardType;
   }
}

export default ParseData;
