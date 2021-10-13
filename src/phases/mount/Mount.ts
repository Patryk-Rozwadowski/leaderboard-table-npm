import Rows from "../../components/row/Row";
import PhasesState from "../PhasesState";
import Headers from "../../components/headers/Headers";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";

class Mount extends PhasesState {
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
   }

   public execute(): void {
      if (this._headerTexts) {
         this._headers = new Headers(this._rootContainer, this._headerTexts);
         this.addComponentToMount(this._headers.render());
      }
      this.addComponentToMount(this._rows.render());
      this._componentToMount.map((component) => {
         this._rootContainer.appendChild(component);
      });
      this._logger.log(`${this._componentToMount.length} components mounted.`);
   }

   private addComponentToMount(component: HTMLElement) {
      // TODO nice to have better logger with better component's name instead of nodeName
      this._logger.log(`Add ${component.nodeName} to mount queue.`);
      this._componentToMount.push(component);
   }
}

export default Mount;
