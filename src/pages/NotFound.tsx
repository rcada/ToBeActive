import { Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

const NotFound = () => {
	const t = useTranslation();
	usePageTitle(t('notFound'));
	return (
		<>
			<WarningIcon sx={{ typography: 'h1' }} />
			<Typography variant="h2">{t('notFound')}</Typography>
			<Typography>{t('notFound.body')}</Typography>
		</>
	);
};

export default NotFound;
