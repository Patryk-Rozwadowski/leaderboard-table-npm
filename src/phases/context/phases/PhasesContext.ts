import PhasesState from "../../PhasesState";
import { PhaseContextActions } from "./types";
import Logger from "../../../common/Logger/Logger";

class PhasesContext extends PhasesState implements PhaseContextActions {
   private _state: PhasesState;

   constructor(state: PhasesState, private _logger: Logger | undefined) {
      super();
      this.transitionTo(state);
   }

   public transitionTo(state: any): void {
      this._logger?.groupEnd();
      const contextName = state.constructor.name;
      this._state = state;
      this._state.setContext(this);
      this._logger?.setContext(this._state);
      this._logger?.group(this._state.constructor.name);
      this._logger?.log(`Transition to ${contextName}`);
   }

   public execute(): any {
      return this._state.execute();
   }
}

export default PhasesContext;
