import { FriendRequest } from "@modules/friends/api/api.types";
import { IUser } from "@shared/types/user.types";

interface FriendFrameBaseProps {
    frameName: string;
    buttonText: string;
    setChosenTab: (tab: string) => void;
    messageIfNull: string;
}

interface FriendRequestsProps extends FriendFrameBaseProps {
    type: "requests";
    data: FriendRequest[];
}

interface FriendsProps extends FriendFrameBaseProps {
    type: "friends";
    data: IUser[];
}

export type IProps = FriendRequestsProps | FriendsProps;