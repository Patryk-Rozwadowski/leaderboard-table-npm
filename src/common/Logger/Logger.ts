import { Newable } from "../common.types";

class Logger {
   constructor(private _context: Newable) {}

   public log(msg: string): void {
      const contextName = this._context.constructor.name;
      console.log(`${contextName}: ${msg}`);
   }
}

export default Logger;
