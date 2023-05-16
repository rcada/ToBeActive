import { SportsCenterWithId } from '../../firebase';
import { SearchFilters } from '../interface';

/**
 * Filters sports centers with provided filters
 * @param sportsCenters all sports centers to be filtered
 * @param filters filters
 * @returns filtered sports centers
 */
export const filterSportsCenters = (
	sportsCenters: SportsCenterWithId[],
	filters: SearchFilters
): SportsCenterWithId[] =>
	sportsCenters.filter(sportsCenter => {
		if (
			filters.city &&
			sportsCenter.city.toLowerCase() !== filters.city.toLowerCase()
		) {
			return false;
		}
		if (filters.sport) {
			if (
				!sportsCenter.sports.some(
					sport =>
						sport.name.toLowerCase() === (filters.sport as string).toLowerCase()
				)
			)
				return false;
		}
		if (filters.startTime && sportsCenter.closeTime <= filters.startTime) {
			return false;
		}
		if (filters.endTime && sportsCenter.openTime >= filters.endTime) {
			return false;
		}
		if (filters.multisport && !sportsCenter.multisport) {
			return false;
		}
		if (filters.isic && !sportsCenter.isic) {
			return false;
		}
		if (filters.beverage && !sportsCenter.beverage) {
			return false;
		}
		if (filters.freeParking && !sportsCenter.freeParking) {
			return false;
		}
		return true;
	});
