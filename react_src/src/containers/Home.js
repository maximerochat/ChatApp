import React from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";

const Home = ({isAuthenticated}) => (
    <div className="container">
        <div className="jumbotron">
            <h1 className="display-4">Welcom to my chat app</h1>
            <p className="lead">This is a super app that will allow users to have chat in real-time</p>
            <hr className="my-4" />
            {isAuthenticated ?
                <div>
                    <p>Click the button to start conversations</p>
                    <p className="lead">
                        <Link className="btn btn-primary btn-lg" to="/chat2" role="button">Chat Now</Link>
                    </p>
                </div>
                :
                <div>
                <p>Click the button to login</p>
                    <p className="lead">
                        <Link className="btn btn-primary btn-lg" to="/login" role="button">login</Link>
                    </p>
                </div>
            }
        </div>
    </div>
);


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.user ? state.auth.user.first_name : null
});
export default connect(mapStateToProps, {})(Home);