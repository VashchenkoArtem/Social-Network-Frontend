import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../buttons/types";

export function MyPostsPageIcon(props: IIconProps) {
	const { color } = props;
	return (
		<Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
			<Path
				d="M1.667 5A3.333 3.333 0 015 1.667h10A3.334 3.334 0 0118.333 5v10A3.333 3.333 0 0115 18.333H5A3.333 3.333 0 011.667 15V5z"
				stroke={color}
				strokeWidth={1.66667}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeOpacity={1}
			/>
			<Path
				d="M7.083 9.167a2.083 2.083 0 100-4.167 2.083 2.083 0 000 4.167zM12.105 10.518L5 18.333h10.11a3.223 3.223 0 003.223-3.222V15c0-.39-.145-.538-.408-.826l-3.358-3.662a1.665 1.665 0 00-2.462.005z"
				stroke={color}
				strokeWidth={1.66667}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeOpacity={1}
			/>
		</Svg>
	);
}
