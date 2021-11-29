import { ColumnProperties, SingleRowProperties } from "../../../common/common.types";
import ColumnQuery from "../../../controllers/ColumnQueriesProps";

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
    * @param column   - Header which is has to be found
    */
   public static columnsNotIncludesHeader(
      source: SingleRowProperties[],
      column: ColumnProperties
   ): boolean {
      const { header } = column;
      return !source.includes(header);
   }

   public static insertValuesToColumnRows(
      column: ColumnProperties,
      value: SingleRowProperties
   ): void {
      column.rows.push(value);
   }

   /**
    * @param columns          - All parsed columns
    * @param columnsToCheck   - Client's headers, which are needed to be checked
    */
   public static columnsNotInCurrentIteration(
      columns: ColumnProperties[],
      columnsToCheck: string[]
   ): ColumnProperties[] {
      return ColumnQuery.getColumnByQuery({
         columns,
         columnsToCheck,
         query: DataParsingUtils.columnsNotIncludesHeader
      });
   }

   public static findElementWithMostKeys(columns: ColumnProperties[]): ColumnProperties {
      const headersArrayLength = columns.map(
         (column: ColumnProperties) => Object.keys(column).length
      );
      const longestArrayIndex = headersArrayLength.indexOf(
         Math.max(...headersArrayLength)
      );
      return columns[longestArrayIndex];
   }
}

export default DataParsingUtils;
