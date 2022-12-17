import { createNewArrivalsMutation } from './createNewArrivalsMutation';
import { getNewArrivalsLight } from './getNewArrivalsLight';

export const upsertNewArrival = async (date: string) => {
	const newArrivalsList = await getNewArrivalsLight({
		filter: {
			date: {
				eq: date,
			},
		},
	});

	if (newArrivalsList && newArrivalsList.length > 0) {
		return newArrivalsList[0];
	}

	const newNewArrivals = await createNewArrivalsMutation({
		input: {
			date: date,
		},
	});

	return newNewArrivals;
};
