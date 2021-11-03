import { Newable } from "../common.types";
import Leaderboard from "../../index";
import Row from "../../components/row/Row";

class Logger {
   private readonly _contextName: string;

   constructor(private _context: Newable | Leaderboard | Row) {
      this._context = _context;
      this._contextName = this._context.constructor.name;
      this.initialStateGroup();
   }

   public log(msg: string): void {
      console.log(`${this._contextName}: ${msg}`);
   }

   public group(label: string): void {
      console.group(label);
   }

   public groupEnd(): void {
      console.groupEnd();
   }

   public error(msg: string): void {
      console.trace(msg);
   }

   private initialStateGroup() {
      if (!(this._context instanceof Row)) this.group(this._contextName);
      if (this._context instanceof Leaderboard) {
         this.group("State");
      }
   }
}

export default Logger;
