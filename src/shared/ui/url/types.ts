import { ReactNode } from "react";

export interface UrlProps {
    text: string;
    icon: ReactNode;
    href: string;
    isChat?: boolean
}