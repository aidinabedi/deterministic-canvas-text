export function preprocessText(text: string): string {
	return text.trim(); // Trim leading and trailing spaces since opentype.js does not handle them well
}
