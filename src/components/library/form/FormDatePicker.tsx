import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { Field } from 'react-final-form';
import { FormControl, FormHelperText } from '@mui/material';

import { useTranslation } from '../../../hooks/useTranslation';

type FormDatePickerProps = {
	name: string;
	required?: boolean;
} & DatePickerProps<unknown>;

/**
 * DatePicker component for form
 */
export const FormDatePicker: React.FC<FormDatePickerProps> = ({
	name,
	required,
	sx,
	...rest
}) => {
	const t = useTranslation();

	return (
		<Field
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			validate={required ? value => (value ? false : true) : () => {}}
			name={name}
		>
			{props => (
				<FormControl sx={sx} error={props.meta.error}>
					<DatePicker {...props.input} {...rest} />
					{props.meta.error && (
						<FormHelperText error>{t('required')}</FormHelperText>
					)}
				</FormControl>
			)}
		</Field>
	);
};
