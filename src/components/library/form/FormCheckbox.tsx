import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { Field } from 'react-final-form';

type FormCheckBoxProps = {
	name: string;
	label: string;
} & CheckboxProps;

const FormCheckbox: React.FC<FormCheckBoxProps> = ({
	name,
	label,
	...rest
}) => (
	<Field name={name} type="checkbox">
		{props => (
			<FormControlLabel
				label={label}
				control={<Checkbox {...props.input} {...rest} />}
			/>
		)}
	</Field>
);

export default FormCheckbox;
