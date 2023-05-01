import { useState } from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { AppBar, CssBaseline, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import { Button } from '@mui/base';
import {
	RouterProvider,
	RootRoute,
	Outlet,
	Router,
	Route,
	Link
} from '@tanstack/router';
import Home from './pages/Home';

const rootRoute = new RootRoute({
	component: () => {
		const tbd = 'hey';

		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position="fixed">
					<Container maxWidth="sm">
						<Toolbar disableGutters sx={{ gap: 3 }}>
							<Button>TBD</Button>
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

const routeTree = rootRoute.addChildren([indexRoute]);

const router = new Router({ routeTree });
declare module '@tanstack/router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const App = () => <RouterProvider router={router} />;

export default App;
