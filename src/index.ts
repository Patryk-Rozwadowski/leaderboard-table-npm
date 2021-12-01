import Mount from "./phases/mount/Mount";
import Logger from "./common/Logger/Logger";
import ParseData from "./phases/parseData/ParseData";
import PhasesContext from "./phases/context/phases/PhasesContext";
import { HeadersProps } from "./components/header/types";
import { SortableProperties } from "./components/row/types";
import "./components/style/style.scss";
import OptionsController, { LeaderboardOptions } from "./controllers/OptionsController";
import { Newable } from "./common/common.types";
import { COMMON_STYLE_CLASS } from "./components/style/classes/commonStyle.enum";

interface LeaderboardConfig {
   rootContainer: HTMLElement;
   leaderboardData: PreParsedLeaderboardData[];
   options: LeaderboardOptions;
   headers: HeadersProps;
}

/**
 *  @interface PreParsedLeaderboardData this interface is used for client data type.
 */
interface PreParsedLeaderboardData {
   /**
    * @type header is REQUIRED - header is used for each column for arrays of rows.
    */
   header: string;

   /**
    * @type place is OPTIONAL  - if user doesn't want to use sorters, data in leaderboard
    *                           is not going to be sorted in anyway without this type.
    */
   place: number;

   /**
    * @type points is OPTIONAL - points can be used for sorting of entities based on its points.
    */
   points: number;

   /**
    *  Any other keys in client's object will be considered as data for header and properties.
    */
   [key: string]: string | number;
}

class Leaderboard {
   private readonly _rootContainer;
   private readonly _leaderboardData: PreParsedLeaderboardData[];
   private _options: LeaderboardOptions;
   private _clientOptions: LeaderboardOptions;
   private _phasesContext: PhasesContext;
   private _parsedData: SortableProperties[];
   private _logger: Logger;

   constructor({ rootContainer, leaderboardData, options }: LeaderboardConfig) {
      this._clientOptions = options;
      this._rootContainer = rootContainer;
      this._leaderboardData = leaderboardData;
      this._logger = new Logger(this as unknown as Newable);
   }

   public init(): void {
      this._options = new OptionsController(this._clientOptions).getOptions();

      this._addCssStylesToRootContainer();
      this._parseData();
      this._mountElements();
   }

   private _addCssStylesToRootContainer() {
      this._rootContainer.classList.add(COMMON_STYLE_CLASS.ROOT_CONTAINER);
   }

   private _parseData() {
      const parsePhase = new ParseData(
         this._rootContainer,
         this._leaderboardData,
         this._options
      );

      this._phasesContext = new PhasesContext(parsePhase);
      this._parsedData = this._phasesContext.execute();
   }

   private _mountElements() {
      const mountPhase = new Mount(this._rootContainer, this._parsedData);
      this._phasesContext.transitionTo(mountPhase);
      this._phasesContext.execute();
   }
}

export { PreParsedLeaderboardData };
export default Leaderboard;
