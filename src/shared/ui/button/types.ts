import { PressableProps } from "react-native"


export interface IPressableProps extends PressableProps {
    variant: "white" | "purple";
    icon?: string;
    text?: string;
    iconAlign?: "left" | "right";
}