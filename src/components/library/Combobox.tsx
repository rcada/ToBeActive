import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

export type ComboboxOption = {
	value: string;
	label: string;
};

export type ComboboxProps = {
	label: string;
} & Omit<AutocompleteProps<ComboboxOption, false, false, false>, 'renderInput'>;

const Combobox: React.FC<ComboboxProps> = ({ label, value, ...rest }) => (
	<Autocomplete
		getOptionLabel={option => option.label}
		value={value}
		isOptionEqualToValue={(option, value) => option.value === value.value}
		renderInput={params => <TextField {...params} label={label} />}
		{...rest}
	/>
);
export default Combobox;
