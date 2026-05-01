import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "./types";

export function PlusIconNoBorder(props: IIconProps) {
    const { color } = props;

    return (
        <Svg
            width={16}
            height={16}
            viewBox="0 0 12 12"
            fill="none"
            {...props}
        >
        <Path
            d="M10.547 6.49H6.49v4.057a.811.811 0 01-1.622 0V6.49H.81a.811.811 0 110-1.622h4.057V.81a.811.811 0 011.622 0v4.057h4.057a.811.811 0 010 1.622z"
            fill={color}
            fillOpacity={1}
        />
        </Svg>
    )
}


