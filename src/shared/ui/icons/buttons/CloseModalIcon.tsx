import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IIconProps } from "../inputs/types"

export function CloseModalIcon(props: IIconProps) {
    const { color } = props;
    return (
        <Svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            {...props}
        >
        <Path
            d="M9.496 11.025L5.672 7.201l-3.825 3.824a1.082 1.082 0 11-1.53-1.53l3.825-3.824L.318 1.847a1.082 1.082 0 011.53-1.53L5.671 4.14 9.496.317a1.082 1.082 0 011.53 1.53L7.202 5.67l3.824 3.825a1.082 1.082 0 01-1.53 1.53z"
            fill={color}
            fillOpacity={1}
        />
    </Svg>
    )
}

