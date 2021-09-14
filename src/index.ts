import "./style.scss";
import Context from "./Context";
import Mount from "./Phases/Mount";

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
   private phasesContext: Context;
   private data;

   // TODO refactor constructor types/params
   constructor({ rootContainer, data, headers }: LeaderboardConfig) {
      this.rootContainer = rootContainer;
      this.data = data;
      this.phasesContext = new Context(new Mount(rootContainer, data));
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
