import { SEMANTIC_TAGS } from "../../components/style/common.enum";

// interface leaderboardElement {
//    render(): void;
//
//    mount(): void;
//
//    prepareElements(): HTMLElement;
// }
//
// abstract class Creator {
//    public abstract factoryMethod(): Headers;
//
//    public someOperation(): string {
//       // Call the factory method to create a Product object.
//       const product = this.factoryMethod();
//       // Now, use the product.
//       return `Creator: The same creator's code has just worked with ${product.operation()}`;
//    }
// }
//
import Rows from "../../components/Row/Row.component";
import PhasesState from "../../PhasesState";
import Headers from "../../components/Headers/Headers.component";

enum LEADERBOARD_CLASS_STYLE {
   LEADERBOARD = "lb"
}

class Mount extends PhasesState {
   public parseData(): void {
      throw new Error("Method not implemented.");
   }

   [x: string]: any;

   constructor(
      private rootContainer: HTMLElement,
      private data: any,
      private headers: string[]
   ) {
      super();
      this.rootContainer = rootContainer;
   }

   public mount(): void {
      const rows = new Rows(this.rootContainer, this.data);
      const headers = new Headers(this.rootContainer, this.headers);
      const leaderboardWrapper = document.createElement(
         SEMANTIC_TAGS.CONTAINER_LEADERBOARD
      );

      leaderboardWrapper.classList.add(LEADERBOARD_CLASS_STYLE.LEADERBOARD);

      this.rootContainer.appendChild(headers.render());
      this.rootContainer.appendChild(rows.render());

      this.rootContainer.appendChild(leaderboardWrapper);
   }
}

export default Mount;
