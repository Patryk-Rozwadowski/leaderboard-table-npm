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

   constructor(
      private readonly _rootContainer: HTMLElement,
      private _data: any,
      private _headers: string[]
   ) {
      super();
   }

   public mount(): void {
      const rows = new Rows(this._rootContainer, this._data);
      const headers = new Headers(this._rootContainer, this._headers);
      const leaderboardWrapper = document.createElement(
         SEMANTIC_TAGS.CONTAINER_LEADERBOARD
      );

      leaderboardWrapper.classList.add(LEADERBOARD_CLASS_STYLE.LEADERBOARD);

      this._rootContainer.appendChild(headers.render());
      this._rootContainer.appendChild(rows.render());

      this._rootContainer.appendChild(leaderboardWrapper);
   }
}

export default Mount;
