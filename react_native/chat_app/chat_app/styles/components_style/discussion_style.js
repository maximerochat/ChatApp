import {StyleSheet} from "react-native";

export const discussion_style = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "space-between",
        alignContent: "center",
        padding: 5,
        width: "100%",
        borderTopWidth: 1,
        minHeight: 65
    },
    headerContainer: {
        width: "100%",
        paddingHorizontal: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignContent: "space-between"
    },
    text: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",

    },
    headerRight: {
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row",
        gap: 20
    }

})
