import { ChangeEvent, useState } from 'react';

export const useField = (id: string, opts?: { required?: boolean }) => {
	const [value, setValue] = useState('');
	const [touched, setTouched] = useState(false);
	const error = touched && !value;

	return {
		value,
		props: {
			id,
			value,
			onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
				setValue(e.target.value),
			onBlur: () => setTouched(true),
			required: opts?.required,
			error,
			helperText: error ? 'Required' : undefined
		}
	};
};
