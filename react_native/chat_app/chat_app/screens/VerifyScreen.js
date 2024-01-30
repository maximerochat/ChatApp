import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from "expo-router";
import {useState} from "react";
import { useNavigation } from "expo-router";
import {verify} from "../actions/auth";


const VerifyScreen = ({navigation}) => {
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        // TODO verify(uid, token);
        setVerified(true);
    };

    return (
        <View style={styles.container}>

        </View>
    )
}

export default VerifyScreen;