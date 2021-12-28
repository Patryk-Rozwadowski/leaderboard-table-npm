import Mount from "./phases/mount/Mount";
import ParseData from "./phases/parseData/ParseData";
import PhasesContext from "./phases/context/phases/PhasesContext";
import "./style/style.scss";
import OptionsController, { LeaderboardOptions } from "./controllers/OptionsController";
import { CONTAINER_STYLE_CLASS } from "./style/styleClasses/container.enum";
import { lbLogger } from "./common/Logger/lbLogger";
import Logger from "./common/Logger/Logger";
import { ColumnProperties } from "./common/common.types";

/**
 *  @interface PreParsedLeaderboardData this interface is used for client data type.
 */

// TODO check PreParsedLeaderboardData
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
   private readonly _clientOptions: LeaderboardOptions;
   private readonly _rootContainer;
   private readonly _leaderboardData: PreParsedLeaderboardData[];
   private readonly _logger: Logger | undefined;
   private _options: OptionsController;
   private _phasesContext: PhasesContext;
   private _parsedData: ColumnProperties[];

   constructor(
      rootContainer: HTMLElement,
      leaderboardData: PreParsedLeaderboardData[],
      options: LeaderboardOptions
   ) {
      this._clientOptions = options || {};
      this._rootContainer = rootContainer;
      this._leaderboardData = leaderboardData;

      this._logger = this._clientOptions.logs
         ? lbLogger.setState(true)
         : lbLogger.setState(false);
   }

   public init(): void {
      this._parseOptions();
      this._addCssStylesToRootContainer();
      this._parseData();
      this._mountElements();
   }

   private _parseOptions() {
      this._options = new OptionsController(this._clientOptions);
      this._phasesContext = new PhasesContext(this._options, this._logger);
      this._phasesContext.execute();
   }

   private _addCssStylesToRootContainer() {
      this._rootContainer.classList.add(CONTAINER_STYLE_CLASS.ROOT_CONTAINER);
   }

   private _parseData() {
      const parsePhase = new ParseData(
         this._rootContainer,
         this._leaderboardData,
         this._options
      );
      this._phasesContext.transitionTo(parsePhase);
      this._parsedData = this._phasesContext.execute();
   }

   private _mountElements() {
      const mountPhase = new Mount(this._rootContainer, this._parsedData, this._options);
      this._phasesContext.transitionTo(mountPhase);
      this._phasesContext.execute();
   }
}

export { PreParsedLeaderboardData };
export default Leaderboard;
