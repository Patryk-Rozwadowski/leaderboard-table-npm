import PhasesState from "../../PhasesState";
import Headers from "../../components/Headers/Headers.component";
import { SEMANTIC_TAGS } from "../../components/style/common.enum";
import Row from "../../components/Row/Row.component";

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
// class Row extends Creator {}

enum LEADERBOARD_CLASS_STYLE {
   LEADERBOARD = "lb"
}

class Mount extends PhasesState {
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
      const leaderboardWrapper = document.createElement(
         SEMANTIC_TAGS.CONTAINER_LEADERBOARD
      );
      leaderboardWrapper.classList.add(LEADERBOARD_CLASS_STYLE.LEADERBOARD);

      const rowContainer = this.createRow();

      leaderboardWrapper.appendChild(rowContainer);
      this.context.transitionTo(new Headers(this.rootContainer, this.headers));
      this.rootContainer.appendChild(leaderboardWrapper);

      this.context.transitionTo(new Row(this.data.data));
   }
}

export default Mount;
