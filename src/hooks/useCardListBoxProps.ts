import { SxProps, useMediaQuery } from '@mui/material';

export const useCardListBoxProps = () => {
	const matches = useMediaQuery('(min-width:1050px)');

	const boxProps: SxProps = matches
		? {
				display: 'grid',
				gap: '10px',
				gridTemplateColumns: '1fr 1fr',
				justifyItems: 'center'
		  }
		: {
				display: 'flex',
				gap: '10px',
				justifyContent: 'center',
				flexDirection: 'column'
		  };

	return boxProps;
};
