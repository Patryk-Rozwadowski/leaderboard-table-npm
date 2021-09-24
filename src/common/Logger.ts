class Logger {
   constructor(private _context: any) {}

   public info(msg: string): void {
      const contextName = this._context.constructor.name;
      console.log(`${contextName}: ${msg}`);
   }
}

export default Logger;
