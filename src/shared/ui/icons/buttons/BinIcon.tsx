import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../inputs/types"

export function BinIcon(props: IIconProps) {
  const { color } = props;

  return (
    <Svg width={15} height={17} viewBox="0 0 15 17" fill="none"
      // xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
        <Path
          d="M.834 4.167h13.333M5.834 7.5v5m3.333-5v5m-7.5-8.333l.834 10a1.667 1.667 0 001.666 1.666h6.667a1.667 1.667 0 001.667-1.666l.833-10m-8.333 0v-2.5a.833.833 0 01.833-.834h3.333a.833.833 0 01.834.834v2.5"
          // fill={color}
          // stroke="color(display-p3 .3294 .2353 .3216)"
          strokeWidth={1.8}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={1}
          fillOpacity={1}
        />
    </Svg>
  )
}

