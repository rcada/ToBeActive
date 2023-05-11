/**
 * Converts time from type number to type string
 * @param timeInHHMM time in type number
 * @returns time in type string
 */
export const getTimeFormat = (timeInHHMM: number) => {
	const hour =
		timeInHHMM < 1000
			? String(timeInHHMM).substring(0, 1)
			: String(timeInHHMM).substring(0, 2);
	const minute =
		timeInHHMM < 1000
			? String(timeInHHMM).substring(1)
			: String(timeInHHMM).substring(2);
	return `${hour}:${minute}`;
};
