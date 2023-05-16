import { useForm, useFormState } from 'react-final-form';
import { Chip } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';

import { SearchProps } from './Searcher';

const Chips = () => {
	const t = useTranslation();

	const { values } = useFormState<SearchProps>();
	const { change } = useForm<SearchProps>();

	return (
		<>
			{values.multisport && (
				<Chip
					label={t('multisport')}
					onDelete={() => change('multisport', undefined)}
				/>
			)}
			{values.isic && (
				<Chip label={t('isic')} onDelete={() => change('isic', undefined)} />
			)}
			{values.freeParking && (
				<Chip
					label={t('free_parking')}
					onDelete={() => change('freeParking', undefined)}
				/>
			)}
			{values.beverage && (
				<Chip
					label={t('beverage')}
					onDelete={() => change('beverage', undefined)}
				/>
			)}
		</>
	);
};

export default Chips;
