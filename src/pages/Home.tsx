import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/router';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { Searcher } from '../components/Searcher';

const Home = () => {
	usePageTitle('Home');
	const user = useLoggedInUser();
	const navigate = useNavigate();

	return (
		<>
			<Box display="flex">
				<Typography variant="h1">ToBeActive</Typography>
			</Box>
			{user ? (
				<Typography variant="h4">{`Hello ${user.email}! What would you like to do?`}</Typography>
			) : (
				<Button onClick={() => navigate({ to: '/login' })} variant="outlined">
					Sign in or register
				</Button>
			)}
			<Searcher />
		</>
	);
};

export default Home;
