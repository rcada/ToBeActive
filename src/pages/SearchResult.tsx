import { useSearch } from '@tanstack/router';
import { Container } from '@mui/material';

import { searchRoute } from '../App';
import usePageTitle from '../hooks/usePageTitle';
import { Searcher } from '../components/Searcher';
import { retypeSearchFiltersToSearchProps } from '../components/utils/retypeSearchFilters';
import { useSportsCenters } from '../hooks/useSportsCenters';
import SportCard from '../components/SportCard';

const SearchResult = () => {
	const searchFilters = useSearch({
		from: searchRoute.id
	});
	usePageTitle(`${searchFilters.city}: ${searchFilters.sport}`);

	const sportsCenters = useSportsCenters(searchFilters);

	return (
		<Container sx={{ width: '100%', height: '100%' }}>
			<Searcher
				initialValues={retypeSearchFiltersToSearchProps(searchFilters)}
			/>

			{sportsCenters.map((sportsCenter, index) => (
				<SportCard
					key={index}
					sportsCenter={sportsCenter}
					searchFilters={searchFilters}
				/>
			))}
		</Container>
	);
};

export default SearchResult;
