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
   private _leaderboardWrapper: HTMLElement;
   private _rows: Rows;
   private _headers: Headers;
   private _logger: Logger;
   private _componentToMount: HTMLElement[] = [];

   constructor(
      private readonly _rootContainer: HTMLElement,
      private _data: any,
      private _headerTexts: string[]
   ) {
      super();
      this._rows = new Rows(this._rootContainer, this._data);
      this._logger = new Logger(this as unknown as Newable);

      this._leaderboardWrapper = document.createElement(
         SEMANTIC_TAGS.CONTAINER_LEADERBOARD
      );
      this._leaderboardWrapper.classList.add(LEADERBOARD_CLASS_STYLE.LEADERBOARD);
   }

   public execute2(): void {
      this._logger.log("Parsedata handling");
   }

   public execute(): void {
      if (this._headerTexts) {
         this._headers = new Headers(this._rootContainer, this._headerTexts);
         this.addComponentToMount(this._headers.render());
      }

      this.addComponentToMount(this._rows.render());
      this.addComponentToMount(this._leaderboardWrapper);

      this._componentToMount.map((component) => {
         this._rootContainer.appendChild(component);
      });
      this._logger.log(`${this._componentToMount.length} components mounted.`);
   }

   private addComponentToMount(component: HTMLElement) {
      // TODO nice to have better logger with better component's name
      this._logger.log(`Add ${component.nodeName} to mount queue.`);
      this._componentToMount.push(component);
   }
}

export default Mount;
