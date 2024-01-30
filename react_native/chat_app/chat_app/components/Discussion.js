import React, { useState } from "react";
import {remove_conv} from "../actions/queries";
import {Text, TouchableOpacity, View} from "react-native";
import {discussion_style} from "../styles/components_style/discussion_style";


const Discussion = (props) => {
    const deleteConv = (event) => {
        event.stopPropagation();
        props.onDelete(props.conv_id);
    }

    const cardClickHandler = () => {

        props.onClick(props.conv_id);

    };

    return (

        <TouchableOpacity style={discussion_style.wrapper} onPress={cardClickHandler}>
            <View style={discussion_style.headerContainer}>
                <Text>{props.receiverName}</Text>
                <View style={discussion_style.headerRight}>
                    <Text>{props.timeStamp}</Text>
                    <TouchableOpacity onPress={deleteConv}>
                        <Text aria-hidden="true">&times;</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={discussion_style.text}>
                <Text>{props.lastMessageText? props.lastMessageText : "New conversation"}</Text>
            </View>
        </TouchableOpacity>
    );
};



export default Discussion;