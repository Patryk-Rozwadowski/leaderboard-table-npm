import Mount from "./phases/mount/Mount";
import Logger from "./common/Logger/Logger";
import ParseData from "./phases/parseData/ParseData";
import PhasesContext from "./phases/context/phases/PhasesContext";
import { HeadersProps } from "./components/header/types";
import { SortableProperties } from "./components/row/types";
import { COMMON_STYLE_CLASS } from "./components/style/common.enum";
import "./components/style/style.scss";

export interface LeaderboardOptions {
   headerTags: string | HTMLElement;
   logs: boolean;
}

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
   private _phasesContext: PhasesContext;
   private _logger: Logger;
   private _parsedData: SortableProperties[];

   constructor({ rootContainer, leaderboardData, options }: LeaderboardConfig) {
      this._rootContainer = rootContainer;
      this._logger = new Logger(this as unknown as Leaderboard);

      this._phasesContext = new PhasesContext(
         new ParseData(rootContainer, leaderboardData, options)
      );
   }

   public init(): void {
      this._parsedData = this._phasesContext.execute();

      this._rootContainer.classList.add(COMMON_STYLE_CLASS.ROOT_CONTAINER);

      this._phasesContext.transitionTo(new Mount(this._rootContainer, this._parsedData));
      this._phasesContext.execute();
   }
}

export { PreParsedLeaderboardData };
export default Leaderboard;
