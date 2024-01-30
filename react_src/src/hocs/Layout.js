import React, { useEffect } from "react";
import Navbar from "../components/Navbar"
import {connect} from "react-redux";
import {checkAuthenticated, load_user, googleAuthenticate } from "../actions/auth";
import {useLocation} from "react-router-dom";


const Layout = (props) => {
    let location = useLocation();

    useEffect(() => {

        const params = new URLSearchParams(location.search);
        const state = params.get("state") ? params.get("state") : null;
        const code = params.get("code") ? params.get("code") : null;

        if (state && code && !(localStorage.getItem("access") && localStorage.getItem("refresh"))) {
            props.googleAuthenticate(state, code);
        } else {
            props.checkAuthenticated();
            props.load_user();
        }
    }, [location]);



    return (
        <div>
            <Navbar/>
            {props.children}
        </div>
    );
};
export default connect(null, {checkAuthenticated, load_user, googleAuthenticate})(Layout);