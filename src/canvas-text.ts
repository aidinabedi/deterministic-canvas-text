import { getFontAttributes } from "./font-attributes";
import { measureText } from "./measure-text";
import { renderText } from "./render-text";

const oldFillText = CanvasRenderingContext2D.prototype.fillText;
const oldStrokeText = CanvasRenderingContext2D.prototype.strokeText;
const oldMeasureText = CanvasRenderingContext2D.prototype.measureText;

function newFillText(this: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth?: number): void {
	const attribs = getFontAttributes(this);
	if (attribs) {
		return renderText(this, attribs, text, x, y, false);
	}
	return oldFillText.call(this, text, x, y, maxWidth);
}

function newStrokeText(this: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth?: number): void {
	const attribs = getFontAttributes(this);
	if (attribs) {
		return renderText(this, attribs, text, x, y, false);
	}
	return oldStrokeText.call(this, text, x, y, maxWidth);
}

function newMeasureText(this: CanvasRenderingContext2D, text: string): TextMetrics {
	const attribs = getFontAttributes(this);
	if (attribs) {
		return measureText(attribs, text);
	}
	return oldMeasureText.call(this, text);
}

export function overrideCanvasTextMethods(): void {
	CanvasRenderingContext2D.prototype.fillText = newFillText;
	CanvasRenderingContext2D.prototype.strokeText = newStrokeText;
	CanvasRenderingContext2D.prototype.measureText = newMeasureText;
}

export function resetCanvasTextMethods(): void {
	CanvasRenderingContext2D.prototype.fillText = oldFillText;
	CanvasRenderingContext2D.prototype.strokeText = oldStrokeText;
	CanvasRenderingContext2D.prototype.measureText = oldMeasureText;
}
