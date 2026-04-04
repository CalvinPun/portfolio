/**
 * Typography scale for the manila-folder “about” layout. Matches the math in
 * `AboutNotebookOverlay` (ruled lines on `notebook-paper.svg` at 1920×2211).
 *
 * Use with a parent that sets `[container-type:inline-size]` so `cqw` resolves
 * against the same kind of width as the notebook column (~40% of the folder).
 */

export const ABOUT_NOTEBOOK_ARTBOARD_W = 1920;

/** Ruled-line spacing as % of container inline size (114px at 1920px artboard). */
export const ABOUT_NOTEBOOK_RULE_CQW = (114 / ABOUT_NOTEBOOK_ARTBOARD_W) * 100;

/** Body paragraphs on the lined note page. */
export const ABOUT_NOTEBOOK_BODY_FONT_CQW = ABOUT_NOTEBOOK_RULE_CQW * 0.76;

/** “about… me!” title on the note page. */
export const ABOUT_NOTEBOOK_TITLE_FONT_CQW = ABOUT_NOTEBOOK_RULE_CQW * 1.18;

/** One ruled line of vertical rhythm. */
export const ABOUT_NOTEBOOK_LINE_CQW = ABOUT_NOTEBOOK_RULE_CQW;

/** Green sticky / cream scrap: a touch under the notebook body. */
export const ABOUT_STICKY_LABEL_FONT_CQW = ABOUT_NOTEBOOK_BODY_FONT_CQW * 0.92;

/** Track title (hand + semibold). */
export const ABOUT_STICKY_PRIMARY_FONT_CQW = ABOUT_NOTEBOOK_BODY_FONT_CQW * 0.96;

/** Artist / secondary line. */
export const ABOUT_STICKY_SECONDARY_FONT_CQW = ABOUT_NOTEBOOK_BODY_FONT_CQW * 0.9;

/** Progress timestamps. */
export const ABOUT_STICKY_CAPTION_FONT_CQW = ABOUT_NOTEBOOK_BODY_FONT_CQW * 0.78;

/** Album-art square. */
export const ABOUT_STICKY_ART_CQW = ABOUT_NOTEBOOK_RULE_CQW * 1.85;
