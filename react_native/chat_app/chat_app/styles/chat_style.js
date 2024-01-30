import {StyleSheet} from "react-native";

export const chat_style = StyleSheet.create({
    title: {
        fontSize: 22, fontWeight: "bold"
    }, default_container: {
        flex: 1, alignItems: 'center', justifyContent: "center", width: "100%"
    },
    text_input: {
        width: '80%',
        height: 40,
        borderWidth: 1,

        borderRadius: 5,
        paddingLeft: 10
    },
    buttons: {
        padding: 10,
        marginTop: 10,
        borderRadius: 5
    },
    sendButton: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        borderRadius: 25,
        width: 50,
        height: 50

    },
    chatInputContainer: {
        width: "100%",
        padding: 10,
        position: "absolute",
        bottom: 5,
        left: 0,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 5
    },
    chatInput: {
        flex: 6,
        borderWidth: 2,
        borderColor: "black"

    },
    messageContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: 80
    },
    individualMessageContainer: {
        padding: 5,
        width: "100%",

        justifyContent: "center"
    },
    leftMessage: {
        alignItems: "flex-start",
    },
    rightMessage: {
        alignItems: "flex-end",
    }

})
