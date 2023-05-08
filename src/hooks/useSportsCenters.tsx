import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

import { SearchFilters } from '../components/interface';
import { SportsCenter, sportscentersCollection } from '../firebase';
import { filterSportsCenters } from '../components/utils/filterSportsCenters';

export const useSportsCenters = (filters: SearchFilters) => {
	const [sportsCenters, setSportCenters] = useState<SportsCenter[]>([]);
	const [filteredSportsCenters, setFilteredSportsCenters] = useState<
		SportsCenter[]
	>([]);

	useEffect(() => {
		const sportsCentersUnsubscribe = onSnapshot(
			sportscentersCollection,
			snapshot => {
				setSportCenters(snapshot.docs.map(doc => doc.data()));
			}
		);

		return () => {
			sportsCentersUnsubscribe();
		};
	}, []);

	useEffect(() => {
		if (sportsCenters.length > 0) {
			setFilteredSportsCenters(filterSportsCenters(sportsCenters, filters));
		}
	}, [filters, sportsCenters]);

	return { filteredSportsCenters };
};
