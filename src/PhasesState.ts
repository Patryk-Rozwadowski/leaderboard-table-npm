import PhasesContext from "./phases/Context/PhasesContext";
import { PhaseStateAction } from "./phases/Mount/Mount.types";
import { StateActions } from "./phases/types";

abstract class PhasesState implements StateActions, PhaseStateAction {
   protected context: PhasesContext;

   public setContext(context: PhasesContext): void {
      this.context = context;
   }

   public mount(): void {}
}

export default PhasesState;
