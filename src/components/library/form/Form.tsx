import React from 'react';
import { Form as FForm, FormProps as FFormProps } from 'react-final-form';

export type FormProps = {
	children: React.ReactNode;
} & FFormProps;

/**
 * Form component from react-final-form
 */
const Form: React.FC<FormProps> = ({ children, ...rest }) => (
	<FForm {...rest}>
		{({ handleSubmit }) => <form onSubmit={handleSubmit}>{children}</form>}
	</FForm>
);

export default Form;
