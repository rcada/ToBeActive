import React from 'react';
import { Field } from 'react-final-form';

import Combobox, { ComboboxProps } from '../Combobox';

type FormComboboxProps = {
	name: string;
	required?: boolean;
} & ComboboxProps;

export const FormCombobox: React.FC<FormComboboxProps> = ({
	name,
	required,
	...rest
}) => (
	<Field
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		validate={required ? value => (value ? false : true) : () => {}}
		name={name}
	>
		{props => (
			<Combobox
				onChange={(_e, value) => props.input.onChange(value)}
				onBlur={props.input.onBlur}
				onFocus={props.input.onFocus}
				value={props.input.value === '' ? null : props.input.value}
				{...rest}
			/>
		)}
	</Field>
);
