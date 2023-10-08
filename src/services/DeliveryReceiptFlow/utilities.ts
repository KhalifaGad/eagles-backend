export const getShipmentInvalidStateErrorMessage = (ref: string) => {
	const part1 = "حالة الشحنه";
	const part2 = "غير مناسبه للايصال";
	return `${part2} (${ref}) ${part1}`;
};
