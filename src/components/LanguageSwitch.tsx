import { Box, Switch } from '@mui/material';
import Flag from 'react-flagkit';

import { useLanguage, useTranslation } from '../hooks/useTranslation';

const LanguageSwitch = () => {
	const [language, setLanguage] = useLanguage();
	const t = useTranslation();
	return (
		<Box display="flex" alignItems="center">
			<Flag country="GB" title={t('en')} />
			<Switch
				checked={language === 'cs'}
				onChange={() => setLanguage(language === 'cs' ? 'en' : 'cs')}
			/>
			<Flag country="CZ" title={t('cs')} />
		</Box>
	);
};

export default LanguageSwitch;
