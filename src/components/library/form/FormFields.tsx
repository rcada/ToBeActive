import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { Field } from 'react-final-form';

type FormTextFieldProps = {
	name: string;
} & TextFieldProps;

export const FormTextField: React.FC<FormTextFieldProps> = ({
	name,
	required,
	...rest
}) => (
	<Field
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		validate={required ? value => (value ? false : true) : () => {}}
		name={name}
	>
		{props => {
			console.log(props.meta.error);
			return (
				<TextField
					error={props.meta.error}
					helperText={props.meta.error ? 'Required' : undefined}
					{...props.input}
					{...rest}
				/>
			);
		}}
	</Field>
);
