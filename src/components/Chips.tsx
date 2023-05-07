import { useForm, useFormState } from 'react-final-form';
import { Chip } from '@mui/material';

import { SearchProps } from './Searcher';

const Chips = () => {
	const { values } = useFormState<SearchProps>();
	const { change } = useForm<SearchProps>();

	return (
		<>
			{values.multisport && (
				<Chip
					label="Multisport"
					onDelete={() => change('multisport', undefined)}
				/>
			)}
			{values.isic && (
				<Chip label="ISIC" onDelete={() => change('isic', undefined)} />
			)}
			{values.freeParking && (
				<Chip
					label="Free parking"
					onDelete={() => change('freeParking', undefined)}
				/>
			)}
			{values.beverage && (
				<Chip label="Beverage" onDelete={() => change('beverage', undefined)} />
			)}
		</>
	);
};

export default Chips;
