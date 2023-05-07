import { useEffect, useState } from 'react';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { Box, Button, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from '@tanstack/router';
import { Dayjs } from 'dayjs';

import { sportscentersCollection } from '../firebase';
import { FormSelect } from '../components/library/form/FormSelect';

import Form from './library/form/Form';
import { getTimeOptions } from './utils/getTimeOptions';
import { FormCombobox } from './library/form/FormCombobox';
import { FormDatePicker } from './library/form/FormDatePicker';
import { ComboboxOption } from './library/Combobox';
import CheckListPopper from './ChecklistPopper';
import Chips from './Chips';

export type SearchProps = {
	city: ComboboxOption;
	sport?: ComboboxOption;
	date?: Dayjs;
	startTime?: number;
	endTime?: number;
	multisport?: boolean;
	isic?: boolean;
	freeParking?: boolean;
	beverage?: boolean;
};

type SearcherProps = {
	initialValues: Partial<SearchProps>;
};

export const Searcher: React.FC<SearcherProps> = ({ initialValues }) => {
	const [submitError, setSubmitError] = useState<string>();

	const navigate = useNavigate();

	const handleSubmit = (values: Partial<SearchProps>) => {
		if (!values.city) {
			setSubmitError('Please enter a city to start searching');
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
			<Box height="600px">
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
	const [cities, setCities] = useState<string[]>([]);
	const [sports, setSports] = useState<string[]>([]);

	const timeOptions = getTimeOptions();

	useEffect(() => {
		const getSportsCentersQuery = query(
			sportscentersCollection,
			orderBy('city', 'asc')
		);

		const sportsCentersUnsubscribe = onSnapshot(
			getSportsCentersQuery,
			snapshot => {
				const distinctCities: string[] = [];
				const distinctSports: string[] = [];
				snapshot.forEach(doc => {
					const data = doc.data();
					if (!distinctCities.includes(data.city)) {
						distinctCities.push(data.city);
					}
					data.sports.map(sport => {
						if (!distinctSports.includes(sport.name)) {
							distinctSports.push(sport.name);
						}
					});
				});
				setCities(distinctCities);
				setSports(distinctSports.sort());
			}
		);

		return () => {
			sportsCentersUnsubscribe();
		};
	}, []);

	return (
		<Box>
			<Box display="flex" gap="10px">
				<FormCombobox
					name="city"
					options={cities.map(city => ({ value: city, label: city }))} //TODO
					label="City"
					sx={{ width: '250px' }}
				/>
				<FormCombobox
					name="sport"
					options={sports.map(sport => ({ value: sport, label: sport }))} //TODO
					label="Sport"
					sx={{ width: '250px' }}
				/>
				<FormDatePicker
					format="DD/MM/YYYY"
					name="date"
					sx={{ minWidth: '180px' }}
					label="Date"
				/>
				<FormSelect
					name="startTime"
					label="Start"
					withNone
					sx={{ width: 100 }}
					options={timeOptions}
				/>
				<FormSelect
					name="endTime"
					withNone
					label="End"
					sx={{ width: 100 }}
					options={timeOptions}
				/>
				<CheckListPopper />
				<Button
					type="submit"
					variant="contained"
					size="large"
					endIcon={<SearchRoundedIcon />}
				>
					Search
				</Button>
			</Box>
			<Box display="flex" gap="10px" paddingY="10px">
				<Chips />
			</Box>
		</Box>
	);
};
