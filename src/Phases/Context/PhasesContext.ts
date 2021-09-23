import PhasesState from "../../PhasesState";
import { PhaseContextActions } from "./Phases.types";

class PhasesContext extends PhasesState implements PhaseContextActions {
   private state: PhasesState;

   constructor(state: PhasesState) {
      super();
      this.transitionTo(state);
   }

   public transitionTo(state: any): void {
      console.log(`Context: Transition to ${state.constructor.name}`);
      this.state = state;
      this.state.setContext(this);
   }

   public mount(): void {
      this.state.mount();
   }

   public parseData(): void {
      this.state.parseData();
   }
}

export default PhasesContext;
