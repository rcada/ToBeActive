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
import { Dayjs } from 'dayjs';

import { useTranslation } from '../hooks/useTranslation';
import { SportsCenter } from '../firebase';

import { SearchFilters } from './interface';
import Form from './library/form/Form';
import { FormCombobox } from './library/form/FormCombobox';
import { ComboboxOption } from './library/Combobox';
import { retypeSearchFiltersToReservationProps } from './utils/retypeSearchFilters';
import { FormDatePicker } from './library/form/FormDatePicker';
import { FormSelect } from './library/form/FormSelect';
import { getTimeOptions } from './utils/getTimeOptions';

export type ReservatioProps = Partial<{
	sport: ComboboxOption;
	date: Dayjs;
	startTime: number;
	endTime: number;
}>;

type ReservationDialogProps = {
	sportsCenter: SportsCenter;
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

	const timeOptions = getTimeOptions();

	const handleSubmit = (values: ReservatioProps) => {
		console.log('heyy');
		console.log(values);
		setOpen(false);
	};
	return (
		<Dialog {...rest}>
			<Form
				initialValues={retypeSearchFiltersToReservationProps(searchFilters)}
				onSubmit={handleSubmit}
			>
				<DialogTitle>Make a reservation</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '500px',
						gap: '10px'
					}}
				>
					<Box display="flex">
						<Typography>{`In Facility: ${sportsCenter.name} in ${sportsCenter.city}`}</Typography>
					</Box>
					<FormCombobox
						name="sport"
						label="Sport"
						options={sportsCenter.sports.map(sport => ({
							label: sport.name,
							value: sport.name
						}))}
						required
					/>
					<FormDatePicker name="date" label="Date" />
					<Box display="flex" gap="10px">
						<FormSelect
							name="startTime"
							options={timeOptions}
							sx={{ flex: 1 }}
						/>
						<FormSelect name="endTime" options={timeOptions} sx={{ flex: 1 }} />
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						color="error"
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
					<Button type="submit" variant="contained" color="primary">
						Reserve
					</Button>
				</DialogActions>
			</Form>
		</Dialog>
	);
};

export default ReservationDialogForm;
