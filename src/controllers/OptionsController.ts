import Logger from "../common/Logger/Logger";
import { Newable } from "../common/common.types";

interface LeaderboardOptions {
   headerTags?: string | HTMLElement;
   logs?: boolean;
   contentForEmptyCells: string;
   sortByPlaces?: boolean;
   sortByPoints?: boolean;
}

class OptionsController implements LeaderboardOptions {
   contentForEmptyCells: string;
   headerTags?: string | HTMLElement;
   logs?: boolean;
   sortByPlaces?: boolean;
   sortByPoints?: boolean;
   _logger: Logger;

   constructor(private _userOptions: LeaderboardOptions) {
      const { sortByPlaces, contentForEmptyCells, sortByPoints, headerTags, logs } =
         _userOptions;

      this.headerTags = headerTags;
      this.contentForEmptyCells = contentForEmptyCells || "";
      this.sortByPlaces = sortByPlaces || true;
      this.sortByPoints = sortByPoints;
      this.logs = logs;
      this._logger = new Logger(this as unknown as Newable);

      this._logOptions();
   }

   private static _logOption(option: string[]) {
      return "" + "\n" + option.join(" : ");
   }

   private _logOptions() {
      if (!this.logs) return;
      const optionsStringArray: string[] = Object.entries(this._userOptions).map(
         OptionsController._logOption
      );
      this._logger.log("Options: " + optionsStringArray);
   }
}

export { LeaderboardOptions };
export default OptionsController;
