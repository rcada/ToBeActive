import './App.css';
import { ThemeProvider } from '@emotion/react';
import { AppBar, Button, CssBaseline, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import {
	RouterProvider,
	RootRoute,
	Outlet,
	Router,
	Route,
	Link
} from '@tanstack/router';

import { theme } from './theme';
import Home from './pages/Home';
import Login from './pages/Login';
import { LanguageProvider, useTranslation } from './hooks/useTranslation';
import { useLoggedInUser } from './hooks/useLoggedInUser';
import ButtonLink from './components/library/ButtonLink';
import { signOut } from './firebase';

const rootRoute = new RootRoute({
	component: () => {
		const user = useLoggedInUser();
		const t = useTranslation();

		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position="fixed">
					<Container maxWidth="sm">
						<Toolbar disableGutters sx={{ gap: 3 }}>
							{!user ? (
								<ButtonLink to="/login">{t('login')}</ButtonLink>
							) : (
								<Button onClick={signOut}>{t('logout')}</Button>
							)}
						</Toolbar>
					</Container>
				</AppBar>

				<Container
					maxWidth="sm"
					component="main"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
						pt: 8,
						gap: 2
					}}
				>
					<Outlet />
				</Container>
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

const routeTree = rootRoute.addChildren([indexRoute, loginRoute]);

const router = new Router({ routeTree });
declare module '@tanstack/router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const App = () => (
	<LanguageProvider>
		<RouterProvider router={router} />
	</LanguageProvider>
);

export default App;
