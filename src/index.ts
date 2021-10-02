import PhasesContext from "./phases/Context/PhasesContext";
import Mount from "./phases/Mount/Mount";
import Logger from "./common/Logger/Logger";
import ParseData from "./phases/ParseData/ParseData";
import { Newable } from "./common/common.types";
import { HeadersOptions } from "./Components/Headers/Headers.types";
import { Row } from "./Components/Row/Row.types";
import "./components/style/style.scss";

interface LeaderboardOptions {
   headerTags: string | HTMLElement;
   logs: boolean;
}

interface LeaderboardConfig {
   rootContainer: HTMLElement;
   leaderboardData: Row[];
   options: LeaderboardOptions;
   headers: {
      text: string | string[];
      options: HeadersOptions;
   };
}

class Leaderboard {
   private readonly _rootContainer;
   private _phasesContext: PhasesContext;
   private _logger: Logger;
   private _parsedData: any;
   private _headers: any;

   constructor({ rootContainer, leaderboardData, headers, options }: LeaderboardConfig) {
      this._rootContainer = rootContainer;
      this._logger = new Logger(this as unknown as Newable);

      this._headers = headers.text;
      this._phasesContext = new PhasesContext(
         new ParseData(rootContainer, leaderboardData, options)
      );
   }

   public init(): void {
      this._parsedData = this._phasesContext.execute();

      this._phasesContext.transitionTo(
         new Mount(this._rootContainer, this._parsedData, this._headers)
      );
      this._phasesContext.execute();
   }
}

export default Leaderboard;
