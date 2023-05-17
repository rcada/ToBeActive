import { ThemeProvider } from '@emotion/react';
import { AppBar, Box, Button, CssBaseline, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import {
	RouterProvider,
	RootRoute,
	Outlet,
	Router,
	Route
} from '@tanstack/router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Home from './pages/Home';
import Login from './pages/Login';
import { LanguageProvider, useTranslation } from './hooks/useTranslation';
import useLoggedInUser from './hooks/useLoggedInUser';
import ButtonLink from './components/library/ButtonLink';
import { signOut } from './firebase';
import 'dayjs/locale/de';
import SearchResult from './pages/SearchResult';
import { SearchFilters } from './components/interface';
import Reservations from './pages/Reservations';
import NotFound from './pages/NotFound';
import SettingsPopper from './components/SettingsPopper';
import { CustomThemeProvider, useTheme } from './hooks/useTheme';

const rootRoute = new RootRoute({
	component: () => {
		const user = useLoggedInUser();
		const t = useTranslation();
		const [theme] = useTheme();

		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Box sx={{ height: '100%' }}>
					<AppBar
						position="sticky"
						sx={{
							bgcolor: theme.palette.appBar
						}}
					>
						<Container>
							<Toolbar disableGutters sx={{ gap: 3 }}>
								<ButtonLink to="/">{t('home')}</ButtonLink>
								{user && (
									<ButtonLink to="/reservations">
										{t('reservations')}
									</ButtonLink>
								)}
								<Box sx={{ flexGrow: 1 }} />

								{!user ? (
									<ButtonLink to="/login">{t('login')}</ButtonLink>
								) : (
									<Button onClick={signOut}>{t('logout')}</Button>
								)}
								<SettingsPopper />
							</Toolbar>
						</Container>
					</AppBar>

					<Container
						component="main"
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							flexGrow: 1,
							gap: 2,
							paddingY: '20px'
						}}
					>
						<Outlet />
					</Container>
				</Box>
			</ThemeProvider>
		);
	}
});

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Home
});

const loginRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: Login
});

export const searchRoute = new Route({
	getParentRoute: () => rootRoute,
	path: 'search',
	validateSearch: (search: Record<string, unknown>): SearchFilters => ({
		city: search.city as string,
		sport: search.sport as string,
		date: search.date as string,
		startTime: search.startTime as number,
		endTime: search.endTime as number,
		multisport: search.multisport as boolean,
		isic: search.isic as boolean,
		freeParking: search.freeParking as boolean,
		beverage: search.beverage as boolean
	}),
	component: SearchResult
});

const reservationsRoute = new Route({
	getParentRoute: () => rootRoute,
	path: 'reservations',
	component: Reservations
});

const notFoundRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	component: NotFound
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	loginRoute,
	searchRoute,
	reservationsRoute,
	notFoundRoute
]);

const router = new Router({ routeTree });
declare module '@tanstack/router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const App = () => (
	<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
		<LanguageProvider>
			<CustomThemeProvider>
				<RouterProvider router={router} />
			</CustomThemeProvider>
		</LanguageProvider>
	</LocalizationProvider>
);

export default App;
