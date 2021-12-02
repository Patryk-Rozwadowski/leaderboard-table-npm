interface LeaderboardOptions {
   headerTags: string | HTMLElement;
   logs: boolean;
   contentForEmptyRows: string;
   sortByPlaces: boolean;
   sortByPoints: boolean;
}

class OptionsController implements LeaderboardOptions {
   headerTags: string | HTMLElement;
   logs: boolean;
   contentForEmptyRows: string;
   sortByPlaces: boolean;
   sortByPoints: boolean;

   constructor(public _userOptions: LeaderboardOptions) {
      const { sortByPlaces, contentForEmptyRows, sortByPoints, headerTags, logs } =
         _userOptions;

      this.headerTags = headerTags;
      this.contentForEmptyRows = contentForEmptyRows;
      this.sortByPlaces = sortByPlaces;
      this.sortByPoints = sortByPoints;
      this.logs = logs;
   }
}

export { LeaderboardOptions };
export default OptionsController;
