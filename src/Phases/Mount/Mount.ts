import Rows from "../../components/Row/Row.component";
import PhasesState from "../../PhasesState";
import Headers from "../../components/Headers/Headers.component";
import Logger from "../../common/Logger/Logger";
import { SEMANTIC_TAGS } from "../../components/style/common.enum";
import { Newable } from "../../common/common.types";

enum LEADERBOARD_CLASS_STYLE {
   LEADERBOARD = "lb"
}

class Mount extends PhasesState {
   private _logger: Logger;

   public parseData(): void {
      throw new Error("Method not implemented.");
   }

   constructor(
      private readonly _rootContainer: HTMLElement,
      private _data: any,
      private _headers: string[]
   ) {
      super();
      this._logger = new Logger(this as unknown as Newable);
   }

   public mount(): void {
      const rows = new Rows(this._rootContainer, this._data);
      const headers = new Headers(this._rootContainer, this._headers);
      const leaderboardWrapper = document.createElement(
         SEMANTIC_TAGS.CONTAINER_LEADERBOARD
      );

      leaderboardWrapper.classList.add(LEADERBOARD_CLASS_STYLE.LEADERBOARD);

      if (this._headers) {
         this._logger.info(`Headers exists: ${!!this._headers}`);
         this._rootContainer.appendChild(headers.render());
      }

      this._rootContainer.appendChild(rows.render());

      this._rootContainer.appendChild(leaderboardWrapper);
   }
}

export default Mount;
