import PhasesState from "../../PhasesState";
import { PhaseContextActions } from "./Phases.types";

class PhasesContext extends PhasesState implements PhaseContextActions {
   private _state: PhasesState;

   constructor(state: PhasesState) {
      super();
      this.transitionTo(state);
   }

   public transitionTo(state: any): void {
      const contextName = state.constructor.name;
      console.log(`Context: Transition to ${contextName}`);
      this._state = state;
      this._state.setContext(this);
   }

   public execute(): any {
      return this._state.execute();
   }
}

export default PhasesContext;
