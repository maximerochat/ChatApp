import React, { useState } from "react";
import {Navigate, useParams} from "react-router-dom";
import {remove_conv} from "../actions/queries";
import "./discussion.css";


const Discussion = (props) => {
    const deleteConv = (event) => {
        event.stopPropagation();
        props.onDelete(props.conv_id);
    }

    const cardClickHandler = () => {
        props.onClick(props.conv_id);
    };

    return (

        <div className={`card ${ props.selected ? "selected-conv" : ""}`} onClick={cardClickHandler} >
            <div className="card-header card-header-layout">
                <div>{props.receiverName}</div>
                <div className={"inner-header"}>
                    <div>{props.timeStamp}</div>
                    <button style={{zIndex: 10, position: "relative"}} type="button" onClick={deleteConv} className="close close-style">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">{props.lastMessageText? props.lastMessageText : "New conversation"}</p>
            </div>
        </div>
    );
};



export default Discussion;