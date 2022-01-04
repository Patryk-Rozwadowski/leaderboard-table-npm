import Logger from "../Logger/Logger";
import { lbLogger } from "../Logger/lbLogger";
import {
   SEMANTIC_TYPOGRAPHY_TAGS,
   SemanticHeaderTags,
   SemanticTextTags
} from "../../style/semanticTags/typography.enum";
import { SEMANTIC_TAGS } from "../../style/semanticTags";

interface LeaderboardOptions {
   headerTags: string;
   logs: boolean;
   contentForEmptyCells: string;
   sortByPlaces: boolean;
   sortByPoints: boolean;

   HEADER_PRIMARY_TAG: SemanticHeaderTags;
   HEADER_SUB_TAG: SemanticHeaderTags;
   TEXT_PRIMARY_TAG: SemanticTextTags;
   TEXT_SECONDARY_TAG: SemanticTextTags;
}

const OptionsDefaults = {
   CONTENT_FOR_EMPTY_CELLS: "",
   LOGS: false,

   SORT_BY_PLACES: true,
   SORT_BY_POINTS: false,

   HEADER_PRIMARY_TAG: SEMANTIC_TAGS.HEADER_PRIMARY_TEXT as unknown as SemanticHeaderTags,
   HEADER_SUB_TAG: SEMANTIC_TAGS.SUB_HEADER_TEXT as unknown as SemanticHeaderTags,
   TEXT_PRIMARY_TAG: SEMANTIC_TYPOGRAPHY_TAGS.PRIMARY_TEXT as SemanticTextTags,
   TEXT_SECONDARY_TAG: SEMANTIC_TYPOGRAPHY_TAGS.SECONDARY_TEXT as SemanticTextTags
};

class Options {
   private _options: LeaderboardOptions;
   private _logger: Logger;

   constructor() {
      this._logger = lbLogger;
   }

   public setOptions(options: LeaderboardOptions): void {
      if (!options) return;
      const {
         sortByPlaces,
         contentForEmptyCells,
         sortByPoints,
         headerTags,
         logs,
         HEADER_PRIMARY_TAG,
         TEXT_PRIMARY_TAG,
         TEXT_SECONDARY_TAG,
         HEADER_SUB_TAG
      } = options;

      this._options = {
         headerTags: headerTags || OptionsDefaults.HEADER_PRIMARY_TAG,
         contentForEmptyCells:
            contentForEmptyCells || OptionsDefaults.CONTENT_FOR_EMPTY_CELLS,
         sortByPlaces: sortByPlaces || OptionsDefaults.SORT_BY_PLACES,
         sortByPoints: sortByPoints || OptionsDefaults.SORT_BY_POINTS,
         logs: logs || OptionsDefaults.LOGS,
         HEADER_PRIMARY_TAG: HEADER_PRIMARY_TAG || OptionsDefaults.HEADER_PRIMARY_TAG,
         HEADER_SUB_TAG: HEADER_SUB_TAG || OptionsDefaults.HEADER_SUB_TAG,
         TEXT_PRIMARY_TAG: TEXT_PRIMARY_TAG || OptionsDefaults.TEXT_PRIMARY_TAG,
         TEXT_SECONDARY_TAG: TEXT_SECONDARY_TAG || OptionsDefaults.TEXT_SECONDARY_TAG
      };

      if (this._options.logs) this._logOptions();
   }

   public getOptions(): LeaderboardOptions {
      return this._options;
   }

   private _logOption(option: string[]) {
      console.log("Option: " + option.join(" : "));
   }

   private _logOptions() {
      Object.entries(this._options).map(this._logOption);
   }
}

export { LeaderboardOptions };
export default Options;
