import { Newable } from "../common.types";

class Logger {
   private readonly _contextName: string;

   constructor(private _context: Newable) {
      this._contextName = this._context.constructor.name;
      this.group(this._contextName);
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
}

export default Logger;
