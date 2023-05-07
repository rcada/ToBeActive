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
		const hour =
			timeInHHMM < 1000
				? String(timeInHHMM).substring(0, 1)
				: String(timeInHHMM).substring(0, 2);
		const minute =
			timeInHHMM < 1000
				? String(timeInHHMM).substring(1)
				: String(timeInHHMM).substring(2);
		const time = `${hour}:${minute}`;
		return { value: timeInHHMM, label: time };
	});
	return timeOptions;
};
