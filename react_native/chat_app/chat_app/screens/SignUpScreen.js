import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {signup_style} from "../styles/signup_style";
import {main_style} from "../styles/main_style";


import {signup} from "../actions/auth";
import {connect} from "react-redux";

const SignUpScreen = ({ signup, isAuthenticated, navigation }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
    });
    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = () => {
        if (password === re_password) {
            // Perform signup logic here
            signup(first_name, last_name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    const continueWithGoogle = async () => {
        try {
            // const res = await axios.get(
            //     `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=https://maximerochat.ch/chat_app`
            // );
            // window.location.replace(res.data.authorization_url);
        } catch (e) {
            // Handle error
        }
    };

    if (accountCreated) {
        navigation.navigate("Login");
    }

    return (
        <View style={[signup_style.default_container, main_style.pb_10, main_style.pt_10]}>

            <Text>Create your account</Text>
            <View style={[signup_style.innerContainer]}>
                <TextInput
                    style={main_style.text_input}
                    placeholder="First Name*"
                    value={first_name}
                    onChangeText={(value) => onChange('first_name', value)}
                />
                <TextInput
                    style={main_style.text_input}
                    placeholder="Last Name*"
                    value={last_name}
                    onChangeText={(value) => onChange('last_name', value)}
                />
                <TextInput
                    style={main_style.text_input}
                    placeholder="Email*"
                    value={email}
                    onChangeText={(value) => onChange('email', value)}
                    autoCapitalize="none"
                />
                <TextInput
                    style={main_style.text_input}
                    placeholder="Password*"
                    value={password}
                    onChangeText={(value) => onChange('password', value)}
                    secureTextEntry
                />
                <TextInput
                    style={main_style.text_input}
                    placeholder="Confirm Password*"
                    value={re_password}
                    onChangeText={(value) => onChange('re_password', value)}
                    secureTextEntry
                />
                <TouchableOpacity style={[main_style.buttons, signup_style.button_color]} onPress={onSubmit}>
                    <Text style={{ color: 'white', width: "100%", textAlign: "center" }}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10, marginTop: 10 }} onPress={continueWithGoogle}>
                    <Text style={{ color: 'red' }}>Continue With Google</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ marginTop: 10, color: 'blue' }}>Already have an account? <Text onPress={() => navigation.navigate("Login")}>Sign In</Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(SignUpScreen);