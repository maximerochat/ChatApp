import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from "expo-router";
import {useState} from "react";
import { useNavigation } from "expo-router";
import {connect} from "react-redux";
import {login} from "../actions/auth";
import {checkAuthenticated, load_user} from "../actions/auth";


const HomeScreen = ({navigation, isAuthenticated}) => {

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    checkAuthenticated()
    load_user()

    return (
        <View style={styles.container}>
            <View style={styles.jumbotron}>
                <Text style={styles.title}>Welcome to my chat app</Text>
                <Text style={styles.description}>
                    This is a super app that will allow users to have chat in real-time
                </Text>
                <View style={styles.separator} />
                {isAuthenticated ? (
                    <View>
                        <Text>Click the button to start conversations</Text>
                        <TouchableOpacity style={styles.button} onPress={() => console.log('Chat Now pressed')}>
                            <Text style={styles.buttonText}>Chat Now</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <Text>Click the button to login</Text>
                        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View>
                    <Text>Click the button to start conversations</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Discussion")}>
                        <Text style={styles.buttonText}>Chat Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Chat")}>
                        <Text style={styles.buttonText}>Chat View</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    jumbotron: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: "black"
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    separator: {
        borderBottomWidth: 1,
        width: '100%',
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {})(HomeScreen);