import {StyleSheet} from "react-native";

export const main_style = StyleSheet.create({
    default_container: {
        flex: 1, alignItems: 'center', justifyContent: "center", width: "100%"
    },
    space_around: {justifyContent: "space-around"},
    space_between: {justifyContent: "space-between"},
    space_evenly: {justifyContent: "space-evenly"},
    justify_center: {justifyContent: "center"},
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
        borderRadius: 5,
        width: "80%",
    },
    pb_10: {
        paddingBottom: 10
    },
    pt_10: {
        paddingTop: 10
    },
    modal_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal_inner: {
        width: "80%",
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5
    },
    modal_header: {
        paddingBottom: 5,
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: "black"
    },
    closeButtonText: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "flex-end",
        position: "absolute",
        top: -10,
        right: 0,
        width: 60,
        height: 25
    },
    modalBody: {
        paddingTop: 20,
        justifyContent:"center",
        alignContent: "center",
        gap: 0
    },
    button_color: {
        backgroundColor: "blue"
    },
});