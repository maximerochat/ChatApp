import axios from "axios";
import {USER_LOADED_FAIL, USER_LOADED_SUCCESS} from "./types";


export const create_new_conv = async (other_username) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };

        let data = new FormData()
        data.append("username", other_username)
        // const body = JSON.stringify({"username": "test"});

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/create-conv/`, data, config);
        } catch (err) {
        }
};

export const fetch_conv = async (known_conv, set) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${localStorage.getItem("access")}`,
            "Accept": "application/json"
        }
    };

    try {
        let res = await axios.get(`${process.env.REACT_APP_API_URL}/api/query-conv/`, config);

        if (res.data.conversations.length > known_conv.length) {
            res.data.conversations.forEach((c) => {
                if (!known_conv.find(c2 => c2.conv_id === c.conv_id)) {
                    known_conv.push(c);
                }
            });

        } else if (res.data.conversations.length < known_conv.length) {
            known_conv.forEach(c => {
                if (!res.data.conversations.find(c2 => c2.conv_id === c.conv_id))  {
                    let index =  known_conv.indexOf(c);
                    known_conv.splice(index, 1);
                }
            });

        } else {
            return null;
        }
        return known_conv;
    } catch (err) {
        return known_conv;
    }
};


export const get_auto_complete = async (query) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/query-users/${query}`, config);
        if (res.data)
            return res.data.username_list;
        return [""]
    } catch (err) {
        return ["empty"];
    }
};

export const remove_conv = async (conv_id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${localStorage.getItem("access")}`,
            "Accept": "application/json"
        }
    };

    try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/remove-conv/${conv_id}`, config);

    } catch (err) {

    }
}

export const get_messages = async (conv_id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${localStorage.getItem("access")}`,
            "Accept": "application/json"
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-messages/${conv_id}`, config);
        if (res.data.length === 0)
            return null;
        return res.data.messages;

    } catch (err) {

    }
    return null;
}