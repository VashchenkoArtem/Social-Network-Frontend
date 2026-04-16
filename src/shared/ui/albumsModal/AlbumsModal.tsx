import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { useGetTagsQuery } from "@modules/auth/api/albumsApi";
import { IAlbumData } from "./types";
import { styles } from "./styles";

interface AlbumsModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: IAlbumData) => void;
    initialData?: IAlbumData | null;
}

export const AlbumsModal = ({ visible, onClose, onSubmit, initialData }: AlbumsModalProps) => {
    const [title, setTitle] = useState<string>("");
    const [theme, setTheme] = useState<string>("");
    const [year, setYear] = useState<string>("");

    const [showThemes, setShowThemes] = useState(false);
    const [showYears, setShowYears] = useState(false);

    const { data: tags = [], isLoading: isTagsLoading } = useGetTagsQuery(undefined, {
        skip: !visible,
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (currentYear - i).toString());

    useEffect(() => {
        if (visible) {
            setTitle(initialData?.title || "");
            setTheme(initialData?.theme || "");
            setYear(initialData?.year || "");
        }
    }, [initialData, visible]);

    const handleSave = () => {
        if (!title.trim() || !theme.trim() || !year.trim()) return;
        onSubmit({ title, theme, year });
        onClose();
    };

    const isFormValid = title.trim() !== "" && theme.trim() !== "" && year.trim() !== "";

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                            {initialData ? "Редагувати альбом" : "Створити альбом"}
                        </Text>
                        <TouchableOpacity onPress={onClose} hitSlop={15}>
                            <Text style={styles.closeIcon}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                        <Input 
                            label="Назва альбому" 
                            value={title} 
                            onChangeText={setTitle} 
                            placeholder="Мій альбом" 
                        />
                        
                        <Text style={styles.label}>Оберіть тему</Text>
                        <TouchableOpacity onPress={() => setShowThemes(!showThemes)} disabled={isTagsLoading}>
                            <View pointerEvents="none">
                                <Input 
                                    value={theme} 
                                    placeholder={isTagsLoading ? "Завантаження..." : "Оберіть тему"} 
                                    editable={false} 
                                />
                            </View>
                        </TouchableOpacity>
                        
                        {showThemes && (
                            <View style={styles.dropdown}>
                                {isTagsLoading ? (
                                    <ActivityIndicator size="small" style={{ padding: 10 }} />
                                ) : (
                                    tags.map((tag) => (
                                        <TouchableOpacity 
                                            key={tag.id} 
                                            style={styles.dropdownItem} 
                                            onPress={() => {setTheme(tag.name); setShowThemes(false)}}
                                        >
                                            <Text style={styles.dropdownText}>{tag.name}</Text>
                                        </TouchableOpacity>
                                    ))
                                )}
                            </View>
                        )}

                        <Text style={styles.label}>Рік альбому</Text>
                        <TouchableOpacity onPress={() => setShowYears(!showYears)}>
                            <View pointerEvents="none">
                                <Input value={year} placeholder="Оберіть рік" editable={false} />
                            </View>
                        </TouchableOpacity>

                        {showYears && (
                            <View style={styles.dropdown}>
                                <ScrollView style={{ maxHeight: 150 }} nestedScrollEnabled>
                                    {years.map((y) => (
                                        <TouchableOpacity 
                                            key={y} 
                                            style={styles.dropdownItem} 
                                            onPress={() => {setYear(y); setShowYears(false)}}
                                        >
                                            <Text style={styles.dropdownText}>{y}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}

                        <View style={styles.modalFooter}>
                            <Button 
                                variant="white" 
                                text="Скасувати" 
                                onPress={onClose} 
                                style={[styles.button, styles.white]}
                            />
                            <Button 
                                variant="purple" 
                                text="Зберегти"
                                onPress={handleSave}
                                style={[
                                    styles.button, 
                                    styles.purple, 
                                    { opacity: isFormValid ? 1 : 0.5 }
                                ]}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};