import { User } from 'firebase/auth';
import { Box, CircularProgress, Typography } from '@mui/material';

import { useReservations } from '../hooks/useReservations';
import { useCardListBoxProps } from '../hooks/useCardListBoxProps';
import { ReservationWithId } from '../firebase';

import { ReservationCard } from './ReservationCard';

type ReservationListProps = {
	user: User;
};

export const ReservationList: React.FC<ReservationListProps> = ({ user }) => {
	const { pastReservations, todayReservations, futureReservations, loading } =
		useReservations(user);

	return pastReservations.length === 0 &&
		todayReservations.length === 0 &&
		futureReservations.length === 0 ? (
		loading ? (
			<CircularProgress />
		) : (
			<Typography variant="h4">You dont have any reservations...yet</Typography>
		)
	) : (
		<>
			<Reservations
				title={`Today's reservations`}
				reservations={todayReservations}
			/>
			<Reservations
				title="Future reservations"
				reservations={futureReservations}
			/>
			<Reservations title="Past reservations" reservations={pastReservations} />
		</>
	);
};

type ReservationsProps = {
	title: string;
	reservations: ReservationWithId[];
	cancellable?: boolean;
};

const Reservations: React.FC<ReservationsProps> = ({
	title,
	reservations,
	cancellable
}) => {
	const boxProps = useCardListBoxProps();

	return reservations.length === 0 ? null : (
		<>
			<Typography variant="h4">{title}</Typography>
			{reservations.length === 1 ? (
				<ReservationCard
					reservation={reservations[0]}
					cancellable={cancellable}
				/>
			) : (
				<Box sx={boxProps}>
					{reservations.map((reservation, index) => (
						<ReservationCard
							key={index}
							reservation={reservation}
							cancellable={cancellable}
						/>
					))}
				</Box>
			)}
		</>
	);
};
