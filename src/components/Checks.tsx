import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Chip } from '@mui/material';

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
}) => (
	<>
		<Chip
			icon={multisport ? <CheckRoundedIcon /> : <CloseRoundedIcon />}
			label="Multisport"
		/>
		<Chip
			icon={isic ? <CheckRoundedIcon /> : <CloseRoundedIcon />}
			label="ISIC"
		/>
		<Chip
			icon={freeParking ? <CheckRoundedIcon /> : <CloseRoundedIcon />}
			label="Free parking"
		/>
		<Chip
			icon={beverage ? <CheckRoundedIcon /> : <CloseRoundedIcon />}
			label="Beverage"
		/>
	</>
);

export default Checks;
