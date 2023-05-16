import { SxProps, useMediaQuery } from '@mui/material';

/**
 * makes SxProps for list box component
 * @returns box props
 */
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
