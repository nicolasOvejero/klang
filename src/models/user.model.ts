export type UserModel = {
    id: string;
    firstname: string;
    lastname: string;
    image?: string;
    job?: string;
    birthday?: string;
    arrivalDate?: string;
    mail?: string;
    size?: 'small' | 'medium';
    background?: 'bg-grey' | 'bg-white' | undefined;
    showActions?: boolean;
}
