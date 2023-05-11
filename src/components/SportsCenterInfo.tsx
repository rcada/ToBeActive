import { Box, Typography } from '@mui/material';

import { SportsCenter } from '../firebase';

import Checks from './Checks';
import { getTimeFormat } from './utils/getTimeFormat';

type SportsCenterInfoProps = {
	sportsCenter: SportsCenter;
	showSports?: boolean;
};

const SportsCenterInfo: React.FC<SportsCenterInfoProps> = ({
	sportsCenter,
	showSports = false
}) => {
	const sports = sportsCenter.sports.map(sport => sport.name);
	const sportsList = sports.join(', ');

	const openingHours = `Opening hours: ${getTimeFormat(
		sportsCenter.openTime
	)} - ${getTimeFormat(sportsCenter.closeTime)}`;

	return (
		<>
			<Typography variant="h5">{sportsCenter.name}</Typography>
			<Box
				width="100%"
				textAlign="left"
				gap="10px"
				display="flex"
				flexDirection="column"
			>
				{showSports && (
					<Typography variant="body1">{`Sports: ${sportsList}`}</Typography>
				)}
				<Box display="flex" justifyContent="space-between">
					<Typography variant="body2">{openingHours}</Typography>
					<Typography variant="body2">{`City: ${sportsCenter.city}`}</Typography>
				</Box>
				<Box display="flex" justifyContent="space-between" gap="10px">
					<Checks
						multisport={sportsCenter.multisport}
						isic={sportsCenter.isic}
						beverage={sportsCenter.beverage}
						freeParking={sportsCenter.beverage}
					/>
				</Box>
			</Box>
		</>
	);
};

export default SportsCenterInfo;
