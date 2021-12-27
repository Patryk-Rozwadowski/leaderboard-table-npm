type Newable = { new (...args: any): any };

type SingleCellProperties = { [key: string]: string | number } | string;

/**
 * @type ColumnProperties type for column data which is after whole
 * data parsing process and ready to use.
 */
type ColumnProperties = {
   cells: SingleCellProperties[];
   header: string;
};

export { Newable, ColumnProperties, SingleCellProperties };
