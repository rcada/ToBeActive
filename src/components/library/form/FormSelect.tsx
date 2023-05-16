import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	SelectProps
} from '@mui/material';
import { Field } from 'react-final-form';

import { useTranslation } from '../../../hooks/useTranslation';

type FormSelectProps = {
	name: string;
	options:
		| { value: string; label: string }[]
		| { value: number; label: string }[];
	withNone?: boolean;
} & SelectProps;

/**
 * Select component for form
 */
export const FormSelect: React.FC<FormSelectProps> = ({
	name,
	options,
	label,
	withNone = false,
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
					{label && <InputLabel id={name}>{label}</InputLabel>}
					<Select
						labelId={name}
						label={label}
						error={props.meta.error}
						MenuProps={{ PaperProps: { style: { maxHeight: 250 } } }}
						{...props.input}
						{...rest}
					>
						{withNone && (
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
						)}
						{options.map((option, i) => (
							<MenuItem key={i} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
					{props.meta.error && (
						<FormHelperText error>{t('required')}</FormHelperText>
					)}
				</FormControl>
			)}
		</Field>
	);
};
