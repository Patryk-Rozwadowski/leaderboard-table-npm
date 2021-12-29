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
   private _options: LeaderboardOptions;

   constructor() {
      super();
      this._logger = lbLogger;
   }

   public setOptions(options: LeaderboardOptions): void {
      const { sortByPlaces, contentForEmptyCells, sortByPoints, headerTags, logs } =
         options;

      this.headerTags = headerTags;
      this.contentForEmptyCells = contentForEmptyCells || "";
      this.sortByPlaces = sortByPlaces || true;
      this.sortByPoints = sortByPoints;
      this.logs = logs;
   }

   public getOptions(): LeaderboardOptions {
      return {
         headerTags: this.headerTags,
         contentForEmptyCells: this.contentForEmptyCells,
         sortByPlaces: this.sortByPlaces,
         sortByPoints: this.sortByPoints,
         logs: this.logs
      };
   }

   public execute(): void {
      this._logOptions();
   }

   private static _logOption(option: string[]) {
      return "" + "\n" + option.join(" : ");
   }

   private _logOptions() {
      const optionsStringArray: string[] = Object.entries(this._options).map(
         OptionsController._logOption
      );
      this._logger.log("Options: " + optionsStringArray);
   }
}

export { LeaderboardOptions };
export default OptionsController;
