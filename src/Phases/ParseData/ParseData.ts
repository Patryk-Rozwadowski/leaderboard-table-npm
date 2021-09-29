import PhasesState from "../../PhasesState";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";

class ParseData extends PhasesState {
   private _logger: Logger;
   private _data: any;
   private _userOptions: any;
   private _rootContainer: HTMLElement;

   constructor(rootContainer: HTMLElement, data: any, userOptions: any) {
      super();

      this._rootContainer = rootContainer;
      this._logger = new Logger(this as unknown as Newable);
      this._data = data;
      this._userOptions = userOptions;
   }

   public execute(): void {
      this._logger.log(`Started parsing data.`);
      if (!Array.isArray(this._data) || !this._data) {
         this._logger.log(`Data is not defined. Pass leaderboard information.`);
         return;
      }
   }

   private typeGuards() {
      if (
         typeof this._rootContainer === "undefined" ||
         !(this._rootContainer instanceof HTMLElement)
      ) {
         throw new Error(
            `Expected e to be an HTMLElement, was ${typeof this._rootContainer}.`
         );
      }
   }
}

export default ParseData;
