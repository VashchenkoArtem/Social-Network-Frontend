export interface IProps{
    avatar?: string;
    pseudonym?: string;
    signature?: string;
    isPadding?: boolean;
    lastMessage?: string;
    time?: Date;
    unreadCount?: number;
    isGroup?: boolean;
    groupName?: string;
    isOnline?: boolean
}