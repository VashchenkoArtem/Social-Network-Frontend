import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { IIconProps } from "./types"


export function PasswordEyeOpen(props: IIconProps) {
  const { color = "#81818D", ...rest } = props;
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_11049_5807)">
        <G
          clipPath="url(#clip1_11049_5807)"
          stroke="#81818D"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Path
            d="M1.667 10S4.167 4.167 10 4.167c5.834 0 8.334 5.833 8.334 5.833s-2.5 5.833-8.334 5.833C4.167 15.833 1.667 10 1.667 10z"
            stroke={color}
            strokeOpacity={1}
          />
          <Path
            d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
            stroke={color}
            strokeOpacity={1}
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_11049_5807">
          <Path fill="#fff" d="M0 0H20V20H0z" fillOpacity={1} />
        </ClipPath>
        <ClipPath id="clip1_11049_5807">
          <Path fill="#fff" d="M0 0H20V20H0z" fillOpacity={1} />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
