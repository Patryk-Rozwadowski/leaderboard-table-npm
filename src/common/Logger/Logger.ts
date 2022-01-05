class Logger {
   private _contextName: string;
   private _context: any;
   private _isOn: boolean;

   public setState(isOn: boolean): Logger {
      this._isOn = isOn;
      return this;
   }

   /**
    * @param _context   - Context where Logger is suppose to Log messages.
    */
   public setContext(context: any): void {
      if (!this._isOn) return;
      this._context = context;
      this._contextName = this._context.constructor.name;
   }

   public log(msg: string): void {
      if (!this._isOn) return;
      console.log(`${this._contextName}: ${msg}`);
   }

   public group(label: string): void {
      if (!this._isOn) return;
      console.group(label);
   }

   public groupEnd(): void {
      if (!this._isOn) return;
      console.groupEnd();
   }

   public warning(msg: string) {
      if (!this._isOn) return;
      console.warn(msg);
   }

   public error(msg: string): void {
      if (!this._isOn) return;
      console.trace(msg);
   }
}

export default Logger;
