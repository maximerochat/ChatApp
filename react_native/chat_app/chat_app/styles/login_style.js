import {StyleSheet} from "react-native";

export const login_style = StyleSheet.create({
    title: {
        fontSize: 22, fontWeight: "bold"
    },
    default_container: {
        flex: 1, alignItems: 'center', justifyContent: "center", width: "100%"
    },
    text_input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
        paddingLeft: 10
    },
    buttons: {
        padding: 10,
        marginTop: 10,
        borderRadius: 5
    },
    button_color: {
        backgroundColor: "blue"
    },
    pb_10: {
        paddingBottom: 10
    },
    link_style: {
        color: "rgba(0,25,49,0.78)"
    },
    bottom_link_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        gap: 5
    }
})

style = {}