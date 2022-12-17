import { UserModel } from '../components/user/user.component';

export type EventModel = {
	id: string;
	date: Date;
	image?: string | null;
	participants?: UserModel[];
	type: string | undefined | null;
	address?: {
		city: string | undefined | null;
		street: string | undefined | null;
	};
	schedule?: string | null;
	published: boolean;
	createBy: UserModel;
	description: string;
};
