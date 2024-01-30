import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import axios from "axios";

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();

      login(email, password);
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=https://maximerochat.ch/chat_app`);
            window.location.replace(res.data.authorization_url);
        } catch (e) {

        }
    };

    if (isAuthenticated) {
        return <Navigate replace to="chat_app/" />
    }

    return (
      <div className="container mt-5">
          <h1>Sign In</h1>
          <p>Sign into your account</p>
          <form onSubmit={e => {onSubmit(e)}}>
              <div className="form-group">
                  <input type="email"
                    className="form-control"
                         placeholder="Email"
                         name="email"
                         value={email}
                         onChange={e => onChange(e)}
                         required
                  />
              </div>
              <div className="form-group">
                  <input type="password"
                         className="form-control"
                         placeholder="Password"
                         name="password"
                         value={password}
                         onChange={e => onChange(e)}
                         minLength="6"
                         required
                  />
              </div>
              <button className="btn btn-primary" type="submit">Login</button>
          </form>
          <button className="btn btn-danger mt-3" onClick={continueWithGoogle} >
              Continue With Google
          </button>
          <p className="mt-3">
              Don't have an account <Link to="/chat_app/signup">Sign Up</Link>
          </p>
          <p className="mt-3">
              Forgot your password ? <Link to="/chat_app/reset-password">Reset Password</Link>
          </p>
      </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login  })(Login);