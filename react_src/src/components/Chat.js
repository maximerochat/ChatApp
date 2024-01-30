import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {get_messages} from "../actions/queries";
import "../css_src/chat_comp.css"
import Message from "./Message";
import {getHour} from "../utils/utils";

const Chat = (props) => {

    if (!props.conv_id) {
        return (
            <div>
                <p>select a conversation</p>
            </div>
        )
    }

    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (socket) {
            socket.close();
            setSocket(null);
            setMessages([])
        }
        // Get the username from local storage or prompt the user to enter it
        const request = `${localStorage.getItem("access")}&${props.conv_id}`;
        // Connect to the WebSocket server with the username as a query parameter
        const newSocket = new WebSocket(`ws://92.242.187.25/ws/chat/${request}`);
        setSocket(newSocket);

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            newSocket.close();
        };
    }, [props.conv_id]);

    const fetch_messages = async () => {
        setMessage("");
        const messages_received = await get_messages(props.conv_id);
        if (messages_received) {
            messages_received.forEach((m) => {
                setMessages((prevMessages) => [...prevMessages, m]);
            })

        }
    }

    useEffect(() => {
        if (socket) {
           fetch_messages()
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, data]);
            };
        }
    }, [socket]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (message!=="" && socket) {
            console.log(message)
            const data = {
                message: message,
                username: props.username,
            };
            socket.send(JSON.stringify(data));
            setMessage("");
        }
    };

    return (
        <div className={"inner-chat-container"}>
            <div className="chat-header"><h4>{props.receivers}</h4></div>
            <div>
                <div className="message-container">
                    {messages.map((message, index) => (

                        <div className={message.username === props.username ? "message-right": "message-left"}>
                            <Message
                                content={message.message}
                                username={message.username}
                                timestamp={getHour(message.timestamp)}
                                blue={message.username === props.username}
                            />
                        </div>
                    ))}
                </div>

                <form className={"message-bar"} onSubmit={handleSubmit}>
                    <input
                        className={"input-message"}
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <button className={"send-message-button"} type="submit"><img className={"send-icon"} src="/static/images/send.png" alt="send-image"/></button>
                </form>
            </div>
        </div>
    );
}


export default Chat;
