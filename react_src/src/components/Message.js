import React, { useState } from "react";
import "../css_src/message.css";


const Message = (props) => {


    return (
        <div className={`inner-message-container ${props.blue ? "blue" : ""}`}>
            <div className={`message-header ${props.blue ? "blue-header": ""}`}>{props.username}</div>
            <p className={"message-content"}>{props.content}</p>
            <div className={"time-stamp-text"}>{props.timestamp}</div>
        </div>
    );
};



export default Message;