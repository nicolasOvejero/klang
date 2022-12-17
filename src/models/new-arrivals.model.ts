import { UserModel } from "./user.model";

export type NewArrivalModel = {
    id: string;
    date: Date;
    users: UserModel[];
}
