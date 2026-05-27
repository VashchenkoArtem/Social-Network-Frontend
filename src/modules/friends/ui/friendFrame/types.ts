import { FriendRequest } from "@modules/friends/api/api.types"
import { IUser } from "@shared/types/user.types"

export type IProps = {
    frameName: string
    data?: FriendRequest[] | IUser[]
    buttonText: string
    setChosenTab: (title: string) => void;
    messageIfNull: string
}