import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogProps,
	DialogTitle,
	Typography
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from '@tanstack/router';
import { Timestamp, addDoc } from 'firebase/firestore';
import { useState } from 'react';

import { useTranslation } from '../hooks/useTranslation';
import {
	Reservation,
	SportsCenterWithId,
	reservationCollection
} from '../firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

import { SearchFilters } from './interface';
import Form from './library/form/Form';
import { FormCombobox } from './library/form/FormCombobox';
import { ComboboxOption } from './library/Combobox';
import { retypeSearchFiltersToReservationProps } from './utils/retypeSearchFilters';
import { FormDatePicker } from './library/form/FormDatePicker';
import { getTimeOptions } from './utils/getTimeOptions';
import StartEndTime from './StartEndTime';

export type ReservatioProps = Partial<{
	sport: ComboboxOption;
	date: Dayjs;
	startTime: number;
	endTime: number;
}>;

type ReservationDialogProps = {
	sportsCenter: SportsCenterWithId;
	searchFilters: SearchFilters;
	setOpen: (arg0: boolean) => void;
} & DialogProps;

const ReservationDialogForm: React.FC<ReservationDialogProps> = ({
	sportsCenter,
	searchFilters,
	setOpen,
	...rest
}) => {
	const t = useTranslation();
	const navigate = useNavigate();
	const user = useLoggedInUser();

	const [submitError, setSubmitError] = useState<string>();

	const timeOptions = getTimeOptions();

	const handleSubmit = async (values: ReservatioProps) => {
		if (user) {
			if (
				!user.email ||
				!values.date ||
				!values.sport ||
				!values.startTime ||
				!values.endTime
			) {
				setSubmitError('There was an error, some values are missing.');
				return;
			}
			try {
				const currentDate = new Date();
				const reservation: Reservation = {
					by: user.email,
					count: 1,
					date: values.date.format('DD/MM/YYYY'),
					startTime: values.startTime,
					endTime: values.endTime,
					sport: values.sport.value,
					sportsCenterId: sportsCenter.id,
					submissionDate: Timestamp.fromDate(currentDate)
				};
				await addDoc(reservationCollection, reservation);
				setOpen(false);
				navigate({ to: '/reservations' });
			} catch (err) {
				setSubmitError(
					err instanceof Error ? err.message : 'Unknown error occured'
				);
			}
		}
	};
	return (
		<Dialog {...rest}>
			<Form
				initialValues={retypeSearchFiltersToReservationProps(searchFilters)}
				onSubmit={handleSubmit}
			>
				<DialogTitle>{t('make_res')}</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '500px',
						gap: '10px'
					}}
				>
					<Box display="flex" justifyContent="space-between">
						<Typography>{`${t('facility')} ${sportsCenter.name}`}</Typography>
						<Typography>{`${t('city_')} ${sportsCenter.city}`}</Typography>
					</Box>
					<FormCombobox
						name="sport"
						label={t('sport')}
						options={sportsCenter.sports.map(sport => ({
							label: sport.name,
							value: sport.name
						}))}
						required
					/>
					<FormDatePicker
						name={t('date')}
						label="Date"
						minDate={dayjs(new Date())}
						required
					/>
					<Box display="flex" gap="10px">
						<StartEndTime options={timeOptions} sx={{ flex: 1 }} required />
					</Box>
					{submitError && (
						<Typography variant="caption" color="error">
							{submitError}
						</Typography>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						color="error"
						onClick={() => setOpen(false)}
					>
						{t('cancel')}
					</Button>
					<Button type="submit" variant="contained" color="primary">
						{t('reserve')}
					</Button>
				</DialogActions>
			</Form>
		</Dialog>
	);
};

export default ReservationDialogForm;
