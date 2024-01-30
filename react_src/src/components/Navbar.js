import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {logout} from "../actions/auth";
import {connect} from "react-redux";

const Navbar = ({ logout, isAuthenticated }) => {
    const guestLinks = () => (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/chat_app/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/chat_app/signup">Sign Up</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <li className="nav-item">
            <a className="nav-link" href="#!" onClick={logout}>Logout</a>
        </li>
    );


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/chat_app/">Chat App</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/chat_app/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        {isAuthenticated ? authLinks() : guestLinks()}
                        <li className="nav-item active">
                            <Link className="nav-link" to="/chat_app/chat2">Conversations</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/chat_app/call">Call</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);