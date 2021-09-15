import PhasesContext from "./PhasesContext";

interface StateActions {
   setContext(context: PhasesContext): void;
}

class PhasesState implements StateActions {
   protected context: PhasesContext;

   public setContext(context: PhasesContext): void {
      this.context = context;
   }

   public mount() {}
}

export { StateActions };
export default PhasesState;
