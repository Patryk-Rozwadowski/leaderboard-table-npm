import { ColumnProperties, SingleRowProperties } from "../common/common.types";

type Query = (source: string[], sourceElement: ColumnProperties) => boolean;

type ColumnQueries = {
   columns: ColumnProperties[];
   columnsToCheck: string[];
   query: Query;
};

class DataParsingUtils {
   public static extractHeadersFromAcc(headersAccumulator: ColumnProperties[]): string[] {
      return headersAccumulator.map(({ header }) => header);
   }

   public static createNOfEmptyArrays(nOfArrays: number): unknown[] {
      // eslint-disable-next-line prefer-spread
      return Array.apply(null, Array(nOfArrays));
   }

   /**
    * Get all columns which doesn't have specific header.
    * @param source  - Array of columns
    * @param accEl   - Header which is has to be found
    */
   public static columnsNotIncludesHeader(
      source: SingleRowProperties[],
      accEl: { header: string }
   ): boolean {
      return !source.includes(accEl.header);
   }

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

   public static columnsNotInCurrentIteration(
      columns: ColumnProperties[],
      columnsToCheck: string[]
   ): ColumnProperties[] {
      return DataParsingUtils.getColumnByQuery({
         columns,
         columnsToCheck,
         query: DataParsingUtils.columnsNotIncludesHeader
      });
   }

   public static findElementWithMostKeys(columns: ColumnProperties[]): ColumnProperties {
      const headersArrayLength = columns.map(
         (el: ColumnProperties) => Object.keys(el).length
      );
      const longestArrayIndex = headersArrayLength.indexOf(
         Math.max(...headersArrayLength)
      );
      return columns[longestArrayIndex];
   }
}

export default DataParsingUtils;
