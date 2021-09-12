import PhasesState from "./PhasesState";

interface ContextActions {
   transitionTo(state: PhasesState): void;
}

class Context implements ContextActions {
   private state: PhasesState;

   constructor(state: PhasesState) {
      this.transitionTo(state);
      console.log({ state });
   }

   public transitionTo(state: PhasesState): void {
      console.log(`Context: Transition to ${state.constructor.name}`);
      this.state = state;
      this.state.setContext(this);
   }
}

export default Context;
