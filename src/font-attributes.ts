import type { Font } from "opentype.js";
import parseCSSFont from "parse-css-font";
import toPX from "to-px";
import { getFont } from "./font-registry";

export interface FontAttributes {
  font: Font;
  size: number; // in pixels
  // TODO: add weight, style, etc
}

const defaultFontSize = 10; // in pixels

export function getFontAttributes(ctx: CanvasRenderingContext2D): FontAttributes | undefined {
	const cssFont = parseCSSFont(ctx.font);

	if ("family" in cssFont && cssFont.family) {
		const family = cssFont.family[0]; // TODO: support multiple families

		const font = getFont(family);
		if (font) {
			const cssSize = cssFont.size || `${defaultFontSize}px`;
			const size = toPX(cssSize, ctx.canvas) ?? defaultFontSize;
			return { font, size };
		}
	}

	return undefined;
}
