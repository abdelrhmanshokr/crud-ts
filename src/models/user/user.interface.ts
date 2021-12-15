// defining the interface which the user's schema is gonna follow

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    dateOfBirth: string;
    isSoftDeleted: boolean;
}