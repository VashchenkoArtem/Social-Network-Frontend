import { FriendRequest } from "@modules/friends/api/api.types";
import { IUser } from "@shared/types/user.types";

export interface FriendsProps  {
    id?: number;
    user: IUser
}

interface FriendFrameBaseProps {
    frameName: string;
    buttonText: string;
    setChosenTab: (tab: string) => void;
    messageIfNull: string;
    data: FriendsProps[] | null | undefined
}



export type IProps = FriendFrameBaseProps;