import "./style.scss";
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
}

const Leaderboard = function ({ rootContainer, data }: LeaderboardConfig): void {
   // TODO implement event system
   const events = [];
   let root: HTMLElement;

   function mount(): void {
      const headersTextMOCK = ["Header First", "Header Second"];
      const wrapper = document.createElement("div");

      wrapper.classList.add("leaderboard");
      root = rootContainer;

      const headersContainer = document.createElement("div");
      headersContainer.classList.add("leaderboard__headers");

      const frag = document.createDocumentFragment();

      // TODO handle headertags as HTMLElement
      // if (headerTagType instanceof HTMLElement) return;

      headersTextMOCK.map((headerText) => {
         const headerTag = document.createElement("h5");
         headerTag.textContent = headerText;
         headerTag.classList.add("leaderboard__headers__text", "leaderboard__col");
         frag.appendChild(headerTag);
      });

      Object.entries((_: any, [key, val]: [any, any]) => {});

      headersContainer.appendChild(frag);
      wrapper.appendChild(headersContainer);

      root.appendChild(wrapper);
   }

   // TODO change name
   function typeGuards() {
      if (
         typeof rootContainer === "undefined" ||
         !(rootContainer instanceof HTMLElement)
      ) {
         throw new Error(`Expected e to be an HTMLElement, was ${typeof rootContainer}.`);
      }
   }

   function init(): void {
      console.log({ data });

      typeGuards();
      mount();
   }

   init();
};

export default Leaderboard;
