import PhasesContext from "./phases/Context/PhasesContext";
import { PhaseStateAction } from "./phases/Mount/Mount.types";
import { StateActions } from "./phases/types";

abstract class PhasesState implements StateActions, PhaseStateAction {
   protected context: PhasesContext;

   public setContext(context: PhasesContext): void {
      this.context = context;
   }

   public abstract mount(): void;

   public abstract parseData(): void;
}

export default PhasesState;
