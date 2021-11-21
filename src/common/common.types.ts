import ElementCreator from "../factories/ElementCreator";
import { ROW_CLASS_STYLE } from "../components/row/Row";
import { COMMON_STYLE_CLASS, SEMANTIC_TAGS } from "../components/style/common.enum";
import { SortableProperties } from "../components/row/types";

type Newable = { new (...args: any): any };

/*
 * Creator
 *    This type is used for any class, which is allowed to create
 *    new Leaderboard elements.
 */
interface Creator {
   _elementCreator: ElementCreator;
}

/*
 * RootElementConnect
 *     Type for every class which operates directly with root container.
 */
interface RootElementConnector {
   root: HTMLElement;
}

// Single pre parsed client column
type SingleRowProperties = { [key: string]: string | number } | string;

type ClientColumns = {
   [key: string]: string;
}[] &
   SortableProperties;

/**
 * @type ColumnProperties type for column data which is after whole
 * data parsing process and ready to use.
 */
type ColumnProperties = {
   rows: SingleRowProperties[];
} & HeaderKey;

type HeaderKey = { header: string };

interface Component extends Creator {
   render(): HTMLElement | HTMLElement[];
}

type LbCSSClass = ROW_CLASS_STYLE | COMMON_STYLE_CLASS;
type LbSemanticTag = SEMANTIC_TAGS;

export {
   Newable,
   Creator,
   LbCSSClass,
   LbSemanticTag,
   RootElementConnector,
   Component,
   ColumnProperties,
   HeaderKey,
   SingleRowProperties,
   ClientColumns
};
