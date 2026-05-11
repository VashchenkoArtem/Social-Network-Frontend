export interface FriendRequest {
    id: number
    status: string | null
    senderId: number
    receiverId: number
    from_profile: Profile
    to_profile: Profile
}
export interface Profile{
    id: number;
    profileId: number | null;
    profile: {
        id: number;
        signature: string | null;
        birth_date: Date | null;
        avatar: string | null;
        pseudonym: string | null;
        is_image_signature: boolean;
        is_text_signature: boolean;
    }
    firstname: string | null;
    lastname: string | null;
    username: string | null;
    email: string;
    password: string;

}
export interface CreateFriendRequest {
    
}