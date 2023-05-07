import { Box, IconButton, Paper, Popper } from '@mui/material';
import React from 'react';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

import FormCheckbox from './library/form/FormCheckbox';

const CheckListPopper = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'checklist-popper' : undefined;

	return (
		<>
			<IconButton
				aria-describedby={id}
				onClick={handleClick}
				onMouseDown={e => e.preventDefault()}
			>
				<TuneRoundedIcon />
			</IconButton>
			<Popper id={id} open={open} anchorEl={anchorEl}>
				<Paper>
					<Box display="flex" flexDirection="column" padding="10px">
						<FormCheckbox label="Multisport" name="multisport" />
						<FormCheckbox label="ISIC" name="isic" />
						<FormCheckbox label="Free parking" name="freeParking" />
						<FormCheckbox label="Beverage" name="beverage" />
					</Box>
				</Paper>
			</Popper>
		</>
	);
};

export default CheckListPopper;
