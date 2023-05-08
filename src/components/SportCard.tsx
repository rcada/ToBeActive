import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography
} from '@mui/material';

import { SportsCenter } from '../firebase';

import { SearchFilters } from './interface';
import Checks from './Checks';

type SportCardProps = {
	sportsCenter: SportsCenter;
	searchFilters: SearchFilters;
	setDialogOpen: (arg0: boolean) => void;
};

const SportCard: React.FC<SportCardProps> = ({
	sportsCenter,
	searchFilters,
	setDialogOpen
}) => {
	const sports = sportsCenter.sports.map(sport => sport.name);
	const sportsList = sports.join(', ');
	return (
		<Card sx={{ width: '450px' }}>
			<CardContent
				sx={{
					margin: '10px',
					display: 'flex',
					flexDirection: 'column',
					gap: '10px'
				}}
			>
				<Typography variant="h5">{sportsCenter.name}</Typography>
				<Box
					width="100%"
					textAlign="left"
					gap="10px"
					display="flex"
					flexDirection="column"
				>
					<Typography variant="body1">
						{searchFilters.sport
							? `Sport: ${searchFilters.sport}`
							: sports.length > 1
							? `Sports: ${sportsList}`
							: `Sport: ${sportsList}`}
					</Typography>
					<Box display="flex" justifyContent="space-between">
						<Typography variant="body2">{`Opening hours: ${sportsCenter.openTime} - ${sportsCenter.closeTime}`}</Typography>
						<Typography variant="body2">{`City: ${sportsCenter.city}`}</Typography>
					</Box>
					<Box display="flex" justifyContent="space-between">
						<Checks
							multisport={sportsCenter.multisport}
							isic={sportsCenter.isic}
							beverage={sportsCenter.beverage}
							freeParking={sportsCenter.beverage}
						/>
					</Box>
				</Box>
			</CardContent>
			<CardActions>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					width="100%"
				>
					<Box display="flex" gap="10px" paddingX="10px">
						{searchFilters.startTime && (
							<Typography>{`Start: ${searchFilters.startTime.toString()}`}</Typography>
						)}
						{searchFilters.endTime && (
							<Typography>{`End: ${searchFilters.endTime.toString()}`}</Typography>
						)}
					</Box>

					<Button onClick={() => setDialogOpen(true)} variant="outlined">
						Reserve
					</Button>
				</Box>
			</CardActions>
		</Card>
	);
};

export default SportCard;
