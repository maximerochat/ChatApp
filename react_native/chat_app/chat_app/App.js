import React from 'react';
import {Provider} from 'react-redux';
import store from "./store";
import AppNavigator from "./naviguation/AppNavigator";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import {SafeAreaView, View, Text} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";




const App = () => {
    const Stack = createNativeStackNavigator();


    return (
        <Provider store={store}>

            <NavigationContainer>
                <AppNavigator/>
                {/*<Stack.Navigator>*/}
                {/*    <Stack.Screen name="Home" component={HomeScreen} />*/}
                {/*    <Stack.Screen name="Login" component={LoginScreen} />*/}
                {/*</Stack.Navigator>*/}
            </NavigationContainer>
        </Provider>

    );
};

export default App;