import {
	Button,
	Dialog,
	DialogActions,
	DialogProps,
	DialogTitle,
	Typography
} from '@mui/material';
import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';

import { ReservationWithId, reservationCollection } from '../firebase';
import { useTranslation } from '../hooks/useTranslation';

type DeleteReservationDialogProps = {
	reservation: ReservationWithId;
	setOpen: (arg0: boolean) => void;
} & DialogProps;

export const DeleteReservationDialog: React.FC<
	DeleteReservationDialogProps
> = ({ reservation, setOpen, ...rest }) => {
	const t = useTranslation();

	const [error, setError] = useState<string>();

	const deleteReservation = async () => {
		try {
			const docRef = doc(reservationCollection, reservation.id);
			await deleteDoc(docRef);
			setOpen(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Unknown error occured');
		}
	};

	return (
		<Dialog {...rest}>
			<DialogTitle>{t('you_sure')}</DialogTitle>
			{error && (
				<Typography variant="caption" color="error">
					{error}
				</Typography>
			)}
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button variant="outlined" onClick={() => setOpen(false)}>
					{t('no')}
				</Button>
				<Button variant="contained" onClick={deleteReservation}>
					{t('yes')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
