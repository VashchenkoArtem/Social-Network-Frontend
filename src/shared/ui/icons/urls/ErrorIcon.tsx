import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../buttons/types";

export function ErrorIcon(props: IIconProps) {
	const { color } = props
    return (
        <Svg
            width={13}
            height={13}
            viewBox="0 0 13 13"
            fill="none"
            {...props}
        >
        <Path
            d="M7.2 11.2a.8.8 0 111.6 0 .8.8 0 01-1.6 0zm0-6.4a.8.8 0 111.6 0V8a.8.8 0 11-1.6 0V4.8zM8 0C3.576 0 0 3.6 0 8a8 8 0 108-8zm0 14.4A6.4 6.4 0 118 1.6a6.4 6.4 0 010 12.8z"
            fill={color}
        />
        </Svg>
    )
}
