import PhasesContext from "./phases/Context/PhasesContext";
import Mount from "./phases/Mount/Mount";
import PhasesState from "./PhasesState";
import Logger from "./common/Logger";
import "./style.scss";

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
   private logger: Logger;

   // TODO refactor constructor types/params
   constructor({ rootContainer, data, headers }: LeaderboardConfig) {
      this.rootContainer = rootContainer;
      this.logger = new Logger(this);

      if (!Array.isArray(data) || data.length < 1) {
         this.logger.info(`Data is not defined. Pass leaderboard information.`);
         return;
      }
      this.phasesContext = new PhasesContext(
         new Mount(rootContainer, data, headers) as unknown as PhasesState
      );
   }

   // TODO handle clicking on row
   private rowOnClickHandler(e: Event) {
      console.log(e.target);
   }

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
