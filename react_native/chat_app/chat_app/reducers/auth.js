import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_FAILED,
    SIGNUP_SUCCESS,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAILED,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    LOGOUT
} from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
    access: null,
    refresh: null,
    isAuthenticated: null,
    user: null
}

const retrieveData = async (state) => {
    try {
        const access = await AsyncStorage.getItem('access');
        const refresh = await AsyncStorage.getItem('refresh');

        if (access && refresh) {
            return {
                ...state,
                isAuthenticated: true,
                access,
                refresh
            };
        }

        return {
            ...state,
            isAuthenticated: false,
            access: null,
            refresh: null,
            user: null
        };;
    } catch (error) {
        // Error retrieving data
        return {
            ...state,
            isAuthenticated: false,
            access: null,
            refresh: null,
            user: null
    }
    }
}

const logoutUser = async (state) => {


    return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null
    }
}



export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            AsyncStorage.setItem("access", payload.access);
            return {
                ...state, isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case GOOGLE_AUTH_SUCCESS:
            AsyncStorage.setItem("access", payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case GOOGLE_AUTH_FAIL:
            return retrieveData(state);

        case LOGIN_FAILED:
        case SIGNUP_FAILED:
        case LOGOUT:
            AsyncStorage.removeItem("access");
            AsyncStorage.removeItem("refresh");
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }

        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAILED:
        case PASSWORD_RESET_CONFIRM_FAIL:
            return {
                ...state
            }

        default:
            return state
    }
}
