import { getTimeFormat } from './getTimeFormat';

/**
 * Creates all possible time options to select component
 * @returns all possible time options
 */
export const getTimeOptions = () => {
	const startTime = 400;
	const endTime = 2200;

	const timesInHHMM: number[] = [];

	let i = startTime;
	while (i <= endTime) {
		timesInHHMM.push(i);
		timesInHHMM.push(i + 30);
		i = i + 100;
	}

	const timeOptions = timesInHHMM.map(timeInHHMM => {
		const time = getTimeFormat(timeInHHMM);
		return { value: timeInHHMM, label: time };
	});
	return timeOptions;
};
