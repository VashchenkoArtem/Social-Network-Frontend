import React, { useState } from 'react';
import { 
    Modal, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, 
    KeyboardAvoidingView, 
    Platform 
} from 'react-native';
import { PostTags } from '../postTags/postTags';
import { PostLinks } from '../postLinks/postLinks';
import { useCreatePostMutation } from '@modules/tabs/api/postApi'; 
import { COLORS } from "@shared/constants/colors";

interface CreatePostModalProps {
    visible: boolean;
    onClose: () => void;
}

export const CreatePostModal = ({ visible, onClose }: CreatePostModalProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [links, setLinks] = useState<string[]>(['']);

    const [createPost, { isLoading }] = useCreatePostMutation();

    const handleToggleTag = (tagName: string) => {
        setSelectedTags(prev => 
            prev.includes(tagName) 
                ? prev.filter(t => t !== tagName) 
                : [...prev, tagName]
        );
    };

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) return;

        try {
            await createPost({
                title: title.trim(),
                content: content.trim(),
                topic: "General",
                tagNames: selectedTags,
                urls: links.filter(l => l.trim() !== '')
            }).unwrap();

            setTitle('');
            setContent('');
            setSelectedTags([]);
            setLinks(['']);
            onClose();
        } catch (err) {
            console.error("Виникла помилка при публікації:", err);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Створення поста</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.closeIcon}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                            <Text style={styles.label}>Заголовок</Text>
                            <TextInput 
                                placeholder="Введіть назву..." 
                                placeholderTextColor={COLORS.gray}
                                style={styles.input} 
                                value={title}
                                onChangeText={setTitle} 
                            />

                            <PostTags 
                                selectedTags={selectedTags} 
                                onToggleTag={handleToggleTag} 
                            />

                            <Text style={styles.label}>Контент</Text>
                            <TextInput 
                                placeholder="Про що ви думаєте?" 
                                placeholderTextColor={COLORS.gray}
                                multiline 
                                style={[styles.input, styles.textArea]} 
                                value={content}
                                onChangeText={setContent} 
                            />

                            <PostLinks 
                                links={links} 
                                setLinks={setLinks} 
                            />

                            <TouchableOpacity 
                                style={[styles.publishBtn, isLoading && { opacity: 0.7 }]} 
                                onPress={handlePublish}
                                disabled={isLoading}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.publishBtnText}>
                                    {isLoading ? "Публікація..." : "Опублікувати"}
                                </Text>
                            </TouchableOpacity>
                            
                            <View style={{ height: 20 }} />
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(7, 10, 28, 0.4)',
        justifyContent: 'flex-end',
    },
    keyboardView: {
        width: '100%',
    },
    container: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 20,
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    closeIcon: {
        fontSize: 20,
        color: COLORS.gray,
        padding: 5,
    },
    scroll: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: COLORS.gray,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: COLORS.foggy,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: COLORS.lightestGray,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    publishBtn: {
        backgroundColor: COLORS.plum,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: COLORS.plum,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    publishBtnText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});