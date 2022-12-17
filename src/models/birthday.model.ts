import { UserModel } from "./user.model";

export type BirthdayModel = {
    id: string;
    date: Date;
    users?: UserModel[];
}
