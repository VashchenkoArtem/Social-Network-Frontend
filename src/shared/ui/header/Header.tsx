import { View } from "react-native";
import { COLORS } from "shared/constants/colors";
import { LogoIcon, PlusIcon, ManageIcon } from "../icons/buttons";
import { ExitIcon } from "../icons/buttons/ExitIcon";
import { styles } from "./styles"
import { Button } from "../button";


export function Header(){
    return (
        <View style={styles.header}>
            <LogoIcon color={COLORS.plum} width={145} height={18}></LogoIcon>
            <View style={styles.buttons}>
                <Button
                    variant="white"
                    iconLeft={<PlusIcon color={COLORS.plum} style={styles.icon} />}
                ></Button>
                <Button
                    variant="white"
                    iconLeft={<ManageIcon color={COLORS.plum} style={styles.icon} />}
                ></Button>
                <Button
                    variant="white"
                    iconLeft={<ExitIcon color={COLORS.plum} style={styles.icon} />}
                ></Button>
            </View>
        </View>
    )
}