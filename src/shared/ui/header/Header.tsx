import { View } from "react-native";
import { LogoIcon, PlusIcon, ManageIcon } from "../icons/buttons";
import { ExitIcon } from "../icons/buttons/ExitIcon";
import { styles } from "./styles"
import { Button } from "../button";
import { COLORS } from "@shared/constants/colors";
import { HeaderProps } from "./types";
import { push } from "expo-router/build/global-state/routing";
import { Link } from "expo-router";


export function Header(props: HeaderProps){
    const { cantCreatePost, isAuth } = props
    if (isAuth){
        return (
            <View style = {styles.headerWithLogo}>
                <LogoIcon color={COLORS.plum} width={145} height={18}></LogoIcon>
            </View>
        )
    }
    return (
        <View style={styles.header} >
            <LogoIcon color={COLORS.plum} width={145} height={18}></LogoIcon>
            <View style={styles.buttons}>
                {!cantCreatePost &&
                    <Button
                        variant="white"
                        iconLeft={<PlusIcon color={COLORS.plum} style={styles.icon} />}
                    ></Button>
                }
                <Button
                    variant="white"
                    iconLeft={<ManageIcon color={COLORS.plum} style={styles.icon} />}
                    onPress={() => push("/settings")}
                ></Button>
                <Button
                    variant="white"
                    iconLeft={<ExitIcon color={COLORS.plum} style={styles.icon} />}
                    onPress={() => push("/login")}
                ></Button>
            </View>
        </View>
    )
}