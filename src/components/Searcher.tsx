import { useEffect, useState } from 'react';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { Box, Button, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import dayjs from 'dayjs';

import { sportscentersCollection } from '../firebase';
import { FormSelect } from '../components/library/form/FormSelect';

import Form from './library/form/Form';
import { getTimeOptions } from './utils/getTimeOptions';
import { FormCombobox } from './library/form/FormCombobox';
import { FormDatePicker } from './library/form/FormDatePicker';
import { ComboboxOption } from './library/Combobox';

type SearchProps = {
	city: ComboboxOption;
	sport: ComboboxOption;
	date: Date;
	startTime: number;
	endTime: number;
};

export const Searcher = () => {
	const [cities, setCities] = useState<string[]>([]);
	const [sports, setSports] = useState<string[]>([]);
	const [submitError, setSubmitError] = useState<string>();

	// const [test, setTest] = useState<ComboboxOption | null>(null);

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

	const handleSubmit = (values: Partial<SearchProps>) => {
		if (!values.city) {
			setSubmitError('Please enter a city to start searching');
		}

		console.log(values);
	};

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={{
				date: dayjs(Date.now())
			}}
		>
			<Box height="600px">
				<Box display="flex" gap="10px">
					<FormCombobox
						name="city"
						options={cities.map(city => ({ value: city, label: city }))}
						label="City"
						sx={{ width: '250px' }}
					/>
					<FormCombobox
						name="sport"
						options={sports.map(sport => ({ value: sport, label: sport }))} //TODO
						label="Sport"
						sx={{ width: '250px' }}
					/>
					<FormDatePicker name="date" sx={{ minWidth: '180px' }} label="Date" />
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
					<Button
						type="submit"
						variant="contained"
						size="large"
						endIcon={<SearchRoundedIcon />}
					>
						Search
					</Button>
				</Box>
				{submitError && (
					<Typography variant="caption" color="error">
						{submitError}
					</Typography>
				)}
			</Box>
		</Form>
	);
};
