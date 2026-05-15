import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from "@shared/constants/colors";
import { PlusIcon } from '@shared/ui/icons/buttons';
import {styles } from './styles'

interface PostLinksProps {
    links: string[];
    setLinks: (links: string[]) => void;
}

export const PostLinks = ({ links, setLinks }: PostLinksProps) => {

    const safeLinks = links.length ? links : [""];

    const addLinkField = () => setLinks([...safeLinks, ""]);

    const updateLink = (text: string, index: number) => {
        const newLinks = [...safeLinks];
        newLinks[index] = text;
        setLinks(newLinks);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Посилання</Text>

            {safeLinks.map((link, index) => (
                <View key={index} style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder="https://example.com"
                        value={link}
                        autoCapitalize="none"
                        onChangeText={(text) => updateLink(text, index)}
                    />

                    {index === safeLinks.length - 1 && (
                        <TouchableOpacity onPress={addLinkField} style={styles.plusBtn}>
                            <PlusIcon width={15} height={15} color={COLORS.plum} />
                        </TouchableOpacity>
                    )}
                </View>
            ))}
        </View>
    );
};

