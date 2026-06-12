import { IChat } from "@modules/chats/api/api.types";
import { FriendRequest } from "@modules/friends/api/api.types";
import { ReactNode } from "react";

export interface IChatProps {
    Icon: ReactNode;
    frameTitle: string;
    items: IChat[] | null | undefined;
    unreadMessagesCount?: number;
    isGroups?: boolean
    onEndReached?: () => void;
}