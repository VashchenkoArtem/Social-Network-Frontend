import { IUser } from "@shared/types/user.types";

export interface IProps {
    user: IUser | null;
    requestId?: number
    buttonText: string;
    isOnline?: boolean
}