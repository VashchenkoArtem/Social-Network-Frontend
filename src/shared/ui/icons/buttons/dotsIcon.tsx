import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "./types";

export function DotsIcon(props: IIconProps) {
	const { color } = props;
	return (
		<Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
			<Path
				d="M12.188 10a2.187 2.187 0 11-4.375 0 2.187 2.187 0 014.375 0zM10 5.937a2.187 2.187 0 100-4.374 2.187 2.187 0 000 4.375zm0 8.125a2.187 2.187 0 100 4.375 2.187 2.187 0 000-4.375z"
				fill={color}
				fillOpacity={1}
			/>
		</Svg>
	);
}
