import { Newable } from "../common.types";

class Logger {
   private readonly _contextName: string;

   /**
    * @param _context   - Context where Logger is suppose to Log messages.
    * @param initGroup  - If logger should create group for picked _context.
    */
   constructor(private readonly _context: Newable, initGroup = true) {
      this._context = _context;
      this._contextName = this._context.constructor.name;
      if (initGroup) this.initialStateGroup();
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
      this.group(this._contextName);
   }
}

export default Logger;
