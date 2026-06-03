import { COLORS } from "@shared/constants/colors";
import { getAvatar } from "@shared/utils/avatar";
import { View, Image, Text } from "react-native";
import { IProps } from "./types";
import { styles } from "./styles";
import { SERVER } from "@shared/constants/server";

export function SmallUserCard(props: IProps){
    const { avatar, username, signature } = props
    return (
        <View style={{ flex: 1, padding: 16, flexDirection: "row",justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <View>
                <Image
                    source={{ uri: getAvatar(avatar) }}
                    style={{ width: 46, height: 46, borderRadius: 123, backgroundColor: COLORS.gray }}
                />
                <View style = {styles.contactStatus}/>
                <Text style = {styles.name}>{username}</Text>
            </View>
            { signature && 
            <Image style={styles.authorSignature} source={{
                uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${signature}`
            }}/>}
        </View>
    )
}