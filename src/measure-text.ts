import { FontAttributes } from "./font-attributes";
import { preprocessText } from "./preprocess-text";

export function measureText(attribs: FontAttributes, text: string) {
	const { font, size } = attribs;
	text = preprocessText(text);

	var ascent = 0;
	var descent = 0;
	var width = 0;
	const glyphs = font.stringToGlyphs(text);

	for (var i = 0; i < glyphs.length; i++) {
		const glyph = glyphs[i];

		// TODO: use glyph.getMetrics() ?

		if (glyph.advanceWidth) {
			width += glyph.advanceWidth;
		}

		if (i < glyphs.length - 1) {
			width += font.getKerningValue(glyph, glyphs[i + 1]);
		}

		if (glyph.yMax) {
			ascent = Math.max(ascent, glyph.yMax);
		}

		if (glyph.yMin) {
			descent = Math.min(descent, glyph.yMin);
		}
	}

	const scale = (1 / font.unitsPerEm) * size;
	return {
		actualBoundingBoxAscent: ascent * scale,
		actualBoundingBoxDescent: descent * scale,
		actualBoundingBoxLeft: 0, // TODO: add support?
		actualBoundingBoxRight: 0, // TODO: add support?
		alphabeticBaseline: 0, // TODO: add support?
		emHeightAscent: 0, // TODO: add support?
		emHeightDescent: 0, // TODO: add support?
		fontBoundingBoxAscent: font.ascender * scale,
		fontBoundingBoxDescent: font.descender * scale,
		hangingBaseline: 0, // TODO: add support?
		ideographicBaseline: 0, // TODO: add support?
		width: width * scale,
	} satisfies TextMetrics;
}
