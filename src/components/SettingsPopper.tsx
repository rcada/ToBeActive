import { IconButton, Paper, Popper } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

import LanguageSwitch from './LanguageSwitch';
import ThemeSwitch from './ThemeSwitch';

const SettingsPopper = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'settings-popper' : undefined;

	return (
		<>
			<IconButton
				aria-describedby={id}
				onClick={handleClick}
				onMouseDown={e => e.preventDefault()}
				color="primary"
			>
				<SettingsIcon />
			</IconButton>
			<Popper id={id} open={open} anchorEl={anchorEl} disablePortal>
				<Paper
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
						padding: '10px'
					}}
				>
					<LanguageSwitch />
					<ThemeSwitch />
				</Paper>
			</Popper>
		</>
	);
};

export default SettingsPopper;
