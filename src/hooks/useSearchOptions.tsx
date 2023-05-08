import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { sportscentersCollection } from '../firebase';

export const useSearchOptions = () => {
	const [cities, setCities] = useState<string[]>([]);
	const [sports, setSports] = useState<string[]>([]);

	useEffect(() => {
		const getSportsCentersQuery = query(
			sportscentersCollection,
			orderBy('city', 'asc')
		);

		const sportsCentersUnsubscribe = onSnapshot(
			getSportsCentersQuery,
			snapshot => {
				const distinctCities: string[] = [];
				const distinctSports: string[] = [];
				snapshot.forEach(doc => {
					const data = doc.data();
					if (!distinctCities.includes(data.city)) {
						distinctCities.push(data.city);
					}
					data.sports.map(sport => {
						if (!distinctSports.includes(sport.name)) {
							distinctSports.push(sport.name);
						}
					});
				});
				setCities(distinctCities);
				setSports(distinctSports.sort());
			}
		);

		return () => {
			sportsCentersUnsubscribe();
		};
	}, []);

	return { cities, sports };
};
