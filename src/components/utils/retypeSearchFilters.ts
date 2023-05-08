import dayjs from 'dayjs';

import { SearchProps } from '../Searcher';
import { SearchFilters } from '../interface';

export const retypeSearchFilters = (
	searchFilters: SearchFilters
): SearchProps => ({
	...searchFilters,
	city: { label: searchFilters.city, value: searchFilters.city },
	sport: searchFilters.sport
		? { label: searchFilters.sport, value: searchFilters.sport }
		: undefined,
	date: searchFilters.date ? dayjs(searchFilters.date, 'DD/MM/YYYY') : undefined
});
