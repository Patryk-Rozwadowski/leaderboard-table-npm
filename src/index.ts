import "./style.scss";
import { compareNumbers } from "./sorters/compareNumbers";
import PhasesState from "./PhasesState";
import Context from "./Context";
import Mount from "./Phases/Mount";

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

interface Phases {
   parseInputs(): void;
   mountSkeleton(): void;
   parseData(): void;
   update(): void;
   render(): void;
}

interface Parser {
   parseLeaderboardData(): void;
}

interface Sort {
   sort(): void;
}

type ElementPlace = { place: number };

class LeaderboardState {}

class Leaderboard {
   private readonly rootContainer;
   private phasesContext: Context;
   private state: PhasesState;
   private data;

   public setContext(context: Context) {
      this.phasesContext = context;
   }

   public handle1(): void {}

   constructor({ rootContainer, data, headers }: LeaderboardConfig) {
      this.rootContainer = rootContainer;
      this.data = data;
      // this.headers = headers;
      this.state = new PhasesState();
      this.phasesContext = new Context(new Mount(rootContainer, data));
   }

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
      // FIRST PHASE
      this.typeGuards();

      // PARSE DATA

      // LAST PHASE
      // this.mount();
   }
}

export default Leaderboard;
