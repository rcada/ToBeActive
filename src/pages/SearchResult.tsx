import { useSearch } from '@tanstack/router';
import dayjs from 'dayjs';

import { searchRoute } from '../App';
import usePageTitle from '../hooks/usePageTitle';
import { Searcher } from '../components/Searcher';

const SearchResult = () => {
	usePageTitle('Search');
	const {
		city,
		sport,
		date,
		startTime,
		endTime,
		multisport,
		isic,
		freeParking,
		beverage
	} = useSearch({
		from: searchRoute.id
	});

	return (
		<Searcher
			initialValues={{
				city: { label: city, value: city },
				sport: sport ? { label: sport, value: sport } : undefined,
				date: dayjs(date, 'DD/MM/YYYY'),
				startTime,
				endTime,
				multisport,
				isic,
				freeParking,
				beverage
			}}
		/>
	);
};

export default SearchResult;
