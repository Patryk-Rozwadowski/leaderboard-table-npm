import PhasesContext from "./Phases/Context/PhasesContext";
import { PhaseStateAction } from "./Phases/Mount/Mount.types";
import { StateActions } from "./Phases/types";

abstract class PhasesState implements StateActions, PhaseStateAction {
   protected context: PhasesContext;

   public setContext(context: PhasesContext): void {
      this.context = context;
   }

   public mount(): void {}
}

export default PhasesState;
