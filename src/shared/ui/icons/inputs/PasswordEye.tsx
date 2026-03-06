import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { IIconProps } from "./types"

export function PasswordEye(props: IIconProps) {
  const { color = "#81818D", ...rest } = props;

  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_404_1116)">
        <Path
          d="M8.234 8.233a2.5 2.5 0 103.533 3.534M8.942 4.233A8.692 8.692 0 0110 4.167c5.834 0 8.334 5.833 8.334 5.833a10.97 10.97 0 01-1.392 2.233M5.509 5.508A11.272 11.272 0 001.667 10s2.5 5.833 8.333 5.833a8.116 8.116 0 004.492-1.341M1.667 1.667l16.667 16.666"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={1}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_404_1116">
          <Path fill="#fff" d="M0 0H20V20H0z" fillOpacity={1} />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
