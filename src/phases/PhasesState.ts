import { PhaseStateAction } from "./creation/types";
import { StateActions } from "./types";
import PhasesContext from "./context/phases/PhasesContext";
import { ColumnProperties } from "../common/common.types";

type ExecutePhaseReturnType = HTMLElement | HTMLElement[] | ColumnProperties[] | void;

abstract class PhasesState implements StateActions, PhaseStateAction {
   protected context: PhasesContext;

   public setContext(context: any): void {
      this.context = context;
   }

   public abstract execute(): ExecutePhaseReturnType;
}

export default PhasesState;
