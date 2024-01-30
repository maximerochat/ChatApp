import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Activate from "./containers/Activate";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Layout from "./hocs/Layout";

import { Provider} from "react-redux";
import store from "./store";
import Chat from "./containers/Chat";
import Chat2 from "./containers/Chat2";
import CallPage from "./containers/CallPage";

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route path='/chat_app/' element={<Home />}/>
                    <Route path='/chat_app/login' element={<Login />}/>
                    <Route path='/chat_app/signup' element={<Signup />}/>
                    <Route path='/chat_app/reset-password' element={<ResetPassword />}/>
                    <Route path='/chat_app/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />}/>
                    <Route path='/chat_app/activate/:uid/:token' element={<Activate />}/>
                    <Route path="/chat_app/chat" element={<Chat />} />
                    <Route path="/chat_app/chat2" element={<Chat2 />} />
                    <Route path="/chat_app/call" element={<CallPage />} />
                </Routes>
            </Layout>
        </Router>
    </Provider>

);


export default App;