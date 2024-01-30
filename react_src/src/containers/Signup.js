import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {signup} from "../actions/auth";
import axios from "axios";

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        re_password: ""
    });

    const {first_name, last_name ,email, password , re_password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=https://maximerochat.ch/chat_app`);
            window.location.replace(res.data.authorization_url);
        } catch (e) {

        }
    }


    if (isAuthenticated) {
        return <Navigate replace to="/chat_app/" />
    }
    if (accountCreated) {
        return <Navigate replace to="/chat_app/login" />
    }

    return (
        <div className="container mt-5">
            <h1>Sign Up</h1>
            <p>Create your account</p>
            <form onSubmit={e => {onSubmit(e)}}>
                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           placeholder="First Name*"
                           name="first_name"
                           value={first_name}
                           onChange={e => onChange(e)}
                           required
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           placeholder="Last Name*"
                           name="last_name"
                           value={last_name}
                           onChange={e => onChange(e)}
                           required
                    />
                </div>
                <div className="form-group">
                    <input type="email"
                           className="form-control"
                           placeholder="Email*"
                           name="email"
                           value={email}
                           onChange={e => onChange(e)}
                           required
                    />
                </div>
                <div className="form-group">
                    <input type="password"
                           className="form-control"
                           placeholder="Password*"
                           name="password"
                           value={password}
                           onChange={e => onChange(e)}
                           minLength="6"
                           required
                    />
                </div>
                <div className="form-group">
                    <input type="password"
                           className="form-control"
                           placeholder="Confirm Password*"
                           name="re_password"
                           value={re_password}
                           onChange={e => onChange(e)}
                           minLength="6"
                           required
                    />
                </div>
                <button className="btn btn-primary" type="submit">Sign Up</button>
            </form>
            <button className="btn btn-danger mt-3" onClick={continueWithGoogle} >
                Continue With Google
            </button>
            <p className="mt-3">
                Already have an account ? <Link to="/login">Sign In</Link>
            </p>

        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);