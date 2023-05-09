import { useSearch } from '@tanstack/router';

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

	const { filteredSportsCenters } = useSportsCenters(searchFilters);

	return (
		<>
			<Searcher
				initialValues={retypeSearchFiltersToSearchProps(searchFilters)}
			/>

			{filteredSportsCenters.map((sportsCenter, index) => (
				<SportCard
					key={index}
					sportsCenter={sportsCenter}
					searchFilters={searchFilters}
				/>
			))}
		</>
	);
};

export default SearchResult;
