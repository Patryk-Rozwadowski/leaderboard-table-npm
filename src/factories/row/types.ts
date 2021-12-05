type PlaceProp = { place: string };
type ScoreProp = { score: number };
type PointsProp = { points: number };

type SortableKeys = PlaceProp & ScoreProp & PointsProp;

type SortableProperties = {
   [k in keyof SortableKeys]: SortableKeys[k];
};

export { SortableProperties };
