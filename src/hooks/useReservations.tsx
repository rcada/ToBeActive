import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import dayjs from 'dayjs';

import { ReservationWithId, reservationCollection } from '../firebase';

export const useReservations = (user: User) => {
	const [pastReservations, setPastReservations] = useState<ReservationWithId[]>(
		[]
	);
	const [todayReservations, setTodayReservations] = useState<
		ReservationWithId[]
	>([]);
	const [futureReservations, setFutureReservations] = useState<
		ReservationWithId[]
	>([]);

	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const reservationsQuery = query(
			reservationCollection,
			where('by', '==', user.email),
			orderBy('date', 'desc')
		);
		const reservationsUnsubscribe = onSnapshot(reservationsQuery, snapshot => {
			const pastRs: ReservationWithId[] = [];
			const todayRs: ReservationWithId[] = [];
			const futureRs: ReservationWithId[] = [];
			const today = dayjs(new Date());

			snapshot.docs.map(doc => {
				const date = dayjs(doc.data().date);
				if (date.isBefore(today)) {
					pastRs.push({ ...doc.data(), id: doc.id });
					return;
				}
				if (date.isAfter(today)) {
					futureRs.push({ ...doc.data(), id: doc.id });
					return;
				}
				todayRs.push({ ...doc.data(), id: doc.id });
			});
			setPastReservations(pastRs);
			setTodayReservations(todayRs);
			setFutureReservations(futureRs);
			setLoading(false);
		});

		return () => {
			reservationsUnsubscribe();
		};
	}, []);

	return { pastReservations, todayReservations, futureReservations, loading };
};
