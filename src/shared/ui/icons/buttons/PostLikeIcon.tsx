import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "./types";

export function PostLikeIcon(props: IIconProps) {
    const { color } = props;

    return (
        <Svg
            width={17}
            height={16}
            viewBox="0 0 17 16"
            fill={color}
            {...props}
        >
            <Path
                d="M8.417 12.958l-.084.084-.091-.084C4.283 9.367 1.667 6.992 1.667 4.583c0-1.666 1.25-2.916 2.916-2.916 1.284 0 2.534.833 2.975 1.966h1.55C9.55 2.5 10.8 1.667 12.083 1.667 13.75 1.667 15 2.917 15 4.583c0 2.409-2.617 4.784-6.583 8.375zM12.083 0c-1.45 0-2.841.675-3.75 1.733A5.011 5.011 0 004.583 0C2.017 0 0 2.008 0 4.583c0 3.142 2.833 5.717 7.125 9.609l1.208 1.1 1.209-1.1c4.291-3.892 7.125-6.467 7.125-9.609C16.667 2.008 14.65 0 12.083 0z"
                fill={color}
                fillOpacity={1}
            />
        </Svg>
    )
}

