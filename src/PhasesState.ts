import PhasesContext from "./phases/context/phases/PhasesContext";
import { PhaseStateAction } from "./phases/mount/types";
import { StateActions } from "./phases/types";

abstract class PhasesState implements StateActions, PhaseStateAction {
   protected context: PhasesContext;

   public setContext(context: any): void {
      this.context = context;
   }

   public abstract execute(): any;
}

export default PhasesState;
