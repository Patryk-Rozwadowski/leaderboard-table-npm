import Logger from "../Logger/Logger";
import { lbLogger } from "../Logger/lbLogger";
import {
   SEMANTIC_TYPOGRAPHY_TAGS,
   SemanticHeaderTags,
   SemanticTextTags
} from "../../style/semanticTags/typography.enum";

interface LeaderboardOptions {
   logs: boolean;
   contentForEmptyCells: string;
   sortByPlaces: boolean;
   sortByPoints: boolean;

   headerPrimaryTag: SemanticHeaderTags;
   headerSubTag: SemanticHeaderTags;
   textPrimaryTag: SemanticTextTags;
   textSecondaryTag: SemanticTextTags;
}

const OptionsDefaults = {
   CONTENT_FOR_EMPTY_CELLS: "",
   LOGS: false,

   SORT_BY_PLACES: true,
   SORT_BY_POINTS: false,

   headerPrimaryTag:
      SEMANTIC_TYPOGRAPHY_TAGS.HEADER_PRIMARY_TEXT as unknown as SemanticHeaderTags,
   headerSubTag:
      SEMANTIC_TYPOGRAPHY_TAGS.SUB_HEADER_TEXT as unknown as SemanticHeaderTags,
   textPrimaryTag: SEMANTIC_TYPOGRAPHY_TAGS.PRIMARY_TEXT as unknown as SemanticTextTags,
   textSecondaryTag:
      SEMANTIC_TYPOGRAPHY_TAGS.SECONDARY_TEXT as unknown as SemanticTextTags
};

class Options {
   private _options: LeaderboardOptions = {
      contentForEmptyCells: OptionsDefaults.CONTENT_FOR_EMPTY_CELLS,
      sortByPlaces: OptionsDefaults.SORT_BY_PLACES,
      sortByPoints: OptionsDefaults.SORT_BY_POINTS,
      logs: OptionsDefaults.LOGS,

      headerPrimaryTag: OptionsDefaults.headerPrimaryTag,
      headerSubTag: OptionsDefaults.headerSubTag,
      textPrimaryTag: OptionsDefaults.textPrimaryTag,
      textSecondaryTag: OptionsDefaults.textSecondaryTag
   };
   private _logger: Logger;

   constructor() {
      this._logger = lbLogger;
   }

   public setOptions(options: LeaderboardOptions): void {
      for (const [key, value] of Object.entries(options)) {
         this._setOption(key, value);
      }

      if (this._options.logs) this._logOptions();
   }

   public getOptions(): LeaderboardOptions {
      return this._options;
   }

   private _setOption(
      option: string,
      value: { [k in keyof LeaderboardOptions]: LeaderboardOptions[k] }
   ) {
      console.log(value);
      // Typescript issue
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this._options[option] = value;
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
