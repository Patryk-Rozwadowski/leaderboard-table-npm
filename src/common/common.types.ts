import ElementCreator from "../factories/ElementCreator";
import { ROW_CLASS_STYLE } from "../factories/row/Row";
import { TYPOGRAPHY_STYLE_CLASS } from "../style/styleClasses/typography.enum";
import { CONTAINER_STYLE_CLASS } from "../style/styleClasses/container.enum";

type Newable = { new (...args: any): any };

/*
 * Creator
 *    This type is used for any class, which is allowed to create
 *    new Leaderboard elements.
 */
interface Creator {
   _elementCreator: ElementCreator;
}

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

interface Component extends Creator {
   create(): HTMLElement | HTMLElement[];
}

type LbCSSClass = ROW_CLASS_STYLE | CONTAINER_STYLE_CLASS | TYPOGRAPHY_STYLE_CLASS;

export {
   Newable,
   Creator,
   LbCSSClass,
   Component,
   ColumnProperties,
   HeaderKey,
   SingleRowProperties
};
