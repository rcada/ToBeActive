import { User } from 'firebase/auth';

import { useReservations } from '../hooks/useReservations';

import { ReservationCard } from './ReservationCard';

type ReservationListProps = {
	user: User;
};

export const ReservationList: React.FC<ReservationListProps> = ({ user }) => {
	const reservations = useReservations(user);
	return (
		<>
			{reservations.map((reservation, index) => (
				<ReservationCard key={index} reservation={reservation} />
			))}
		</>
	);
};
