import {StyleSheet} from "react-native";

export const message_style = StyleSheet.create({
    messageContainer: {
        justifyContent: "space-between",
        alignContent: "flex-start",
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        color: "white",
        width: "65%",
    },
    bg_blue: {
        backgroundColor: "blue"
    },
    bg_white: {
        backgroundColor: "white"
    },
    timeStamp: {
        position: "absolute",
        top: 5,
        right: 10
    },
    text_white: {
        color: "white"
    },
    text_black: {
        color: "black"
    }

})
