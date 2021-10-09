import PhasesState from "../../PhasesState";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";
import { LeaderboardOptions } from "../../index";
import { Row } from "../../components/row/types";

class ParseData extends PhasesState {
   private _logger: Logger;
   private _rows: Row[];
   private _columnsData: any;
   private _userOptions: LeaderboardOptions;
   private _rootContainer: HTMLElement;

   constructor(rootContainer: HTMLElement, data: Row[], userOptions: LeaderboardOptions) {
      super();

      this._logger = new Logger(this as unknown as Newable);
      this._rootContainer = rootContainer;
      this._rows = data;
      this._userOptions = userOptions;

      this.createColumn();
   }

   public getOptions(): any {
      return this._userOptions;
   }

   public getLeaderboardData(): any {
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
      return this._columnsData;
   }

   private userInputValidation() {
      this._logger.log(`User's input validation.`);
      this.checkRootContainer();
      this.checkData();
   }

   private checkData() {
      if (!Array.isArray(this._rows) || !this._rows) {
         this._logger.error("Data is not defined. Pass leaderboard information.");
         return;
      }
      this._logger.log(`Data is valid.`);
   }

   private checkRootContainer(): void {
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

   private parseData(): void {
      this._logger.log(`Started parsing data.`);
   }

   private checkOptions(): void {}
}

export default ParseData;
