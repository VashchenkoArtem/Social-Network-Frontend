import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../buttons/types";

export function MessageStatusMarkIcon(props: IIconProps) {
	const { color } = props

    return (
        <Svg
            width={10}
            height={9}
            viewBox="0 0 10 9"
            fill="none"
            {...props}
        >
        <Path
            d="M8.5 1L3.25 7.25 1 4.75"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={1}
        />
        </Svg>
    )
}

