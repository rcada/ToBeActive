import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from '@tanstack/router';
import dayjs, { Dayjs } from 'dayjs';

import { useSearchOptions } from '../hooks/useSearchOptions';
import { useTranslation } from '../hooks/useTranslation';

import Form from './library/form/Form';
import { getTimeOptions } from './utils/getTimeOptions';
import { FormCombobox } from './library/form/FormCombobox';
import { FormDatePicker } from './library/form/FormDatePicker';
import { ComboboxOption } from './library/Combobox';
import CheckListPopper from './ChecklistPopper';
import Chips from './Chips';
import StartEndTime from './StartEndTime';

export type SearchProps = Partial<{
	city: ComboboxOption;
	sport: ComboboxOption;
	date: Dayjs;
	startTime: number;
	endTime: number;
	multisport: boolean;
	isic: boolean;
	freeParking: boolean;
	beverage: boolean;
}>;

type SearcherProps = {
	initialValues: SearchProps;
};

export const Searcher: React.FC<SearcherProps> = ({ initialValues }) => {
	const t = useTranslation();

	const [submitError, setSubmitError] = useState<string>();

	const navigate = useNavigate();

	const handleSubmit = (values: SearchProps) => {
		if (!values.city) {
			setSubmitError(t('enter_city'));
			return;
		}
		setSubmitError(undefined);

		navigate({
			to: '/search',
			search: {
				city: values.city.value,
				sport: values.sport ? values.sport.value : undefined,
				date: values.date?.format('DD/MM/YYYY'),
				startTime: values.startTime,
				endTime: values.endTime,
				multisport: values.multisport ? true : undefined,
				isic: values.isic ? true : undefined,
				freeParking: values.freeParking ? true : undefined,
				beverage: values.beverage ? true : undefined
			}
		});
	};

	return (
		<Form onSubmit={handleSubmit} initialValues={initialValues}>
			<Box>
				<FormBody />
				{submitError && (
					<Typography variant="caption" color="error">
						{submitError}
					</Typography>
				)}
			</Box>
		</Form>
	);
};

const FormBody = () => {
	const t = useTranslation();

	const { cities, sports } = useSearchOptions();
	const timeOptions = getTimeOptions();

	return (
		<Box display="flex" flexDirection="column" justifyContent="center">
			<Box display="flex" gap="10px" flexWrap="wrap" justifyContent="center">
				<Box display="flex" gap="10px" maxWidth="500px">
					<FormCombobox
						name="city"
						options={cities.map(city => ({ value: city, label: city }))}
						label={t('city')}
						sx={{ width: '250px' }}
					/>
					<FormCombobox
						name="sport"
						options={sports.map(sport => ({ value: sport, label: t(sport) }))}
						label={t('sport')}
						sx={{ width: '250px' }}
					/>
				</Box>
				<Box display="flex" gap="10px" maxWidth="600px">
					<FormDatePicker
						name="date"
						sx={{ minWidth: '180px' }}
						minDate={dayjs(new Date())}
						label={t('date')}
					/>
					<StartEndTime options={timeOptions} sx={{ width: 100 }} withNone />
					<CheckListPopper />
					<Button
						type="submit"
						variant="contained"
						size="large"
						endIcon={<SearchRoundedIcon />}
					>
						{t('search')}
					</Button>
				</Box>
			</Box>
			<Box display="flex" gap="10px" paddingY="10px" justifyContent="center">
				<Chips />
			</Box>
		</Box>
	);
};
