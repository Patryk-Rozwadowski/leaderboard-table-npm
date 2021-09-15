import "./style.scss";
import PhasesContext from "./PhasesContext";
import Mount from "./Phases/Mount/Mount";
import PhasesState from "./PhasesState";

// TODO refactor leaderboardConfig interface
interface LeaderboardConfig {
   rootContainer: HTMLElement;
   // TODO data types
   data: [
      {
         place: number;
         content: string;
      }
   ];
   options: {
      headerTags: string | HTMLElement;
      avatar: string;
   };
   headers: string[];
}

class Leaderboard {
   private readonly rootContainer;
   private phasesContext: PhasesContext;
   private data;

   // TODO refactor constructor types/params
   constructor({ rootContainer, data, headers }: LeaderboardConfig) {
      this.rootContainer = rootContainer;
      this.data = data;
      this.phasesContext = new PhasesContext(
         new Mount(rootContainer, data) as unknown as PhasesState
      );
   }

   // TODO handle clicking on row
   private rowOnClickHandler(e: Event) {
      console.log(e.target);
   }

   // TODO change name
   private typeGuards() {
      if (
         typeof this.rootContainer === "undefined" ||
         !(this.rootContainer instanceof HTMLElement)
      ) {
         throw new Error(
            `Expected e to be an HTMLElement, was ${typeof this.rootContainer}.`
         );
      }
   }

   public init(): void {
      this.typeGuards();
      this.phasesContext.mount();
   }
}

export default Leaderboard;
