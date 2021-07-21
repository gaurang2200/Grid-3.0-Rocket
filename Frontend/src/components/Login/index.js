import React, { Component } from 'react';
import { render } from 'react-dom';
import './login.css'

class Login extends Component {
    render() {
        return (
        <div className="bodyContainer">
            <div className="container">
                <div id="imagebg"></div>
                <div id="detailsbg">
                    <div id="details">
                        <h1 className="loginHeading">Login</h1>
                        <label className="inputBlock">
                            <span>Email</span>
                            <input className="w-full" type="email" placeholder="janedoe@gmail.com"/>
                        </label>
                        <label className="inputBlock ">
                            <span>Password</span>
                            <input className="w-full" type="password" placeholder="**********"/>
                        </label>
                    </div>
                    <a href='../dashboard' className="w-full buttonStyle">Log in</a>

                    <p className="margin1">
                        <a href="./forgot-password" className="links">Forgot your password?</a>
                    </p>
                    <p className="margin2">
                        <a href="../register" className="links">Create Account</a>
                    </p>
                </div>
            </div>
        </div>
        )
    }
}

export default Login