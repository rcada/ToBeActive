import { Typography } from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { ReservationList } from '../components/ReservationList';
import { useTranslation } from '../hooks/useTranslation';

const Reservations = () => {
	const t = useTranslation();
	const user = useLoggedInUser();

	return !user ? (
		<Typography>{t('log_first')}</Typography>
	) : (
		<ReservationList user={user} />
	);
};

export default Reservations;
