import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Chip } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';

type ChecksProps = {
	multisport: boolean;
	isic: boolean;
	freeParking: boolean;
	beverage: boolean;
};

const Checks: React.FC<ChecksProps> = ({
	multisport,
	isic,
	freeParking,
	beverage
}) => {
	const t = useTranslation();

	return (
		<>
			<Chip
				icon={multisport ? <CheckRoundedIcon /> : <CloseRoundedIcon />}
				label={t('multisport')}
			/>
			<Chip
				icon={isic ? <CheckRoundedIcon /> : <CloseRoundedIcon />}
				label={t('isic')}
			/>
			<Chip
				icon={freeParking ? <CheckRoundedIcon /> : <CloseRoundedIcon />}
				label={t('free_parking')}
			/>
			<Chip
				icon={beverage ? <CheckRoundedIcon /> : <CloseRoundedIcon />}
				label={t('beverage')}
			/>
		</>
	);
};

export default Checks;
