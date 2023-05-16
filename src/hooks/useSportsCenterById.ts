import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { SportsCenter, sportscentersCollection } from '../firebase';

/**
 * Gets a sporstcenter based on provided id.
 * @param id id of a sportscenter
 * @returns sportscenter
 */
export const useSportsCenterById = (id: string) => {
	const [sportsCenter, setSportsCenter] = useState<SportsCenter>();

	useEffect(() => {
		const docRef = doc(sportscentersCollection, id);
		const sportsCenterUnsubscribe = onSnapshot(docRef, snapshot => {
			setSportsCenter(snapshot.exists() ? snapshot.data() : undefined);
		});

		return () => {
			sportsCenterUnsubscribe();
		};
	}, []);

	return sportsCenter;
};
