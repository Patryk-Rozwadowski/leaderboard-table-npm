import { ColumnProperties } from "../common/common.types";

type ColumnQueriesProps = {
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
   }: ColumnQueriesProps): ColumnProperties[] {
      return columns.filter((sourceElement: ColumnProperties) =>
         query(columnsToCheck, sourceElement)
      );
   }
}

export { Query, ColumnQueriesProps };
export default ColumnQuery;
