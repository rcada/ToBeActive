import { Theme } from '@mui/material';
import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState
} from 'react';

import { darkTheme } from '../theme';

type ThemeState = [Theme, Dispatch<SetStateAction<Theme>>];

const ThemeContext = createContext<ThemeState>(undefined as never);

export const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	const themeState = useState<Theme>(darkTheme);
	return (
		<ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
