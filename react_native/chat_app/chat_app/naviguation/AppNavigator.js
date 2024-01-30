import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DiscussionView from "../screens/DiscussionScreen";
import DiscussionScreen from "../screens/DiscussionScreen";
import ChatScreen from "../screens/ChatScreen";


const AppNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                headerShown: true,
            },
        },
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                headerShown: false,
            },
        },
        SignUp: {
            screen: SignUpScreen,
            navigationOptions: {
                headerShown: true,
            },
        },
        Discussion: {
            screen: DiscussionScreen,
            navigationOptions: {
                headerShown: true
            }
        },
        Chat: {
            screen: ChatScreen,
            navigationOptions: {
                headerShown: true
            },
        }
    },
    {
        initialRouteName: 'Home',
    }
);

export default createAppContainer(AppNavigator);