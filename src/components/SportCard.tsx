import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography
} from '@mui/material';
import { useState } from 'react';

import { SportsCenterWithId } from '../firebase';
import { useTranslation } from '../hooks/useTranslation';
import useLoggedInUser from '../hooks/useLoggedInUser';

import { SearchFilters } from './interface';
import SportsCenterInfo from './SportsCenterInfo';
import ReservationDialogForm from './ReservationDialog';

type SportCardProps = {
	sportsCenter: SportsCenterWithId;
	searchFilters: SearchFilters;
};

const SportCard: React.FC<SportCardProps> = ({
	sportsCenter,
	searchFilters
}) => {
	const t = useTranslation();
	const user = useLoggedInUser();

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
					<SportsCenterInfo sportsCenter={sportsCenter} showSports />
				</CardContent>
				<CardActions
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'end',
						gap: '10px',
						width: '100%'
					}}
				>
					{!user && (
						<Typography variant="caption" color="error">
							You need to be logged in to make a reservation
						</Typography>
					)}
					<Button
						onClick={() => setOpenDialog(true)}
						variant="outlined"
						disabled={!user}
					>
						Reserve
					</Button>
				</CardActions>
			</Card>
		</>
	);
};

export default SportCard;
