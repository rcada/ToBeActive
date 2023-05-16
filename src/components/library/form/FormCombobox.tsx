import React from 'react';
import { Field } from 'react-final-form';
import { FormControl, FormHelperText } from '@mui/material';

import Combobox, { ComboboxProps } from '../Combobox';

type FormComboboxProps = {
	name: string;
	required?: boolean;
} & ComboboxProps;

export const FormCombobox: React.FC<FormComboboxProps> = ({
	name,
	required,
	sx,
	...rest
}) => (
	<Field
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		validate={required ? value => (value ? false : true) : () => {}}
		name={name}
	>
		{props => (
			<FormControl sx={sx} error={props.meta.error}>
				<Combobox
					onChange={(_e, value) => props.input.onChange(value)}
					onBlur={props.input.onBlur}
					onFocus={props.input.onFocus}
					value={props.input.value === '' ? null : props.input.value}
					{...rest}
				/>
				{props.meta.error && <FormHelperText error>Required</FormHelperText>}
			</FormControl>
		)}
	</Field>
);
