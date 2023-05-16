import { Box, Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useTheme } from '../hooks/useTheme';
import { darkTheme, lightTheme } from '../theme';

const ThemeSwitch = () => {
	const [theme, setTheme] = useTheme();
	return (
		<Box display="flex" alignItems="center">
			<DarkModeIcon />
			<Switch
				checked={theme.palette.mode === 'light'}
				onChange={() =>
					setTheme(theme.palette.mode === 'dark' ? lightTheme : darkTheme)
				}
			/>
			<LightModeIcon />
		</Box>
	);
};

export default ThemeSwitch;
