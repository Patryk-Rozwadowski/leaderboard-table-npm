class Logger {
   constructor(private context: any) {}

   public info(msg: string): void {
      console.log(`${this.context.constructor.name}: ${msg}`);
   }
}

export default Logger;
