import { useSearch } from '@tanstack/router';
import { Dialog, Typography } from '@mui/material';
import { useState } from 'react';

import { searchRoute } from '../App';
import usePageTitle from '../hooks/usePageTitle';
import { Searcher } from '../components/Searcher';
import { retypeSearchFilters } from '../components/utils/retypeSearchFilters';
import { useSportsCenters } from '../hooks/useSportsCenters';
import SportCard from '../components/SportCard';

const SearchResult = () => {
	const searchFilters = useSearch({
		from: searchRoute.id
	});
	usePageTitle(`${searchFilters.city}: ${searchFilters.sport}`);

	const { filteredSportsCenters } = useSportsCenters(searchFilters);

	const [openDialog, setOpenDialog] = useState<boolean>(false);

	return (
		<>
			<Dialog open={openDialog}>
				<Typography>hello</Typography>
			</Dialog>
			<Searcher initialValues={retypeSearchFilters(searchFilters)} />

			{filteredSportsCenters.map((sportsCenter, index) => (
				<SportCard
					key={index}
					sportsCenter={sportsCenter}
					searchFilters={searchFilters}
					setDialogOpen={setOpenDialog}
				/>
			))}
		</>
	);
};

export default SearchResult;
