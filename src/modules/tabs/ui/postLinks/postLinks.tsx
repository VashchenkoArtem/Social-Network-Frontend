import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from "@shared/constants/colors";
import { PlusIcon } from '@shared/ui/icons/buttons';

interface PostLinksProps {
    links: string[];
    setLinks: (links: string[]) => void;
}

export const PostLinks = ({ links, setLinks }: PostLinksProps) => {
    
    const addLinkField = () => setLinks([...links, '']);

    const updateLink = (text: string, index: number) => {
        const newLinks = [...links];
        newLinks[index] = text;
        setLinks(newLinks);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Посилання</Text>
            {links.map((link, index) => (
                <View key={index} style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder="https://example.com"
                        placeholderTextColor={COLORS.gray}
                        value={link}
                        onChangeText={(text) => updateLink(text, index)}
                        autoCapitalize="none"
                        keyboardType="url"
                    />
                    
                    {index === links.length - 1 && (
                        <TouchableOpacity 
                            onPress={addLinkField} 
                            style={[
                                styles.plusBtn,
                                link.trim().length > 0 && styles.plusBtnActive
                            ]}
                            activeOpacity={0.7}
                        >
                            <PlusIcon 
                                fill={link.trim().length > 0 ? COLORS.white : COLORS.plum} 
                                width={16} 
                                height={16} 
                            />
                        </TouchableOpacity>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: COLORS.gray,
        marginBottom: 8,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.foggy,
        borderBottomWidth: 1.5,
        borderColor: COLORS.lightGray,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        color: COLORS.black,
        fontSize: 14,
    },
    plusBtn: {
        marginLeft: 12,
        backgroundColor: COLORS.preWhite,
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    plusBtnActive: {
        backgroundColor: COLORS.plum,
        borderColor: COLORS.plum,
    },
});