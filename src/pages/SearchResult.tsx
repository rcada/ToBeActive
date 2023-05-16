import { useSearch } from '@tanstack/router';
import { Box, CircularProgress, Typography } from '@mui/material';

import { searchRoute } from '../App';
import usePageTitle from '../hooks/usePageTitle';
import { Searcher } from '../components/Searcher';
import { retypeSearchFiltersToSearchProps } from '../components/utils/retypeSearchFilters';
import { useSportsCenters } from '../hooks/useSportsCenters';
import SportCard from '../components/SportCard';
import { useCardListBoxProps } from '../hooks/useCardListBoxProps';
import { useTranslation } from '../hooks/useTranslation';

const SearchResult = () => {
	const searchFilters = useSearch({
		from: searchRoute.id
	});
	const t = useTranslation();
	usePageTitle(`${searchFilters.city}: ${searchFilters.sport}`);

	const boxProps = useCardListBoxProps();

	const { filteredSportsCenters: sportsCenters, loading } =
		useSportsCenters(searchFilters);

	return (
		<>
			<Searcher
				initialValues={retypeSearchFiltersToSearchProps(searchFilters)}
			/>
			{sportsCenters.length === 0 ? (
				loading ? (
					<CircularProgress />
				) : (
					<Typography variant="h5">{t('not_found_facilities')}</Typography>
				)
			) : sportsCenters.length === 1 ? (
				<SportCard
					sportsCenter={sportsCenters[0]}
					searchFilters={searchFilters}
				/>
			) : (
				<Box sx={boxProps}>
					{sportsCenters.map((sportsCenter, index) => (
						<SportCard
							key={index}
							sportsCenter={sportsCenter}
							searchFilters={searchFilters}
						/>
					))}
				</Box>
			)}
		</>
	);
};

export default SearchResult;
