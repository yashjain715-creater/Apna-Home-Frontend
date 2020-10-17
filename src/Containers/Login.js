import React from 'react';
import Cookies from 'js-cookie';

import Header from '../Components/Navbar';
import { FormGroup, FormControl, FormLabel, Button, FormText } from 'react-bootstrap';
import { connect } from 'react-redux';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../Components/validation';
import * as actions from '../store/Actions/Actions';
import '../App.css';


class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            formData: {}, 
            errors: {}, 
            formSubmitted: false, 
            loading: false 
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;
        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }


        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        }  else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "Password's length must between 6 to 16";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    login = (e) => {

        e.preventDefault();
        const { formData } = this.state;
        let errors = this.validateLoginForm();

        if(errors === true){
            this.props.onAuth(formData.email, formData.password);
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    componentDidUpdate() {
        if(this.props.user){
            if(this.props.user.occupation === 'CO'){
                if(this.props.user.is_extra_filled === true){
                    this.props.history.push('/')
                }else {
                    this.props.history.push('/signup/extra')
                }
            }else if(this.props.user.occupation === 'CL'){
                if(this.props.user.is_extra_filled === true){
                    this.props.history.push('/')
                } else {
                    this.props.clientsignup();
                    this.props.history.push('/')
                }
            }
        }
    }

    render() {
        let errormessage = null;
        if(this.props.error) {
            errormessage = (
            <p>Invalid Email and Password</p>
            );
        }

        return (
            <div>
                <Header {...this.props} />
                <div className="auth-wrapper">
                    <div className="auth-inner-login">
                        <form onSubmit={this.login}>
                            <h3>Login</h3>
                            
                            <FormGroup controlId="email" validationstate={ this.state.formSubmitted ? (this.state.errors.email ? 'error' : 'success') : null }>
                                <FormLabel style={{fontSize:'18px'}}>Email</FormLabel>
                                <FormControl type="email" name="email" placeholder="Enter your Email" onChange={this.handleInputChange} />
                            { this.state.errors.email &&
                                <FormText className="Error-message">{this.state.errors.email}</FormText>
                            }
                            </FormGroup>
                            <FormGroup controlId="password" validationstate={ this.state.formSubmitted ? (this.state.errors.password ? 'error' : 'success') : null }>
                                <FormLabel style={{fontSize:'18px'}}>Password</FormLabel>
                                <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                            { this.state.errors.password &&
                                <FormText className="Error-message">{this.state.errors.password}</FormText>
                            }
                            </FormGroup>
                            {errormessage}
                            {
                                this.props.loading ?

                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading ...</span>
                                    </div>
                                </div>
                                :
                                <Button type="submit" className="btn btn-primary btn-block mb-3 mt-4">Login</Button>
                            }
                            <p className="forgot-password text-right"  style={{fontSize:'15px', fontWeight:'500'}}>
                                New? <a href="/signup">SignUp</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        user: state.user,
        allDetail: state.usersAllDetail,
        isAuthenticated: Cookies.get('token') !== undefined,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.authLogin(email, password)),
        clientsignup: () => dispatch(actions.extraClientSignup()),
        onTryAutoSignup: () => {
            dispatch(actions.authcheckstate());
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);