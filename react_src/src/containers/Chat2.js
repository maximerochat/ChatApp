import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import Discussion from "../components/Discussion";
import Chat from "../components/Chat"
import {formatDate} from "../utils/utils";
import {create_new_conv, fetch_conv, get_auto_complete, remove_conv} from "../actions/queries";
import {logout} from "../actions/auth";
import "./chat_page.css";

function Chat2({username, isAuthenticated}) {
    if (!isAuthenticated) {
        return <Navigate replace to="chat_app/login" />
    }


    const [conversations, setConversations] = useState([]);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedConv, setSelectedConv] = useState(null);

    // formatDate("2023-05-20T15:30:00")

    const fetchAutocompleteSuggestions = async () => {
        const sugge = await get_auto_complete(query);
        setSuggestions(sugge);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
    };

    useEffect(() => {
        if (query) {
            fetchAutocompleteSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setSuggestions([]);
    };

    const onDiscClick = (conv_id) => {
        setSelectedConv(conv_id);
    };

    useState(() => {

    }, [selectedConv]);


    const newConvEvent = async (e) => {
        e.preventDefault();
        create_new_conv(query);
        // const temp_conv = [...conversations];
        // const res = await fetch_conv(temp_conv, setConversations);
        // setConversations(res);

    };

    const refresh = async () => {
        const temp_conv = [...conversations];
        const res = await fetch_conv(temp_conv, setConversations);
        if (res)
            setConversations(res);
        else
            setConversations([]);
    }

    const deleteConv = (conv_id) => {
        remove_conv(conv_id);
        if (selectedConv === conv_id)
            setSelectedConv(null);
    }

    useEffect(() => {

        refresh();
        const interval = setInterval(async () => {

            refresh();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={"main-container"}>

                <div className="sidebar" >
                    <div className={"conv-container"}>
                        {conversations.map((d) =>(
                            <Discussion
                                key={d.conv_id}
                                conv_id={d.conv_id}
                                lastMessageText={d.lastMessage}
                                receiverName={d.receivers}
                                timeStamp={formatDate(d.timestamp)}
                                onClick={onDiscClick}
                                selected={selectedConv === d.conv_id}
                                onDelete={deleteConv}
                            />
                        ))}
                    </div>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                        New Conversation
                    </button>
                </div>
                <div className="chat-container" >
                     <Chat
                        conv_id={selectedConv}
                        username={username}
                        receivers={conversations.find((c) => c.conv_id === selectedConv) ?
                            conversations.find((c) => c.conv_id === selectedConv).receivers : ""}
                     />

                </div>

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Choose recipient</h5>
                                <button type="button" className="close close-button" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Recipient</label>
                                        <input type="text" onChange={handleInputChange} value={query} className="form-control" id="exampleInputPassword1" />
                                        <ul className="list-group suggestion-list">
                                            {suggestions.map((suggestion) => (

                                                    <li className="list-group-item auto-suggestion" key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                                                        {suggestion}
                                                    </li>


                                            ))}
                                        </ul>
                                    </div>
                                    <button type="submit" onSubmit={refresh} onClick={newConvEvent} data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
        </div>

    );
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.user ? state.auth.user.first_name : null
});
export default connect(mapStateToProps, {})(Chat2);