interface LeaderboardOptions {
   headerTags: string | HTMLElement;
   logs: boolean;
   contentForEmptyRows: string;
   sortByPlaces: boolean;
   sortByPoints: boolean;
}

class OptionsController {
   constructor(private _userOptions: LeaderboardOptions) {}

   public getOptions(): LeaderboardOptions {
      return this._userOptions;
   }
}

export { LeaderboardOptions };
export default OptionsController;
