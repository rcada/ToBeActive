import { Typography } from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { ReservationList } from '../components/ReservationList';

const Reservations = () => {
	const user = useLoggedInUser();

	return (
		<>
			<Typography variant="h4">Your upcoming reservations: </Typography>
			{!user ? (
				<Typography>To see your reservations, please log in first</Typography>
			) : (
				<ReservationList user={user} />
			)}
		</>
	);
};

export default Reservations;