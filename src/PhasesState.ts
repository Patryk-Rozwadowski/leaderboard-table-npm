import Context from "./Context";

interface StateActions {
   setContext(context: Context): void;
}

class PhasesState implements StateActions {
   protected context: Context;

   public setContext(context: Context): void {
      this.context = context;
   }

   public mount() {}
}

export { StateActions };
export default PhasesState;
