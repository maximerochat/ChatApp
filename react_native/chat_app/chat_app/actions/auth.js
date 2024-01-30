import axios from "axios";
import {LOGIN_SUCCESS,
    LOGIN_FAILED,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAILED,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    LOGOUT
} from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";


export const load_user = () => async dispatch => {
    if (await AsyncStorage.getItem("access")){
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${await AsyncStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };
        try {
            const res = await axios.get(`${Config.REACT_APP_API_URL}/auth/users/me/`, config);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        })
    }

};

export const googleAuthenticate = (state, code) => async dispatch => {

    if (state && code) {
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        const details = {
            "state": state,
            "code": code
        };


        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' +
            encodeURIComponent(details[key])).join("&");


        try {
            const res = await axios.post(`${Config.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`,formBody, config);

            // const res = await axios.post(`${Config.REACT_APP_API_URL}/auth/o/google-oauth2/`, formData, config);


            dispatch({
               type: GOOGLE_AUTH_SUCCESS,
               payload: res.data
            });
            dispatch(load_user())
        } catch (err) {
            dispatch({
                type: GOOGLE_AUTH_FAIL
            });
        }
    }
};
export const checkAuthenticated = () => async dispatch => {
    if (await AsyncStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        const body = JSON.stringify({
            token: null
        });

        try {
            const res = await axios.post(`${Config.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};


export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({email, password});

    try {

        const res = await axios.post(`${Config.REACT_APP_API_URL}/auth/jwt/create/`,
            body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAILED
        });
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ email });
    try {
        const res = await axios.post(`${Config.REACT_APP_API_URL}/auth/users/reset_password/`,
            body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {

        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
} ;

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        const res = await axios.post(`${Config.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
            body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {

        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }

};

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ first_name, last_name, email, password, re_password });
    try {
        const res = await axios.post(`${Config.REACT_APP_API_URL}/auth/users/`,
            body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {

        dispatch({
            type: SIGNUP_FAILED
        });
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ uid, token });
    try {
        await axios.post(`${Config.REACT_APP_API_URL}/auth/users/activation/`,
            body, config);

        dispatch({
            type: ACTIVATION_SUCCESS
        });
    } catch (err) {

        dispatch({
            type: ACTIVATION_FAILED
        });
    }
};

export const logout = () => async dispatch => {
  dispatch({
      type: LOGOUT
  });
};