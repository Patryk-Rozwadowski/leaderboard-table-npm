import PhasesState from "./PhasesState";

interface ContextActions {
   transitionTo(state: PhasesState): void;
}

type PhaseContextActions = {
   mount(): void;
} & ContextActions;

class PhasesContext implements PhaseContextActions {
   private state: PhasesState;

   constructor(state: PhasesState) {
      this.transitionTo(state);
   }

   public transitionTo(state: PhasesState): void {
      console.log(`Context: Transition to ${state.constructor.name}`);
      this.state = state;
      this.state.setContext(this);
   }

   public mount(): void {
      this.state.mount();
   }
}

export default PhasesContext;
