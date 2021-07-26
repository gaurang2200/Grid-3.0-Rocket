import React, {Component} from 'react';
import axios from 'axios';
// import {Redirect} from 'react-router-    dom'
import '../Login/login.css';
import './register.css';
import '../Regex';


function validate(username, password, confirmPassword){
    if( username.length === 0){
        return "Username Cannot be Empty"
    } else if(password.length === 0){
        return "Password Cannot be Empty"
    } else if(password !== confirmPassword){
        return "Please make sure the passwords match"
    }
    return "";
}


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            errMessage: "",
            signup: false
        };
        this.handleErrMessage = this.handleErrMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        let {username, password, confirmPassword} = this.state;

        let message = validate(username, password, confirmPassword);
        this.setState({
            errMessage: message
        });
        if(message.length > 0){
            return;
        }
        const axiosOptions = {
            headers: { "Content-Type": "application/json" }
        };

        axios.post(
            `/api/auth/register`,
            {
                username: username,
                password: password
            },
            axiosOptions
        ).then((res) => {
            window.location = '/login';
        }).catch(err => {
            this.handleErrMessage(err.response.data.message)
        });
    }


    render(){
        // this.state.signup?<Redirect to={{pathname: '/dashboard'}}/>:<p />

        const { errMessage } = this.state
        return (
            <div className="bodyContainer">
                <div className="container1">
                    <div id="imagebg1"></div>
                    <div id="detailsbg">
                        <form onSubmit={this.handleSubmit}>
                            <div id="details">
                                <h1 className="loginHeading">Register</h1>
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
                                <label className="inputBlock ">
                                    <span>Confirm Password</span>
                                    <input className="w-full" type="password" name="confirmPassword" required={true}
                                    value={this.state.confirmPassword} onChange={this.handleChange}
                                    placeholder="**********"/>
                                </label>
                            </div>
                            <div className="errInfo">{errMessage}</div>
                            <input type="submit" value="Register" className="w-full buttonStyle" />
                        </form>
                        <p className="margin1">
                            <a href="./login" className="links">Already have an account?</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register