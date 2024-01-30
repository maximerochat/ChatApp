import {FlatList, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {chat_style} from "../styles/chat_style";
import {useEffect, useRef, useState} from "react";
import Message from "../components/Message";
import {get_messages} from "../actions/queries";
import {connect} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {formatDate} from "../utils/utils";
import Config from "react-native-config";

const ChatScreen = ({navigation, username, isAuthenticated}) => {
    if (!isAuthenticated) {
        navigation.navigate("Login");
    }

    const [currentMessage, setCurrentMessage] = useState("");

    const [socket, setSocket] = useState(null);
    // const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const conv_id = (navigation.getParam("conv_id"))





    // messages.reverse();

    const renderMessage = ({ item }) => {



        return (
            <View
                style={[chat_style.individualMessageContainer, item.username === username ? chat_style.rightMessage : chat_style.leftMessage]}>
                <Message
                    content={item.message}
                    username={item.username}
                    timestamp={formatDate(item.timestamp)}
                    blue={item.username === username}
                />
            </View>
        );
    }

    let newSocket = null;
    const connectWs = async (set) => {
        // .replace(/\./g, "")
        const r = (await AsyncStorage.getItem("access"));
        const request = `${r}&${conv_id}`;
        // Connect to the WebSocket server with the username as a query parameter
        newSocket = new WebSocket(`${Config.REACT_APP_WS_URL}/ws/chat/${request}`);
        set(newSocket);
    }

    useEffect(() => {
        if (socket) {
            socket.close();
            setSocket(null);
            setMessages([])
        }
        // Get the username from local storage or prompt the user to enter it
        connectWs(setSocket);

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            if (newSocket)
                newSocket.close();
        };
    }, [conv_id]);

    useEffect(() => {
        if (socket) {
            fetch_messages()
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setMessages((prevMessages) => [data, ...prevMessages]);
            };
        }
    }, [socket]);



    const fetch_messages = async () => {
        setCurrentMessage("");
        const messages_received = await get_messages(conv_id);
        if (messages_received) {

            messages_received.forEach((m) => {
                setMessages((prevMessages) => [m, ...prevMessages]);
            })

        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (currentMessage!=="" && socket) {
            const data = {
                message: currentMessage,
                username: username,
            };
            socket.send(JSON.stringify(data));
            setCurrentMessage("");
        }
    };

    return (
        <View style={chat_style.default_container}>
            <Text>Chat Page</Text>

            <View style={chat_style.messageContainer}>
                <FlatList


                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={<View style={{ flex: 1 }} />}
                    ListEmptyComponent={<View style={{ flex: 1 }} />}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start'}}
                    inverted

                />


            </View>



            <View style={chat_style.chatInputContainer}>
                <TextInput
                    style={[chat_style.text_input, chat_style.chatInput]}
                    placeholder={"Votre Message"}
                    value={currentMessage}
                    onChangeText={(t) => setCurrentMessage(t)}
                />
                <TouchableOpacity style={chat_style.sendButton} onPress={handleSubmit}>
                    {/*<Text style={{textAlign: "center"}}>Image</Text>*/}
                    <Image source={require("../assets/send.png")} style={{ resizeMode: "contain", width: 40, marginLeft: 5}} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.user ? state.auth.user.first_name : null
});

export default connect(mapStateToProps, {})(ChatScreen);