import { IMessage } from "@shared/types/message.types";
import { IMessageProps } from "./message.types";
import { styles } from "./styles";
import { View, Text, Image, FlatList } from "react-native";
import { useUserContext } from "@modules/auth/context/user-context";
import { MessageStatusMarkIcon } from "@shared/ui/icons/urls/MessageStatusMark";
import { SERVER } from "@shared/constants/server";
import { COLORS } from "@shared/constants/colors";

export function Message(props: IMessageProps) {
    const { data } = props
    const { user } = useUserContext()!
    const createdDate = new Date(data.created_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
    return (
        <View>
            { user.id === data.sender_id ? (
                <View style = {{width: "100%", alignItems: "flex-end"}}>
                    <View style={styles.message}>
                        <View style={styles.messageContainer}>
                            <Text style={styles.text}>{data.text}</Text>
                            <View style={styles.messageInfoContainer}>
                                <Text style={styles.sendTime}>{createdDate}</Text>
                                <MessageStatusMarkIcon width={10} height={10} color = {COLORS.gray}/>             
                            </View>
                        </View>
                        {data.chat_app_messageimage &&
                            data.chat_app_messageimage.length > 0 && (
                                <FlatList
                                    style ={{gap: 10}}
                                    data={data.chat_app_messageimage}
                                    keyExtractor={(item) => String(item.id)}
                                    renderItem={(item)=>{
                                        return <View>
                                            <Image
                                                source={{ uri: item.item.image.startsWith("file:///") ? item.item.image :  `http://${SERVER.host}:${SERVER.port}/media/thumb/${item.item.image}`}}
                                                width = {200} height = {200} style = {{borderRadius: 5}}
                                            ></Image>
                                        </View>
                                    }}
                                />
                            )
                        }
                    </View>
                </View>
            )
            : (
                <View style = {{ width: "100%", justifyContent: "flex-start", flexDirection: "row", gap: 4}}>
                    <Image source={{
                        uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${data.user_app_user.profile_app_profile.avatar}`
                    }} width={46} height = {46} style = {{ borderRadius: 123, marginTop: 8, backgroundColor: COLORS.gray}}/>
                    
                    <View style={styles.notMyMessageContainer}>
                        <Text style = {styles.username}>{data.user_app_user.profile_app_profile.pseudonym}</Text>
                        <View style = {{flexDirection: "row", gap: 10}}>
                            <Text style={styles.text}>{data.text}</Text>
                            <View style={styles.messageInfoContainer}>
                                <Text style={styles.sendTime}>{createdDate}</Text>
                                <MessageStatusMarkIcon color={COLORS.gray} />    
                            </View>
                        </View>
                        {data.chat_app_messageimage &&
                            data.chat_app_messageimage.length > 0 && (
                                <FlatList
                                    style ={{gap: 10}}
                                    data={data.chat_app_messageimage}
                                    keyExtractor={(item, index) =>
                                            `${item.id}-${index}`
                                        }
                                    renderItem={(item)=>{
                                        return <View>
                                            <Image
                                                source={{ uri: item.item.image.startsWith("file:///") ? item.item.image :  `http://${SERVER.host}:${SERVER.port}/media/thumb/${item.item.image}`}}
                                                width = {200} height = {200} style = {{borderRadius: 5}}
                                            ></Image>
                                        </View>
                                    }}
                                />
                            )
                        }
                    </View>
                </View>
            )
        }

        </View>
    )
}