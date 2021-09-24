import PhasesState from "../../PhasesState";
import { PhaseContextActions } from "./Phases.types";

class PhasesContext extends PhasesState implements PhaseContextActions {
   private _state: PhasesState;

   constructor(state: PhasesState) {
      super();
      this.transitionTo(state);
   }

   public transitionTo(state: any): void {
      console.log(`Context: Transition to ${state.constructor.name}`);
      this._state = state;
      this._state.setContext(this);
   }

   public mount(): void {
      this._state.mount();
   }

   public parseData(): void {
      this._state.parseData();
   }
}

export default PhasesContext;
