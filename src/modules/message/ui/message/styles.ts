import { StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";

export const styles = StyleSheet.create({
    // Моё сообщение — пузырь
    myMessage: {
        backgroundColor: COLORS.lightGray,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
        maxWidth: 220,
    },

    // Чужое сообщение — строка с аватаром
    theirMessageRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 4,
    },

    // Чужое сообщение — пузырь
    theirMessage: {
        borderWidth: 1,
        borderColor: COLORS.preWhite,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 6,
        maxWidth: 220,
        gap: 4,
    },

    // Текст + время в одну строку (только текст без картинок)
    textWithTime: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-end",
        gap: 6,
    },

    text: {
        fontSize: 14,
        fontWeight: "400",
        color: COLORS.black,
        flexShrink: 1,
    },

    messageInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        // Прижимаем время вниз при inline отображении
        marginBottom: -1,
    },

    sendTime: {
        fontSize: 10,
        color: COLORS.gray,
    },

    // Аватар чужого пользователя
    avatar: {
        borderRadius: 123,
        marginTop: 8,
        backgroundColor: COLORS.lightestGray,
    },

    username: {
        fontSize: 11,
        color: COLORS.plum,
    },

    // Контейнер строки картинок (для моих сообщений, grid-подобный)
    imageContainer: {
        flexDirection: "row",
        gap: 5,
        marginTop: 4,
    },

    // Маленький квадратный thumbnail (мои сообщения)
    imageThumb: {
        width: 100,
        height: 100,
        borderRadius: 6,
    },

    // Полное фото (чужие сообщения)
    imageFull: {
        width: 200,
        height: 200,
        borderRadius: 5,
        marginTop: 4,
    },
});