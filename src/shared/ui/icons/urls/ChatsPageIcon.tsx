import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../buttons/types";

export function ChatsPageIcon(props: IIconProps) {
	const { color } = props;
	return (
		<Svg width={17} height={17} viewBox="0 0 17 17" fill="none" {...props}>
			<Path
				d="M.833 8.348a7.515 7.515 0 1115.03 0v4.782c0 .797 0 1.193-.117 1.511a1.879 1.879 0 01-1.104 1.104c-.319.119-.716.119-1.512.119H8.35A7.515 7.515 0 01.833 8.348z"
				stroke={color}
				strokeWidth={1.66667}
				strokeOpacity={1}
			/>
			<Path
				d="M5.53 7.409h5.637m-2.819 3.757h2.819"
				stroke={color}
				strokeWidth={1.66667}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeOpacity={1}
			/>
		</Svg>
	);
}
