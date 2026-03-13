import { View, Text } from "react-native";
import { LogoIcon, PlusIcon, ManageIcon } from "../icons/buttons";
import { ExitIcon } from "../icons/buttons/ExitIcon";
import { styles } from "./styles";
import { Button } from "../button";
import { COLORS } from "@shared/constants/colors";
import { HeaderProps } from "./types";
import { push } from "expo-router/build/global-state/routing";
import { Link, usePathname } from "expo-router";
import { Url } from "../url";
import { FriendsPageIcon } from "../icons/urls/FriendsPageIcon";
import { constStyles } from "@shared/constants/styles";
import { ChatsPageIcon } from "../icons/urls/ChatsPageIcon";
import { AdditionalUrl } from "../additionalUrl/AdditionalUrl";

export function Header(props: HeaderProps) {
	const { cantCreatePost } = props;
	const pathname = usePathname();
	if (pathname === "/login") {
		return (
			<View style={styles.headerWithLogo}>
				<Link href="/">
					<LogoIcon color={COLORS.plum} width={145} height={18}></LogoIcon>
				</Link>
			</View>
		);
	}
	return (
		<View>
			<View style={styles.header}>
				<Link href="/">
					<LogoIcon color={COLORS.plum} width={145} height={18}></LogoIcon>
				</Link>
				<View style={styles.buttons}>
					{!cantCreatePost && (
						<Button
							variant="white"
							iconLeft={<PlusIcon color={COLORS.plum} style={styles.icon} />}
						></Button>
					)}
					<Button
						variant="white"
						iconLeft={<ManageIcon color={COLORS.plum} style={styles.icon} />}
						onPress={() => push("/settings/personalInformation")}
						href="/settings/personalInformation"
						isSettings={true}
					></Button>
					<Button
						variant="white"
						iconLeft={<ExitIcon color={COLORS.plum} style={styles.icon} />}
						onPress={() => push("/login")}
						href="/login"
					></Button>
				</View>
			</View>
			{pathname === "/contacts" ||
			pathname === "/notifications" ||
			pathname === "/groupChats" ? (
				<View style={styles.header}>
					<Url
						href="/contacts"
						text="Контакти"
						icon={
							<FriendsPageIcon
								style={constStyles.urlIcon}
								color={COLORS.urlBlue}
							/>
						}
					/>
					<Url
						href="/notifications"
						text="Повідомлення"
						icon={
							<ChatsPageIcon
								style={constStyles.urlIcon}
								color={COLORS.urlBlue}
							/>
						}
					/>
					<Url
						href="/groupChats"
						text="Групові чати"
						icon={
							<ChatsPageIcon
								style={constStyles.urlIcon}
								color={COLORS.urlBlue}
							/>
						}
					/>
				</View>
			) : null}
			{pathname.includes("friends") ? (
				<View style={styles.headerForAdditionalUrls}>
					<AdditionalUrl href="/friends/main" text="Головна" />
					<AdditionalUrl href="/friends/requests" text="Запити" />
					<AdditionalUrl href="/friends/reccomended" text="Рекомендації" />
					<AdditionalUrl href="/friends/all" text="Усі друзі" />
				</View>
			) : null}
			{pathname.includes("settings") ? (
				<View style={styles.headerForAdditionalUrls}>
					<AdditionalUrl
						href="/settings/personalInformation"
						text="Особиста інформація"
					/>
					<AdditionalUrl href="/settings/albums" text="Альбоми" />
				</View>
			) : null}
		</View>
	);
}
