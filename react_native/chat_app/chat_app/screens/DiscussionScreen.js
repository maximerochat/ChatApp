import {View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList} from 'react-native';
import { Stack, useRouter } from "expo-router";
import {useState, useEffect} from "react";
import { useNavigation } from "expo-router";
import {connect} from "react-redux";
import {create_new_conv, fetch_conv, get_auto_complete, remove_conv} from "../actions/queries";
import {main_style} from "../styles/main_style";
import {modal_style} from "../styles/modal_style";
import {formatDate} from "../utils/utils";
import {discussions_style} from "../styles/discussions_style";
import Discussion from "../components/Discussion";


const DiscussionScreen = ({navigation, isAuthenticated}) => {
    if (!isAuthenticated)
            navigation.navigate("Login");

    const [conversations, setConversations] = useState([]);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedConv, setSelectedConv] = useState(true);

    // formatDate("2023-05-20T15:30:00")
    const [modalVisible, setModalVisible] = useState(false);
    const fetchAutocompleteSuggestions = async () => {
        const sugge = await get_auto_complete(query);
        setSuggestions(sugge);
    };

    const handleInputChange = (value) => {
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
        navigation.navigate("Chat", {
                conv_id: conv_id
            })
    };


    const newConvEvent = async () => {
        console.log(query);
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

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    const data = [
        {
            conv_id: 0,
            lastMessage: "Ceci est le dernier message reçu",
            receivers: "Maxime",
            timestamp: "19:04"
        },
        {
            conv_id: 0,
            lastMessage: "Ceci est le dernier message reçu",
            receivers: "Maxime",
            timestamp: "19:04"
        },
        {
            conv_id: 0,
            lastMessage: "Ceci est le dernier message reçu",
            receivers: "Maxime",
            timestamp: "19:04"
        }
    ];

    const renderConv = ({item}) => {


            return (<Discussion
                key={item.conv_id}
                conv_id={item.conv_id}
                lastMessageText={item.lastMessage}
                receiverName={item.receivers}
                timeStamp={item.timestamp}
                onClick={onDiscClick}
                selected={selectedConv === item.conv_id}
                onDelete={deleteConv}
            />
        );
    }

    return (
        <View style={styles.mainContainer} >
            <View style={styles.sidebar}>

                <FlatList
                    data={conversations}
                    renderItem={renderConv}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={discussions_style.flatListDiscussion}
                />


                <TouchableOpacity
                    style={discussions_style.newConvButton}
                    onPress={() => {setModalVisible(true)}}
                >
                    <Text style={discussions_style.buttonText}>New Conversation</Text>
                </TouchableOpacity>
            </View>



            <Modal
                visible={modalVisible} animationType="slide" transparent
            >
                <View style={main_style.modal_container} >
                    <View style={main_style.modal_inner}>
                        <View style={main_style.modal_header}>
                            <Text style={styles.modalTitle}>Choose recipient</Text>
                            <TouchableOpacity
                                style={main_style.closeButtonText}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text >&times;</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[main_style.modalBody]}>
                            <TextInput
                                style={modal_style.text_input}
                                value={query}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.suggestionList}>
                                {suggestions.map((suggestion) => (
                                    <TouchableOpacity
                                        key={suggestion}
                                        style={styles.autoSuggestion}
                                        onPress={() => handleSuggestionClick(suggestion)}
                                    >
                                        <Text>{suggestion}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <TouchableOpacity
                                style={[modal_style.buttons, main_style.button_color]}
                                onPress={() => {
                                    console.log("submited")
                                    newConvEvent();
                                    refresh();
                                }}
                            >
                                <Text style={{color: "white", textAlign: "center"}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignContent: "center"
    },
    sidebar: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignContent: "center"
        // Other sidebar styles
    },
    convContainer: {
        // Conversation container styles
    },
    button: {
        // Button styles
    },
    buttonText: {
        // Button text styles
    },
    chatContainer: {
        flex: 1,
        // Other chat container styles
    },
    modalContainer: {
        flex: 1,
        // Other modal container styles
    },
    modalTitle: {
        // Modal title styles
    },
    closeButton: {
        // Close button styles
    },
    closeButtonText: {
        // Close button text styles
    },
    modalBody: {
        // Modal body styles
    },
    input: {
        // Input styles
    },
    suggestionList: {
        // Suggestion list styles
    },
    autoSuggestion: {
        // Auto suggestion styles
    },
    submitButton: {
        // Submit button styles
    },
});
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {})(DiscussionScreen);