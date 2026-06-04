import { View, Text } from "react-native"
import { styles } from "./styles"

export function UnreadMessages(props: {count: number | undefined, top?: number, right?: number}){
    const { count, top, right } = props
    if (!count) return
    if (count > 0){
        return(
            <View style={[styles.badgeContainer, {top: top || -5, right: right || -5}]}>
                <Text style={styles.badgeText}>
                    {count > 99 ? "99+" : count}
                </Text>
            </View>
        )
    }
}