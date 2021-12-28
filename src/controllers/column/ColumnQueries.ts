import { ColumnProperties } from "../../common/common.types";

type ColumnQueries = {
   columns: ColumnProperties[];
   columnsToCheck: string[];
   query: Query;
};

type Query = (source: string[], sourceElement: ColumnProperties) => boolean;

class ColumnQuery {
   /**
    * Getting column by header from source which contains columns.
    * @param columns
    * @param source
    * @param query
    * @private
    */
   public static getColumnByQuery({
      columns,
      columnsToCheck,
      query
   }: ColumnQueries): ColumnProperties[] {
      return columns.filter((sourceElement: ColumnProperties) =>
         query(columnsToCheck, sourceElement)
      );
   }
}

export { Query, ColumnQueries };
export default ColumnQuery;
