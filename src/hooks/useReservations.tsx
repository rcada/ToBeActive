import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';

import { ReservationWithId, reservationCollection } from '../firebase';

export const useReservations = (user: User) => {
	const [reservations, setReservations] = useState<ReservationWithId[]>([]);

	useEffect(() => {
		const reservationsQuery = query(
			reservationCollection,
			where('by', '==', user.email),
			orderBy('date', 'desc')
		);
		const reservationsUnsubscribe = onSnapshot(reservationsQuery, snapshot => {
			setReservations(
				snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
			);
		});

		return () => {
			reservationsUnsubscribe();
		};
	}, []);

	return reservations;
};
