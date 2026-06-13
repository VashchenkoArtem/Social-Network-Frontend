import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "./types";

export function PostThumbUpFilledIcon(props: IIconProps) {
    const { color } = props

    return (
        <Svg
            width={19}
            height={17}
            viewBox="0 0 19 17"
            fill={color}
            {...props}
        >
            <Path
                d="M17.578 5.115a2.187 2.187 0 00-1.64-.74h-4.063v-.938A3.441 3.441 0 008.437 0 .937.937 0 007.6.518L4.733 6.25h-3.17A1.562 1.562 0 000 7.813v6.875a1.563 1.563 0 001.563 1.562H15a2.188 2.188 0 002.17-1.916l.938-7.5a2.187 2.187 0 00-.53-1.72zM1.875 8.125h2.5v6.25h-2.5v-6.25zM16.25 6.602l-.938 7.5a.313.313 0 01-.312.273H6.25V7.409l2.72-5.44A1.563 1.563 0 0110 3.437v1.876a.938.938 0 00.938.937h5a.313.313 0 01.312.352z"
                fill={color}
                strokeWidth={0.5}
                stroke={color}
            />
            <Path
                d="M16.25 6.602l-.938 7.5a.313.313 0 01-.312.273H6.25V7.409l2.72-5.44A1.563 1.563 0 0110 3.437v1.876a.938.938 0 00.938.937h5a.313.313 0 01.312.352z"
                fill={color}
                fillOpacity={1}
                // stroke={color}
            />
        </Svg>
    )
}

