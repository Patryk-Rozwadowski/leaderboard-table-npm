type Newable = { new (...args: any): any };

// Single pre parsed client column
type SingleRowProperties = { [key: string]: string | number } | string;

/**
 * @type ColumnProperties type for column data which is after whole
 * data parsing process and ready to use.
 */
type ColumnProperties = {
   rows: SingleRowProperties[];
} & HeaderKey;

type HeaderKey = { header: string };

export { Newable, ColumnProperties, HeaderKey, SingleRowProperties };
