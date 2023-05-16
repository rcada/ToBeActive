import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { Field } from 'react-final-form';

import { useTranslation } from '../../../hooks/useTranslation';

type FormTextFieldProps = {
	name: string;
} & TextFieldProps;

/**
 *
 * TextField component for form
 */
export const FormTextField: React.FC<FormTextFieldProps> = ({
	name,
	required,
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
				<TextField
					error={props.meta.error}
					helperText={props.meta.error ? t('required') : undefined}
					{...props.input}
					{...rest}
				/>
			)}
		</Field>
	);
};
