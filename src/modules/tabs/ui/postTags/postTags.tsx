import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { COLORS } from "@shared/constants/colors";
import { useGetTagsQuery, useCreateTagMutation } from '@modules/tabs/api/tagsApi'; 
import { ICONS } from '@shared/ui';

interface PostTagsProps {
    selectedTags: string[];
    onToggleTag: (tagName: string) => void;
}

export const PostTags = ({ selectedTags, onToggleTag }: PostTagsProps) => {
    const { data: tags = [], isLoading } = useGetTagsQuery();
    const [createTag, { isLoading: isCreatingTag }] = useCreateTagMutation();
    
    const [isAdding, setIsAdding] = useState(false);
    const [newTagName, setNewTagName] = useState('');

    const handleAction = async () => {
        if (!isAdding) {
            setIsAdding(true);
            return;
        }

        const trimmed = newTagName.trim().replace('#', '');
        if (trimmed) {
            try {
                const result = await createTag({ name: trimmed }).unwrap();
                onToggleTag(result.name);
                setNewTagName('');
                setIsAdding(false);
            } catch (error) {
                console.error("Failed to create tag:", error);
            }
        } else {
            setIsAdding(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Теги</Text>
            <View style={styles.tagWrapper}>
                <View style={styles.tagWrapper}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color={COLORS.plum} />
                    ) : (
                        tags.map((tag) => {
                            const isSelected = selectedTags.includes(tag.name);
                            return (
                                <TouchableOpacity
                                    key={tag.id}
                                    style={[styles.tag, isSelected && styles.tagSelected]}
                                    onPress={() => onToggleTag(tag.name)}
                                >
                                    <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
                                        #{tag.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })
                    )}

                    <View style={styles.inputRow}>
                        {isAdding && (
                            <View style={styles.inputContainer}>
                                <Text style={styles.hashSymbol}>#</Text>
                                <TextInput
                                    style={styles.input}
                                    autoFocus
                                    value={newTagName}
                                    onChangeText={setNewTagName}
                                    onSubmitEditing={handleAction}
                                    placeholder="назва"
                                    placeholderTextColor={COLORS.gray}
                                />
                            </View>
                        )}

                        <TouchableOpacity 
                            style={[
                                styles.actionBtn, 
                                isAdding && newTagName.length > 0 && styles.actionBtnActive
                            ]} 
                            onPress={handleAction}
                            disabled={isCreatingTag}
                        >
                            {isCreatingTag ? (
                                <ActivityIndicator size="small" color={COLORS.white} />
                            ) : (
                                <ICONS.PlusIcon
                                    fill={isAdding && newTagName.length > 0 ? COLORS.white : COLORS.plum} 
                                    width={16} 
                                    height={16} 
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        color: COLORS.gray,
        marginBottom: 8,
        fontWeight: '500',
    },
    tagWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 8,
    },
    scrollContent: {
        alignItems: 'center',
        paddingRight: 20,
    },
    tag: {
        backgroundColor: COLORS.lightestGray,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    tagSelected: {
        backgroundColor: COLORS.plum,
        borderColor: COLORS.plum,
    },
    tagText: {
        color: COLORS.black,
        fontSize: 14,
    },
    tagTextSelected: {
        color: COLORS.white,
        fontWeight: '600',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.foggy,
        borderRadius: 15,
        paddingHorizontal: 10,
        height: 32,
        borderWidth: 1,
        borderColor: COLORS.plum,
        marginRight: 8,
    },
    hashSymbol: {
        color: COLORS.plum,
        fontWeight: 'bold',
        marginRight: 2,
    },
    input: {
        fontSize: 14,
        padding: 0,
        minWidth: 60,
        color: COLORS.black,
    },
    actionBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.preWhite,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    actionBtnActive: {
        backgroundColor: COLORS.plum,
        borderColor: COLORS.plum,
    },
    actionBtnText: {
        fontSize: 20,
        color: COLORS.plum,
        fontWeight: 'bold',
        lineHeight: 24,
    },
    whiteText: {
        color: COLORS.white,
    },
});