import PhasesState from "../../PhasesState";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";

class ParseData extends PhasesState {
   private _logger: Logger;
   private _leaderboardData: any;
   private _userOptions: any;
   private _rootContainer: HTMLElement;

   constructor(rootContainer: HTMLElement, data: any, userOptions: any) {
      super();

      this._logger = new Logger(this as unknown as Newable);
      this._rootContainer = rootContainer;
      this._leaderboardData = data;
      this._userOptions = userOptions;
      this._logger.group("ParseData");
   }

   public getOptions(): any {
      return this._userOptions;
   }

   public getLeaderboardData(): any {
      return this._leaderboardData;
   }

   public execute(): any {
      this.userInputValidation();
      this._logger.groupEnd();
      return this._leaderboardData;
   }

   private userInputValidation() {
      this._logger.log(`User's input validation.`);
      this.checkRootContainer();
      this.checkData();
   }

   private checkData() {
      if (!Array.isArray(this._leaderboardData) || !this._leaderboardData) {
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
