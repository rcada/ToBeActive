import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography
} from '@mui/material';
import { useState } from 'react';

import { SportsCenter } from '../firebase';
import { useTranslation } from '../hooks/useTranslation';

import { SearchFilters } from './interface';
import Checks from './Checks';
import ReservationDialogForm from './ReservationDialog';

type SportCardProps = {
	sportsCenter: SportsCenter;
	searchFilters: SearchFilters;
};

const SportCard: React.FC<SportCardProps> = ({
	sportsCenter,
	searchFilters
}) => {
	const t = useTranslation();

	const sports = sportsCenter.sports.map(sport => sport.name);
	const sportsList = sports.join(', ');

	const [openDialog, setOpenDialog] = useState<boolean>(false);

	return (
		<>
			<ReservationDialogForm
				open={openDialog}
				setOpen={setOpenDialog}
				searchFilters={searchFilters}
				sportsCenter={sportsCenter}
			/>
			<Card sx={{ width: '500px' }}>
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
						<Typography variant="body1">{`Sports: ${sportsList}`}</Typography>
						<Box display="flex" justifyContent="space-between">
							<Typography variant="body2">{`Opening hours: ${sportsCenter.openTime} - ${sportsCenter.closeTime}`}</Typography>
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
				</CardContent>
				<CardActions>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="end"
						width="100%"
					>
						<Button onClick={() => setOpenDialog(true)} variant="outlined">
							Reserve
						</Button>
					</Box>
				</CardActions>
			</Card>
		</>
	);
};

export default SportCard;
