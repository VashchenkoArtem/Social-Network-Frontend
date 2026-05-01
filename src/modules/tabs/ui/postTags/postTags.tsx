import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { COLORS } from "@shared/constants/colors";
import { useGetTagsQuery, useCreateTagMutation } from '@modules/tabs/api/tagsApi'; 
import { ICONS } from '@shared/ui';
import { styles } from './styles'
import { Button } from '@shared/ui/button';

interface PostTagsProps {
    selectedTags: number[];
    onToggleTag: (tagId: number) => void;
}

export const PostTags = ({ selectedTags, onToggleTag }: PostTagsProps) => {
    const { data: tags = [], isLoading } = useGetTagsQuery(undefined, { pollingInterval: 5000});
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
                onToggleTag(result.id);
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
            <View style={styles.tagWrapper}>
                <View style={styles.tagWrapper}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color={COLORS.plum} />
                    ) : (
                        tags.map((tag) => {
                            const isSelected = selectedTags.includes(tag.id);

                            return (
                                <TouchableOpacity
                                    key={tag.id}
                                    style={[styles.tag, isSelected && styles.tagSelected]}
                                    onPress={() => onToggleTag(tag.id)}
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
                                <ActivityIndicator size="small" color={COLORS.white}/>
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

