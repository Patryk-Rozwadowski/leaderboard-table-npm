import { Newable } from "../common.types";

class Logger {
   constructor(private _context: Newable) {}

   public log(msg: string): void {
      const contextName = this._context.constructor.name;
      console.log(`${contextName}: ${msg}`);
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
