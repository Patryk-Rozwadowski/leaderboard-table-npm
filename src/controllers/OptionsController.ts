import Logger from "../common/Logger/Logger";
import PhasesState from "../phases/PhasesState";
import { lbLogger } from "../common/Logger/lbLogger";

interface LeaderboardOptions {
   headerTags?: string | HTMLElement;
   logs?: boolean;
   contentForEmptyCells: string;
   sortByPlaces?: boolean;
   sortByPoints?: boolean;
}

class OptionsController extends PhasesState implements LeaderboardOptions {
   contentForEmptyCells: string;
   headerTags?: string | HTMLElement;
   logs?: boolean;
   sortByPlaces?: boolean;
   sortByPoints?: boolean;
   private _logger: Logger;

   constructor(private _userOptions: LeaderboardOptions) {
      super();
      const { sortByPlaces, contentForEmptyCells, sortByPoints, headerTags, logs } =
         _userOptions;

      this.headerTags = headerTags;
      this.contentForEmptyCells = contentForEmptyCells || "";
      this.sortByPlaces = sortByPlaces || true;
      this.sortByPoints = sortByPoints;
      this.logs = logs;
      this._logger = lbLogger;
   }

   public execute(): void {
      this._logOptions();
   }

   private static _logOption(option: string[]) {
      return "" + "\n" + option.join(" : ");
   }

   private _logOptions() {
      const optionsStringArray: string[] = Object.entries(this._userOptions).map(
         OptionsController._logOption
      );
      this._logger.log("Options: " + optionsStringArray);
   }
}

export { LeaderboardOptions };
export default OptionsController;
