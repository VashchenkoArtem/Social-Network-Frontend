import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "./types";

export function PostViewsIcon(props: IIconProps) {
    const { color } = props;

    return (
        <Svg
            width={19}
            height={14}
            viewBox="0 0 19 14"
            fill="none"
            {...props}
        >
            <Path
                d="M1 6.833S3.5 1 9.333 1c5.834 0 8.334 5.833 8.334 5.833s-2.5 5.834-8.334 5.834C3.5 12.667 1 6.833 1 6.833z"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={1}
            />
            <Path
                d="M9.333 9.333a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={1}
            />
        </Svg>
    )
}
