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
import Rows from "../../components/Row/Row.component";

enum LEADERBOARD_CLASS_STYLE {
   LEADERBOARD = "lb"
}

class Mount {
   [x: string]: any;

   constructor(
      private rootContainer: HTMLElement,
      private data: any,
      private headers: string[]
   ) {
      this.rootContainer = rootContainer;
   }

   public mount(): void {
      const leaderboardWrapper = document.createElement(
         SEMANTIC_TAGS.CONTAINER_LEADERBOARD
      );

      leaderboardWrapper.classList.add(LEADERBOARD_CLASS_STYLE.LEADERBOARD);

      this.context.transitionTo(new Rows(leaderboardWrapper, this.data));
      this.context.transitionTo(new Headers(this.rootContainer, this.headers));
      this.rootContainer.appendChild(leaderboardWrapper);
   }
}

export default Mount;
