import PhasesState from "./PhasesState";
import PhasesContext from "./context/phases/PhasesContext";

interface StateActions {
   setContext(context: PhasesContext): void;
}

interface ContextActions {
   transitionTo(state: PhasesState): void;
}

export { StateActions, ContextActions };
