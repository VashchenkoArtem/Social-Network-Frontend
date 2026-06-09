import { COLORS } from "@shared/constants/colors";
import { getAvatar } from "@shared/utils/avatar";
import { View, Image, Text } from "react-native";
import { IProps } from "./types";
import { styles } from "./styles";
import { SERVER } from "@shared/constants/server";
import { UnreadMessages } from "../unreadMessages/UndreadMessages";
import { ChatAvatar } from "@modules/chats/ui/ChatAvatar/ChatAvatar";

export function SmallUserCard(props: IProps){
    const { avatar, pseudonym, signature, isPadding, lastMessage, time, unreadCount, isGroup, groupName } = props

    return (
        <View style={[{ width: "100%",alignItems: "flex-start" }, isPadding && {paddingHorizontal: 16,paddingTop: 16 }]}>
            <View style = {{flex: 1, flexDirection: 'row', alignItems: "center", gap: 10}}>
                <View>
                    { isGroup && groupName
                        ? <ChatAvatar groupName={groupName} avatar={avatar} isGroup={isGroup}/>
                        : <Image
                            source={{ uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${avatar}` }}
                            style={{ width: 46, height: 46, borderRadius: 123, backgroundColor: COLORS.lightestGray }}
                        /> 
                    }
                    
                    <UnreadMessages count={unreadCount} top={0} right={0.5}/>
                    { !isGroup && 
                        <View style = {styles.contactStatus}/>
                    }
                </View>
                <View style = {{flex: 1, justifyContent: "center"}}>
                    <View style = {{ flexDirection: "row",flex: 1, justifyContent: "space-between", alignItems: "center"}}>
                        <Text style = {styles.name}>{pseudonym}</Text>
                        { lastMessage && time && (
                            <Text style = {{ fontWeight: 400, color: COLORS.gray, fontSize: 12}}>{new Date(time).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            })}</Text>
                        )}
                    </View>
                    { lastMessage && (
                        <Text style={styles.lastMessage}>
                            {lastMessage}
                        </Text>
                    )}
                </View>

            </View>
            { signature && 
                <Image style={styles.authorSignature} source={{
                    uri: `http://${SERVER.host}:${SERVER.port}/media/thumb/${signature}`
                }}/>
            }
        </View>
    )
}