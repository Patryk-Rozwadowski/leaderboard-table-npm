import { PhaseStateAction } from "./mount/types";
import { StateActions } from "./types";
import PhasesContext from "./context/phases/PhasesContext";

abstract class PhasesState implements StateActions, PhaseStateAction {
   protected context: PhasesContext;

   public setContext(context: any): void {
      this.context = context;
   }

   public abstract execute(): any;
}

export default PhasesState;
