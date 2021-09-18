class Logger {
   constructor(private context: { new (...args: any[]): any }) {}

   public info(msg: string): void {
      console.log(`${this.context.constructor.name}: ${msg}`);
   }
}

export default Logger;
