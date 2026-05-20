import { IAvatar } from "@shared/types/user.types";

export interface AvatarsProps{
    avatars: IAvatar[];
    handlePhotoVisibility: (photoId: number, isVisible: boolean) => void
}