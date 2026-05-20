import { IChatWithUsers } from "@modules/chats/api/api.types";
import { ReactNode } from "react";

export interface IChatProps {
    Icon: ReactNode;
    frameTitle: string;
    items: IChatWithUsers[]
}