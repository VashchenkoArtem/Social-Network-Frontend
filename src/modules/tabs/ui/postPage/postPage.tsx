import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from "@shared/constants/colors";
import { CreatePostModal } from '../createPostModal/createPostModal';

export const PostContent = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.createPostBar}>
                    <Text style={styles.placeholderText}>Що у вас нового?</Text>
                    <TouchableOpacity 
                        style={styles.postBtn}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.postBtnText}>Створити пост</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.emptyList}>
                    <Text style={styles.emptyText}>Тут з'являться ваші публікації</Text>
                </View>
            </ScrollView>

            <CreatePostModal 
                visible={isModalVisible} 
                onClose={() => setModalVisible(false)} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.foggy,
    },
    scrollContent: {
        padding: 16,
    },
    createPostBar: {
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 2,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    placeholderText: {
        color: COLORS.gray,
        fontSize: 14,
    },
    postBtn: {
        backgroundColor: COLORS.plum,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
    },
    postBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 13,
    },
    emptyList: {
        marginTop: 50,
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.gray,
        fontSize: 16,
    }
});