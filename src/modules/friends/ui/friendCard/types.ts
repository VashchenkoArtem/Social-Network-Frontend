import { Profile } from "@modules/friends/api/api.types";
import { IUser } from "@shared/types/user.types";

export interface IProps {
    user: Profile | null;
}