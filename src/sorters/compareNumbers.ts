export enum ComparisonResult {
   FirstBeforeSecond = -1,
   Equal = 0,
   SecondBeforeFirst = 1
}

function compareNumbers(a: number, b: number): number {
   return a - b;
}

export { compareNumbers };
