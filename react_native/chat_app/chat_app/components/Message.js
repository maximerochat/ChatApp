import React, { useState } from "react";

import {Text, View} from "react-native";
import {message_style} from "../styles/components_style/message_style"

const Message = (props) => {


    return (
        <View style={[message_style.messageContainer, props.blue ? message_style.bg_blue : message_style.bg_white]}>
            <Text style={props.blue ? message_style.text_white : message_style.text_black}>{props.username}</Text>
            <Text style={props.blue ? message_style.text_white : message_style.text_black}>{props.content}</Text>
            <Text style={[message_style.timeStamp, props.blue ? message_style.text_white : message_style.text_black]}>{props.timestamp}</Text>
        </View>
    );
};



export default Message;