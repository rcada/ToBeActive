import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Palette {
		appBar?: string;
	}
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface PaletteOptions {
		appBar?: string;
	}
}

export const darkTheme = createTheme({
	palette: {
		primary: { main: '#E45321' },
		mode: 'dark',
		appBar: '#272727'
	}
});

export const lightTheme = createTheme({
	palette: {
		primary: { main: '#E45321' },
		mode: 'light',
		appBar: '#272727'
	}
});
