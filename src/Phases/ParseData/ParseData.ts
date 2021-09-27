import PhasesState from "../../PhasesState";

class ParseData extends PhasesState {
   constructor() {
      super();
   }

   execute(): void {
      console.log("Parsing data");
   }
}

export default ParseData;
