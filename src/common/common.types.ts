import ElementFactory from "../creators/ElementFactory";
import { ROW_CLASS_STYLE } from "../components/row/Row";
import { COMMON_STYLE_CLASS } from "../components/style/common.enum";
import { TEXT_STYLE_CLASS } from "../creators/textFactory/TextFactory";

type Newable = { new (...args: any): any };

/*
 * Creator
 *    This type is used for any class, which is allowed to create
 *    new Leaderboard elements.
 */
interface Creator {
   _elementCreator: ElementFactory;
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

type LbCSSClass = ROW_CLASS_STYLE | COMMON_STYLE_CLASS | TEXT_STYLE_CLASS;

export {
   Newable,
   Creator,
   LbCSSClass,
   RootElementConnector,
   Component,
   ColumnProperties,
   HeaderKey,
   SingleRowProperties
};
