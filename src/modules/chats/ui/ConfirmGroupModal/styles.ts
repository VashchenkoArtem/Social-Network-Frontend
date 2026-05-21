import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@shared/constants/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
    // Базові стилі для самої обгортки react-native-modal
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    // Біле вікно модалки, що виїжджає знизу й займає більшу частину екрана
    container: {
        backgroundColor: COLORS.foggy,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 30,
        height: SCREEN_HEIGHT * 0.85, // Оптимальна висота за дизайном
    },
    // Кнопка закриття (хрестик) у верхньому правому кутку
    closeBtn: {
        alignSelf: "flex-end",
        padding: 4,
    },
    closeBtnText: {
        fontSize: 18,
        color: COLORS.black,
        fontWeight: "500",
    },
    // Заголовок модалки "Нова група"
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.black,
        textAlign: "center",
        marginBottom: 16,
    },
    // Лічильник "Вибрано: Х"
    selectedCount: {
        fontSize: 14,
        color: COLORS.gray,
        fontWeight: "500",
        marginTop: 12,
        marginBottom: 8,
    },
    // Рядок літери-заголовка у SectionList (А, Б, В...)
    sectionHeader: {
        fontSize: 15,
        fontWeight: "600",
        color: COLORS.gray,
        backgroundColor: COLORS.foggy,
        paddingVertical: 6,
        marginTop: 6,
    },
    // Контейнер рядка одного друга
    friendRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: COLORS.lightestGray,
    },
    // Інформація про друга (аватар + ім'я) всередині рядка
    friendInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    // Зображення аватарки
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    // Кругла заглушка, якщо у користувача немає аватарки
    placeholderAvatar: {
        backgroundColor: COLORS.lightestGray,
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        color: COLORS.gray,
        fontSize: 15,
        fontWeight: "600",
    },
    // Текст імені друга
    friendName: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.black,
    },
    // Кастомний круглий чекбокс для першої модалки
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: COLORS.lightGray,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxSelected: {
        backgroundColor: COLORS.plum,
        borderColor: COLORS.plum,
    },
    checkboxCheckmark: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: "bold",
    },
    // Нижня панель для кнопок навігації
    footerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginTop: "auto", // Притискає кнопки до самого низу контейнера
        paddingTop: 12,
    },
    // Базовий клас для кнопок
    btn: {
        flex: 1,
        height: 48,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    // Кнопка "Скасувати" / "Назад"
    btnCancel: {
        backgroundColor: COLORS.lightestGray,
    },
    btnCancelText: {
        color: COLORS.gray,
        fontSize: 16,
        fontWeight: "600",
    },
    // Кнопка "Далі" / "Створити групу"
    btnNext: {
        backgroundColor: COLORS.plum,
    },
    btnNextText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "600",
    },
    // Стан заблокованої кнопки, якщо нікого не вибрано
    btnDisabled: {
        backgroundColor: COLORS.lightGray,
        opacity: 0.7,
    },
});