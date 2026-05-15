import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "./types"

export function stickersIcon(props: IIconProps) {
  const { color } = props;
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        d="M8.717.047a8.68 8.68 0 018.67 8.67A8.67 8.67 0 118.396.053l.32-.006zm2.612 2.363a6.827 6.827 0 10-2.612 13.133 6.834 6.834 0 006.826-6.826 6.828 6.828 0 00-4.214-6.307zm.741 7.315a.922.922 0 01.674 1.39h0c-.88 1.524-2.35 2.398-4.027 2.398-1.573 0-2.96-.767-3.855-2.12l-.172-.279a.921.921 0 011.596-.922v.001c.318.55 1.058 1.476 2.43 1.476 1.373 0 2.114-.927 2.432-1.476v0a.922.922 0 01.922-.468zM6.054 5.882a1.246 1.246 0 01.449 2.256 1.245 1.245 0 11-.45-2.256zm5.568-.024a1.245 1.245 0 110 2.49 1.245 1.245 0 010-2.49z"
        fill={color}
        stroke={color}
        strokeWidth={0.08375}
        fillOpacity={1}
        strokeOpacity={1}
      />
    </Svg>
  )
}

