enum HEADER_STYLE_CLASS {
   HEADER_PRIMARY = "lb_header_text_primary",
   SUB_HEADER = "lb_header_text_secondary"
}

enum TEXT_STYLE_CLASS {
   TEXT_PRIMARY = "lb_text_primary",
   TEXT_SECONDARY = "lb_text_secondary"
}

export const TYPOGRAPHY_STYLE_CLASS = { ...HEADER_STYLE_CLASS, ...TEXT_STYLE_CLASS };
export type TYPOGRAPHY_STYLE_CLASS = HEADER_STYLE_CLASS | TEXT_STYLE_CLASS;
