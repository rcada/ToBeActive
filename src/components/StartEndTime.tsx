import { SxProps } from '@mui/material';
import { useForm, useFormState } from 'react-final-form';
import { useEffect } from 'react';

import { useTranslation } from '../hooks/useTranslation';

import { FormSelect } from './library/form/FormSelect';

type StartEndTimeProps = {
	sx?: SxProps;
	options:
		| { value: string; label: string }[]
		| { value: number; label: string }[];
	withNone?: boolean;
	required?: boolean;
};

type FormProps = {
	startTime: number;
	endTime: number;
};

const StartEndTime: React.FC<StartEndTimeProps> = ({
	sx,
	options,
	withNone,
	required
}) => {
	const t = useTranslation();
	const { values } = useFormState<FormProps>();
	const { change } = useForm<FormProps>();

	useEffect(() => {
		if (values.endTime && values.startTime) {
			if (values.endTime < values.startTime) {
				change('startTime', values.endTime);
			}
		}
	}, [values.startTime, values.endTime]);

	return (
		<>
			<FormSelect
				name="startTime"
				label={t('start')}
				withNone={withNone}
				sx={sx}
				options={options}
				required={required}
			/>
			<FormSelect
				name="endTime"
				withNone={withNone}
				label={t('end')}
				sx={sx}
				options={options}
				required={required}
			/>
		</>
	);
};

export default StartEndTime;
