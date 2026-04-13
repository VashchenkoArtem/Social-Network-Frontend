import { COLORS } from "@shared/constants/colors";
import { Modal } from "@shared/ui/modal";
import { TouchableOpacity, View, Text } from "react-native";

export function SignatureModal(){
    return (
        <Modal
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
        >
            <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 60 }}>
                <TouchableOpacity 
                    onPress={() => setModalVisible(false)} 
                    style={{ 
                        paddingHorizontal: 20, 
                        paddingVertical: 10, 
                        alignSelf: 'flex-end',
                        marginBottom: 10
                    }}
                >
                    <Text style={{ 
                        color: COLORS.plum,
                        fontSize: 18, 
                        fontWeight: '700' 
                    }}>
                        Закрити
                    </Text>
                </TouchableOpacity>
                
                <SignatureEditor 
                    onOK={handleSaveSignature} 
                    onClear={() => console.log('Canvas cleared')} 
                />
            </View>
        </Modal>
    )
}