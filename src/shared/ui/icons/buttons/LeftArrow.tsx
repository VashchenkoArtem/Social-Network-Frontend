import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
import { IIconProps } from "./types"

export function LeftArrowIcon(props: IIconProps) {
    const { color } = props
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.333 16.004a.991.991 0 01-1.402 0l-5.29-5.29a.992.992 0 010-1.402l5.29-5.29a.992.992 0 111.402 1.402l-4.59 4.59 4.59 4.588a.992.992 0 010 1.402z"
        fill={color}
      />
    </Svg>
  )
}

