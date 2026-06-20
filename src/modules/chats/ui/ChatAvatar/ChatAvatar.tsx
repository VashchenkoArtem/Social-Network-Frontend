import { View, Image, Text } from "react-native";
import { IProps } from "./types";
import { CLOUDINARY_URL, SERVER } from "@shared/constants/server";
import { COLORS } from "@shared/constants/colors";
import { styles } from "../ConfirmGroupModal/styles";
import { getAvatar } from "@shared/utils/avatar";

export function ChatAvatar(props: IProps){
    const { avatar, isGroup, groupName } = props
    if (isGroup){
        if (avatar && avatar !== "default-group-avatar.png"){
            return (<Image
                source={{ uri: `${CLOUDINARY_URL}${avatar}` }}
                style={{ width: 46, height: 46, borderRadius: 123, backgroundColor: COLORS.lightestGray }}
                />)
        }else{
            return (<View style={[styles.avatar, { width: 46, height: 46, borderRadius: 30, backgroundColor: COLORS.plum, justifyContent: "center", alignItems: "center" }]}>
                        <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: "bold" }}>
                            {groupName ? groupName[0].toUpperCase() : "NG"}
                        </Text>
                    </View>)
        }
    } else {
        return (
            <Image
                source={{ uri: avatar ? avatar : getAvatar(avatar) }}
                style={{ width: 46, height: 46, borderRadius: 123, backgroundColor: COLORS.lightestGray }}
            />
        )
    }
}