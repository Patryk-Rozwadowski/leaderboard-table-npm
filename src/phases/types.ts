import PhasesContext from "./context/phases/PhasesContext";
import PhasesState from "../PhasesState";

interface StateActions {
   setContext(context: PhasesContext): void;
}

interface ContextActions {
   transitionTo(state: PhasesState): void;
}

export { StateActions, ContextActions };
