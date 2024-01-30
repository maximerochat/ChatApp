import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {connect, useDispatch} from 'react-redux';
import { login } from '../actions/auth';
import { login_style } from "../styles/login_style";

const LoginScreen = ({ login, isAuthenticated, navigation }) => {
    // const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log("clicked");
        login(email, password);
    };

    if (isAuthenticated)
        navigation.navigate("Home");

    return (
        <View style={[login_style.default_container, login_style.pb_10]}>

            <View style={[login_style.default_container]}>
                <TextInput
                    style={login_style.text_input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={login_style.text_input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={[login_style.bottom_link_container]}>
                <Text>
                    Don't have an account ?
                </Text>
                <TouchableOpacity  onPress={() => navigation.navigate("SignUp") }>
                    <Text style={login_style.link_style}>Sign Up</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login  })(LoginScreen);