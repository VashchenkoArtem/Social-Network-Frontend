import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { IAlbumData } from "./types";
import { styles } from "./styles";

interface AlbumsModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: IAlbumData) => void;
    initialData?: IAlbumData | null;
}

export const AlbumsModal = ({ visible, onClose, onSubmit, initialData }: AlbumsModalProps) => {
    const [showThemes, setShowThemes] = useState(false);
    const [showYears, setShowYears] = useState(false);

    const availableThemes = ["Природа", "Архітектура", "Подорожі", "Настрій", "Сім'я"];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (currentYear - i).toString());

    const { control, handleSubmit, reset, setValue, watch, formState: { isValid } } = useForm<IAlbumData>({
        defaultValues: {
            name: "",
            theme: "",
            year: ""
        },
        mode: "onChange"
    });

    const selectedTheme = watch("theme");
    const selectedYear = watch("year");

    useEffect(() => {
        if (visible) {
            reset(initialData || { name: "", theme: "", year: "" });
            setShowThemes(false);
            setShowYears(false);
        }
    }, [initialData, visible, reset]);

    const handleFormSubmit = (data: IAlbumData) => {
        onSubmit(data);
        onClose();
    };

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
                        <Controller
                            control={control}
                            name="name"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <Input 
                                    label="Назва альбому" 
                                    value={value} 
                                    onChangeText={onChange} 
                                    placeholder="Настрій" 
                                />
                            )}
                        />
                        
                        <Text style={styles.label}>Оберіть тему</Text>
                        <TouchableOpacity onPress={() => setShowThemes(!showThemes)}>
                            <View pointerEvents="none">
                                <Input value={selectedTheme} placeholder="Природа" editable={false} />
                            </View>
                        </TouchableOpacity>
                        
                        {showThemes && (
                            <View style={styles.dropdown}>
                                {availableThemes.map((t) => (
                                    <TouchableOpacity 
                                        key={t} 
                                        style={styles.dropdownItem} 
                                        onPress={() => {
                                            setValue("theme", t, { shouldValidate: true });
                                            setShowThemes(false);
                                        }}
                                    >
                                        <Text style={styles.dropdownText}>{t}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        <Text style={styles.label}>Рік альбому</Text>
                        <TouchableOpacity onPress={() => setShowYears(!showYears)}>
                            <View pointerEvents="none">
                                <Input value={selectedYear} placeholder="Оберіть рік" editable={false} />
                            </View>
                        </TouchableOpacity>

                        {showYears && (
                            <View style={styles.dropdown}>
                                <ScrollView style={{ maxHeight: 150 }} nestedScrollEnabled>
                                    {years.map((y) => (
                                        <TouchableOpacity 
                                            key={y} 
                                            style={styles.dropdownItem} 
                                            onPress={() => {
                                                setValue("year", y, { shouldValidate: true });
                                                setShowYears(false);
                                            }}
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
                                onPress={handleSubmit(handleFormSubmit)}
                                disabled={!isValid}
                                style={[
                                    styles.button, 
                                    styles.purple, 
                                    { opacity: isValid ? 1 : 0.5 }
                                ]}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};