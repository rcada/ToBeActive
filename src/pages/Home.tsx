import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/router';
import dayjs from 'dayjs';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { Searcher } from '../components/Searcher';
import { useTranslation } from '../hooks/useTranslation';

const Home = () => {
	const t = useTranslation();
	usePageTitle('Home');
	const user = useLoggedInUser();
	const navigate = useNavigate();

	return (
		<>
			<Box display="flex">
				<Typography variant="h1">ToBeActive</Typography>
			</Box>
			{user ? (
				<Typography variant="h4">{`${t('hello')} ${user.email}! ${t(
					'what_do'
				)}`}</Typography>
			) : (
				<Button onClick={() => navigate({ to: '/login' })} variant="outlined">
					{t('sign_register')}
				</Button>
			)}
			<Searcher
				initialValues={{
					date: dayjs(Date.now())
				}}
			/>
		</>
	);
};

export default Home;
