import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import RequestError from '../common/errors/request-error';
import { ListBirthdaysQuery, listBithday } from '../components/custom-queries';
import { BirthdayModel } from '../models/birthday.model';
import { GraphQLResult } from '@aws-amplify/api';
import moment from 'moment';
import { UserModel } from '../models/user.model';

export type UseGetUserBirthdays = {
	userBirthdays: UserModel[];
	isLoading: boolean;
};

export const useGetUserBirthdays = (variables: object): UseGetUserBirthdays => {
	const [results, setResults] = useState<GraphQLResult<ListBirthdaysQuery>>({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(
			API.graphql({
				query: listBithday,
				variables,
				authMode: 'AMAZON_COGNITO_USER_POOLS',
			}) as Promise<GraphQLResult<any>>
		)
			.then((apiData: GraphQLResult<ListBirthdaysQuery>) => {
				setResults(apiData);
				setIsLoading(false);
			})
			//TODO Improve to return error
			.catch(() => {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return {
			userBirthdays: [],
			isLoading,
		};
	}

	//TODO Improve to return error
	if (results.errors) {
		throw new RequestError('get birthdays with user', results.errors);
	}

	const items = results.data?.listBirthdays?.items;
	if (!items) {
		return {
			userBirthdays: [],
			isLoading: false,
		};
	}

	const userBirthdays = items
		.map((item) => ({
			id: item.id,
			date: moment(item.date).toDate(),
			users:
				item.users?.items?.map((user) => {
					return {
						id: user?.id || '',
						lastname: user?.lastname || '',
						firstname: user?.firstname || '',
						image: user?.image || '',
						mail: user?.mail || '',
					};
				}) || [],
		}))
		.filter((date: BirthdayModel) => {
			const mdate = moment(date?.date);
			const dateToCompare = moment().set('date', mdate.date()).set('month', mdate.month());
			if (moment().month() >= mdate.month()) {
				dateToCompare.add(1, 'year');
			}
			return dateToCompare.isAfter(moment());
		})
		.flatMap((b) =>
			b.users
				?.map((u: UserModel) => {
					u.birthday = moment(b.date).format('DD MMMM');
					return u;
				})
				.flat()
		)
		.sort((a, b) => moment(a?.birthday).diff(moment(b?.birthday)));

	return {
		userBirthdays,
		isLoading,
	};
};
