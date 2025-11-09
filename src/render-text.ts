import { FontAttributes } from "./font-attributes";
import { measureText } from "./measure-text";
import { preprocessText } from "./preprocess-text";

export function renderText(ctx: CanvasRenderingContext2D, attribs: FontAttributes, text: string, left: number, top: number, outline: boolean) {
	const { font, size } = attribs;
	text = preprocessText(text);

	var baselineTop = top;
	var alignLeft = left;

	// https://www.w3.org/TR/2001/REC-xsl-20011015/slice7.html (7.13)
	if (
		ctx.textBaseline !== "alphabetic" ||
		(ctx.textAlign !== "start" && ctx.textAlign !== "left")
	) {
		var m = measureText(attribs, text);
		if (ctx.textBaseline === "top") {
			baselineTop += m.actualBoundingBoxAscent - m.fontBoundingBoxDescent;
		} else if (ctx.textBaseline === "hanging") {
			baselineTop += m.actualBoundingBoxAscent;
		} else if (ctx.textBaseline === "middle") {
			baselineTop += m.actualBoundingBoxAscent / 2;
		} else if (
			ctx.textBaseline === "ideographic" ||
			ctx.textBaseline === "bottom"
		) {
			baselineTop += m.fontBoundingBoxDescent;
		}

		if (ctx.textAlign === "right" || ctx.textAlign === "end") {
			alignLeft -= m.width;
		} else if (ctx.textAlign === "center") {
			alignLeft -= m.width / 2;
		}
	}

	const path = font.getPath(text, alignLeft, baselineTop, size);
	if (outline) {
		path.fill = null;
		path.stroke = typeof ctx.strokeStyle === "string" ? ctx.strokeStyle : "#000000";
	} else {
		path.fill = typeof ctx.fillStyle === "string" ? ctx.fillStyle : "#000000";
	}

	path.draw(ctx);
}
