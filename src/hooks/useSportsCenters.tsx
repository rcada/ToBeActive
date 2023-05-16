import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

import { SearchFilters } from '../components/interface';
import { SportsCenterWithId, sportscentersCollection } from '../firebase';
import { filterSportsCenters } from '../components/utils/filterSportsCenters';

/**
 * Gets filtered sportscenters based on provided filters
 * @param filters
 * @returns filtered sportscenters
 */
export const useSportsCenters = (filters: SearchFilters) => {
	const [sportsCenters, setSportCenters] = useState<SportsCenterWithId[]>([]);
	const [filteredSportsCenters, setFilteredSportsCenters] = useState<
		SportsCenterWithId[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
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
			setLoading(true);
			setFilteredSportsCenters([]);
			setFilteredSportsCenters(filterSportsCenters(sportsCenters, filters));
			setLoading(false);
		}
	}, [filters, sportsCenters]);

	return { filteredSportsCenters, loading };
};
