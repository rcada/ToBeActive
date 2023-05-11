import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

import { SearchFilters } from '../components/interface';
import { SportsCenterWithId, sportscentersCollection } from '../firebase';
import { filterSportsCenters } from '../components/utils/filterSportsCenters';

export const useSportsCenters = (filters: SearchFilters) => {
	const [sportsCenters, setSportCenters] = useState<SportsCenterWithId[]>([]);
	const [filteredSportsCenters, setFilteredSportsCenters] = useState<
		SportsCenterWithId[]
	>([]);

	useEffect(() => {
		const sportsCentersUnsubscribe = onSnapshot(
			sportscentersCollection,
			snapshot => {
				setSportCenters(
					snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
				);
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

	return filteredSportsCenters;
};
