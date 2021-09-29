import PhasesContext from "./phases/Context/PhasesContext";
import Mount from "./phases/Mount/Mount";
import Logger from "./common/Logger/Logger";
import ParseData from "./phases/ParseData/ParseData";
import { Newable } from "./common/common.types";
import "./components/style/style.scss";

// TODO refactor leaderboardConfig interface
interface LeaderboardConfig {
   rootContainer: HTMLElement;
   // TODO data types
   data: [
      {
         place: number;
         content: string;
      }
   ];
   options: {
      headerTags: string | HTMLElement;
      avatar: string;
   };
   headers: string[];
}

class Leaderboard {
   private readonly _rootContainer;
   private _phasesContext: PhasesContext;
   private _logger: Logger;
   private _data: any;
   private _headers: any;

   // TODO refactor constructor types/params
   constructor({ rootContainer, data, headers, options }: LeaderboardConfig) {
      this._rootContainer = rootContainer;
      this._logger = new Logger(this as unknown as Newable);
      this._headers = headers;

      this._phasesContext = new PhasesContext(
         new ParseData(rootContainer, data, options)
      );
      this._phasesContext.execute();
   }

   public init(): void {
      this._phasesContext.transitionTo(
         new Mount(this._rootContainer, this._data, this._headers)
      );
      this._phasesContext.execute();
   }
}

export default Leaderboard;
