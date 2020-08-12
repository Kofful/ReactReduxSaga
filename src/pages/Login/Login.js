import React, {Component} from "react";
import "./Login.sass";
import {loginAction} from "../../actions/actionCreators";
import connect from "react-redux/es/connect/connect";

const yup = require("yup");


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            emailIsValid: 0,
            passwordIsValid: 0
        };
        this.checkEmailValidity = this.checkEmailValidity.bind(this);
        this.checkPasswordValidity = this.checkPasswordValidity.bind(this);
    }

    render() {
        return (
            <div className="Home">
                <div className={"login"}>
                    <label>Login</label>
                </div>
                <div className={"input-label"}>
                    <label htmlFor={"email"}>EMAIL ADDRESS</label>
                    <input autoComplete="off" id={"email"}
                           className={this.state.emailIsValid === false ? "Login-input-invalid" : "Login-input-valid"}
                           onChange={this.checkEmailValidity}
                           value={this.state.email}>

                    </input>
                </div>
                <div className={"input-label"}>
                    <label htmlFor={"password"}>PASSWORD</label>
                    <input type={"password"} autoComplete="off" id={"password"}
                           className={this.state.passwordIsValid === false ? "Login-input-invalid" : "Login-input-valid"}
                           onChange={this.checkPasswordValidity}
                           value={this.state.password}>

                    </input>
                </div>
                <button onClick={() => this.props.loginAction({...this.state})} className={(this.state.emailIsValid && this.state.passwordIsValid) ?
                        "Login-button" : "button"
                }>LOGIN</button>
                <div className={"container"}>
                    <label className={"not-a-member"}>Not a member yet?</label>
                </div>
                <div className={"container"}><a className={"create-account"} href={"/register"}>Create an Account</a>
                </div>
            </div>
        )
    }

    checkEmailValidity(e) {
        const {value} = e.target;
        yup.object().shape({
            email: yup.string()
                .email()
                .min(1)
                .trim()
        })
            .isValid({email: value})
            .then((response) => {
                response === false ?
                    this.setState({email: value, emailIsValid: false}) :
                    this.setState({email: value, emailIsValid: true})

            });
    }

    checkPasswordValidity(e) {
        const {value} = e.target;
        yup.object().shape({
            password: yup.string()
                .min(8)
                .trim()
        })
            .isValid({password: value})
            .then((response) => {
                 response === false ?
                     this.setState({password: value, passwordIsValid: false}) :
                     this.setState({password: value, passwordIsValid: true})
            });
    }


    componentDidMount() {

    }
}

const mapDispatchToProps = (dispatch) => ({
    loginAction: (data) => dispatch(loginAction(data))
});

export default connect(null, mapDispatchToProps)(Login);