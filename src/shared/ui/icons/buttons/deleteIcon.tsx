import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "./types";

export function DeleteIcon(props: IIconProps) {
	const { color } = props;
	return (
		<Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
			<Path
				d="M3.334 5.833h13.333M8.334 9.167v5m3.333-5v5m-7.5-8.334l.834 10A1.666 1.666 0 006.667 17.5h6.667a1.667 1.667 0 001.667-1.667l.833-10m-8.333 0v-2.5a.833.833 0 01.833-.833h3.333a.833.833 0 01.834.833v2.5"
				stroke={color}
				strokeWidth={1.66667}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeOpacity={1}
			/>
		</Svg>
	);
}
