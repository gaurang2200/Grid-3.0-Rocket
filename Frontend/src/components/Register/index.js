import React, {Component} from 'react';
import '../Login/login.css'
import './register.css'
import '../Regex'
import { validEmail } from '../Regex';


function validate(email, password, confirmPassword){
    if(password !== confirmPassword){
        return "Please make sure the passwords match"
    } else if( !validEmail.test(email)){
        return "Enter a Valid Email"
    } else if(password.length === 0){
        return "Password Cannot be Empty"
    }
    return '';
}


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            errMessage: ""
        };
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


    handleSubmit = (e) => {
        e.preventDefault();
        let {email, password, confirmPassword} = this.state;

        let message = validate(email, password, confirmPassword);
        if(message.length > 0){
            this.state.errMessage = message;
            console.log(message)
            return;
        }
        
        
        // if(this.state.errMessage !== ""){
        //     return;
        // }

        // let { email, password } = this.state;
        // console.log("sending reqest", email, password);
        // const requestOptions = {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         email: email,
        //         password: password,
        //     }),
        // }; 
        
    }


    render(){
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
                                    <span>Email</span>
                                    <input className="w-full" type="email" name="email"
                                    value={this.state.email} onChange={this.handleChange} 
                                    placeholder="janedoe@gmail.com"/>
                                </label>
                                <label className="inputBlock ">
                                    <span>Password</span>
                                    <input className="w-full" type="password" name="password"
                                    value={this.state.password} onChange={this.handleChange} 
                                    placeholder="**********"/>
                                </label>
                                <label className="inputBlock ">
                                    <span>Confirm Password</span>
                                    <input className="w-full" type="password" name="confirmPassword"
                                    value={this.state.confirmPassword} onChange={this.handleChange} 
                                    placeholder="**********"/>
                                </label>
                            </div>
                            {
                                <div className="errInfo">{errMessage}</div>
                            }
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