import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { Field } from 'react-final-form';

type FormDatePickerProps = {
	name: string;
	// required?: boolean;
} & DatePickerProps<unknown>;

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
	name,
	...rest
}) => (
	<Field name={name}>
		{props => <DatePicker {...props.input} {...rest} />}
	</Field>
);
