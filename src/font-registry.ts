import { Font, parse, load } from "opentype.js";

const fontsByFamily = new Map<string, Font>();

export async function loadFontAsync(family: string, url: string): Promise<void> {
	const font = await load(url);
	addFont(family, font);
}

export function loadFontSync(family: string, buffer: ArrayBuffer): void {
	const font = parse(buffer);
	addFont(family, font);
}

export function addFont(family: string, font: Font): void {
	family = family.toLowerCase(); // font family names are case-insensitive
	fontsByFamily.set(family, font);
}

export function getFont(family: string): Font | undefined {
	family = family.toLowerCase(); // font family names are case-insensitive
	return fontsByFamily.get(family);
}
