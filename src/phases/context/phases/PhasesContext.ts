import PhasesState from "../../PhasesState";
import { PhaseContextActions } from "./types";
import Logger from "../../../common/Logger/Logger";

class PhasesContext extends PhasesState implements PhaseContextActions {
   private _state: PhasesState;

   constructor(state: PhasesState, private _logger: Logger) {
      super();
      this.transitionTo(state);
   }

   public transitionTo(state: any): void {
      const contextName = state.constructor.name;
      this._logger?.log(`Context: Transition to ${contextName}`);
      this._state = state;
      this._state.setContext(this);
   }

   public execute(): any {
      return this._state.execute();
   }
}

export default PhasesContext;
