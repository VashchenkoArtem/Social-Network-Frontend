import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
export { styles } from './styles'

export function FriendProfile() {
    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
                flexGrow: 1,
            }}
        >
            <View>
                
            </View>
        </KeyboardAwareScrollView>
    )
}