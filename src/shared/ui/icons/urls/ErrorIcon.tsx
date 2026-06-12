import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../buttons/types";

export function ErrorIcon(props: IIconProps) {
	const { color } = props
    return (
        <Svg
            width={14}
            height={14}
            viewBox="0 0 14 14"
            fill="none"
            {...props}
        >
        <Path
            d="M6.075 9.45a.675.675 0 111.35 0 .675.675 0 01-1.35 0zm0-5.4a.675.675 0 011.35 0v2.7a.675.675 0 01-1.35 0v-2.7zM6.75 0C3.017 0 0 3.038 0 6.75A6.75 6.75 0 106.75 0zm0 12.15a5.4 5.4 0 110-10.8 5.4 5.4 0 010 10.8z"
            fill={color}
        />
        </Svg>
    )
}
