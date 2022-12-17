import { API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { UpdateUserMutation } from '../API';
import { updateUser } from '../graphql/mutations';
import { UserModel } from '../models/user.model';
import { useState } from 'react';

export type UseUpdateUserModel = {
	updateUser: (variables: object) => Promise<UserModel | undefined>;
	isLoading: boolean;
};

export const useUpdateUser = (): UseUpdateUserModel => {
	const [isLoading, setIdLoading] = useState(false);

	return {
		updateUser: (variables: object) => {
			setIdLoading(true);
			return (
				API.graphql({
					query: updateUser,
					variables,
					authMode: 'AMAZON_COGNITO_USER_POOLS',
				}) as Promise<GraphQLResult<any>>
			).then((apiData: GraphQLResult<UpdateUserMutation>) => {
				if (apiData.errors) {
					// TODO
				}

				setIdLoading(false);
				const items = apiData.data?.updateUser;
				if (!items || !apiData.data) {
					return undefined;
				}

				return {
					id: items.id,
					mail: items.mail,
					firstname: items.firstname,
					lastname: items.lastname || '',
					image: items.image || '',
					job: items.job || '',
				};
			});
		},
		isLoading,
	};
};
