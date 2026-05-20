import { FriendRequest, Profile } from "@modules/friends/api/api.types"

export type IProps = {
    frameName: string
    data?: FriendRequest[] | Profile[]
    buttonText: string
    setChosenTab: (title: string) => void;
    messageIfNull: string
}