import React, { useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography
} from '@mui/material';
import dayjs from 'dayjs';

import { ReservationWithId } from '../firebase';
import { useSportsCenterById } from '../hooks/useSportsCenterById';
import { useTranslation } from '../hooks/useTranslation';

import SportsCenterInfo from './SportsCenterInfo';
import { getTimeFormat } from './utils/getTimeFormat';
import { DeleteReservationDialog } from './DeleteReservationDialog';

type ReservationCardProps = {
	reservation: ReservationWithId;
	cancellable?: boolean;
};

export const ReservationCard: React.FC<ReservationCardProps> = ({
	reservation,
	cancellable = false
}) => {
	const t = useTranslation();

	const sportsCenter = useSportsCenterById(reservation.sportsCenterId);

	const [openDialog, setOpenDialog] = useState<boolean>(false);

	return (
		<>
			<DeleteReservationDialog
				open={openDialog}
				setOpen={setOpenDialog}
				reservation={reservation}
			/>
			<Card sx={{ width: '500px' }}>
				<CardContent
					sx={{
						margin: '10px',
						display: 'flex',
						flexDirection: 'column',
						gap: '25px'
					}}
				>
					{!sportsCenter ? (
						<Typography>Sports Center not found</Typography>
					) : (
						<Box display="flex" flexDirection="column" gap="10px">
							<SportsCenterInfo sportsCenter={sportsCenter} />
						</Box>
					)}
					<Box
						width="100%"
						textAlign="left"
						gap="5px"
						display="flex"
						flexDirection="column"
					>
						<Typography variant="h6">{t('res_info')}</Typography>
						<Typography>{`${t('on')} ${reservation.date}, ${t(
							'from'
						)} ${getTimeFormat(reservation.startTime)} ${t(
							'till'
						)} ${getTimeFormat(reservation.endTime)}`}</Typography>
						<Typography>{`${t('sport_')} ${reservation.sport}`}</Typography>
						<Typography>{`${t('made_on')} ${dayjs(
							reservation.submissionDate.toDate()
						).format('DD/MM/YYYY h:mm')}`}</Typography>
					</Box>
				</CardContent>
				{cancellable && (
					<CardActions
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'end'
						}}
					>
						<Button
							color="error"
							variant="outlined"
							onClick={() => setOpenDialog(true)}
						>
							{t('cancel_res')}
						</Button>
					</CardActions>
				)}
			</Card>
		</>
	);
};
