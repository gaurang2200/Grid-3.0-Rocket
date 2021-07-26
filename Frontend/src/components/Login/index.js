import React, { Component } from 'react';
import axios from 'axios';
import './login.css'

// const BASE_URL = "http://192.168.198.172:8080"

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            errMessage: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleErrMessage = this.handleErrMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        });
    };

    handleErrMessage = (message) => {
        this.setState({
            errMessage: message
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let {username, password} = this.state;
        const axiosOptions = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        axios.post(
            `/api/auth/login`,
            {
                username: username,
                password: password
            },
            axiosOptions
        ).then(res => {
            window.location = '/dashboard';
        }).catch(err => {
            this.handleErrMessage(err.response.data.message)
        })
    }


    render() {
        const {errMessage} = this.state;
        return (
            <div className="bodyContainer">
                <div className="container">
                    <div id="imagebg"></div>
                    <div id="detailsbg">
                        <form onSubmit={this.handleSubmit}>
                            <div id="details">
                                <h1 className="loginHeading">Login</h1>
                                <label className="inputBlock">
                                    <span>Username</span>
                                    <input className="w-full" type="text" name="username" required={true}
                                    value={this.state.username} onChange={this.handleChange} 
                                    placeholder="hackingguy"/>
                                </label>
                                <label className="inputBlock ">
                                    <span>Password</span>
                                    <input className="w-full" type="password" name="password" required={true}
                                    value={this.state.password} onChange={this.handleChange} 
                                    placeholder="**********"/>
                                </label>
                            </div>
                            <div className="errInfo">{errMessage}</div>
                            <input type="submit" value="Log in" className="w-full buttonStyle" />
                        </form>
                        <p className="margin1">
                            <a href="/register" className="links">Create Account</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login