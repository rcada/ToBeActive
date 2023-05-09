import dayjs from 'dayjs';

import { SearchProps } from '../Searcher';
import { SearchFilters } from '../interface';
import { ReservatioProps } from '../ReservationDialog';

/**
 * Converts data typed as SearchFilters to a type for form component
 * @param searchFilters
 * @returns form values for Searcher form component
 */
export const retypeSearchFiltersToSearchProps = (
	searchFilters: SearchFilters
): SearchProps => ({
	...searchFilters,
	city: { label: searchFilters.city, value: searchFilters.city },
	sport: searchFilters.sport
		? { label: searchFilters.sport, value: searchFilters.sport }
		: undefined,
	date: searchFilters.date ? dayjs(searchFilters.date, 'DD/MM/YYYY') : undefined
});

/**
 * Converts data typed as SearchFilters to a type for form component
 * @param searchFilters
 * @returns form values for ReservationDialog form component
 */
export const retypeSearchFiltersToReservationProps = (
	searchFilters: SearchFilters
): ReservatioProps => ({
	sport: searchFilters.sport
		? { label: searchFilters.sport, value: searchFilters.sport }
		: undefined,
	date: searchFilters.date
		? dayjs(searchFilters.date, 'DD/MM/YYYY')
		: undefined,
	startTime: searchFilters.startTime,
	endTime: searchFilters.endTime
});
