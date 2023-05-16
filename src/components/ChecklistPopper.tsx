import { IconButton, Paper, Popper } from '@mui/material';
import React, { useState } from 'react';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

import { useTranslation } from '../hooks/useTranslation';

import FormCheckbox from './library/form/FormCheckbox';

const CheckListPopper = () => {
	const t = useTranslation();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
				<Paper
					sx={{ display: 'flex', flexDirection: 'column', padding: '10px' }}
				>
					<FormCheckbox label={t('multisport')} name="multisport" />
					<FormCheckbox label={t('isic')} name="isic" />
					<FormCheckbox label={t('free_parking')} name="freeParking" />
					<FormCheckbox label={t('beverage')} name="beverage" />
				</Paper>
			</Popper>
		</>
	);
};

export default CheckListPopper;
