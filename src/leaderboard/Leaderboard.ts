import Creation from "../phases/creation/Creation";
import ParseData from "../phases/parseData/ParseData";
import PhasesContext from "../phases/context/phases/PhasesContext";
import "../style/style.scss";
import { LeaderboardOptions } from "../common/options/Options";
import { CONTAINER_STYLE_CLASS } from "../style/styleClasses/container.enum";
import { lbLogger } from "../common/Logger/lbLogger";
import Logger from "../common/Logger/Logger";
import { ColumnProperties } from "../common/common.types";
import { lbOptions } from "../common/options/lbOptions";

export type SortableByProps = {
   /**
    * @type place is OPTIONAL  - if user doesn't want to use sorters, data in leaderboard
    *                           is not going to be sorted in anyway without this type.
    */
   place?: number;

   /**
    * @type points is OPTIONAL - points can be used for sorting of entities based on its points.
    */
   points?: number;
};

type LeaderboardData = {
   [k: string]: string | number;
} & {
   [k in keyof SortableByProps]: number;
};

class Leaderboard {
   private readonly _leaderboardData: LeaderboardData[];
   private readonly _logger: Logger | undefined;
   private _rootContainer;
   private _phasesContext: PhasesContext;
   private _parsedData: ColumnProperties[];

   constructor(
      rootContainer: HTMLElement,
      leaderboardData: LeaderboardData[],
      options: Partial<LeaderboardOptions> = lbOptions.getOptions()
   ) {
      this._rootContainer = rootContainer;
      this._leaderboardData = leaderboardData;
      lbOptions.setOptions(leaderboardData, options);

      this._logger = lbOptions.getOptions().logs
         ? lbLogger.setState(true)
         : lbLogger.setState(false);
   }

   public init(): void {
      this._addCssStylesToRootContainer();
      this._parseData();
      this._mountElements();
   }

   private _addCssStylesToRootContainer() {
      const lbRootContainer = document.createElement("div");
      this._rootContainer.appendChild(lbRootContainer);
      lbRootContainer.classList.add(CONTAINER_STYLE_CLASS.ROOT_CONTAINER);
      this._rootContainer = lbRootContainer;
   }

   private _parseData() {
      const parsePhase = new ParseData(this._rootContainer, this._leaderboardData);
      this._phasesContext = new PhasesContext(parsePhase, this._logger);
      this._phasesContext.transitionTo(parsePhase);
      this._parsedData = this._phasesContext.execute();
   }

   private _mountElements() {
      const mountPhase = new Creation(this._rootContainer, this._parsedData);
      this._phasesContext.transitionTo(mountPhase);
      this._phasesContext.execute();
   }
}

export { LeaderboardData };
export default Leaderboard;
