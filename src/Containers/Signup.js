import React from 'react';
import Cookies from 'js-cookie';
import Header from '../Components/Navbar';
import { FormGroup, FormControl, FormLabel, FormText } from 'react-bootstrap';
import {
    Button,
    Modal,
  } from "reactstrap";
import { connect } from 'react-redux';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../Components/validation';
import * as actions from '../store/Actions/Actions';
import '../App.css';

class SignUpForm1 extends React.Component {


    state = {
        formData: {}, 
        errors: {}, 
        formSubmitted: false, 
        loading: false 
    };
    toggleModal = state => {
        this.setState({
        [state]: !this.state[state]
        });
    };

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
        if(formData.Selecttype === 'Choose ..' || formData.Selecttype === undefined) {
            errors.Selecttype = "Please choose some field"
        }

        if (isEmpty(formData.firstname)) {
            errors.firstname = "First name can't be blank";
        }

        if (isEmpty(formData.lastname)) {
            errors.lastname = "Lastname can't be blank";
        }

        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }
        if (isEmpty(formData.password1)) {
            errors.password1 = "Password can't be blank";
        }  else if (isContainWhiteSpace(formData.password1)) {
            errors.password1 = "Password should not contain white spaces";
        } else if (!isLength(formData.password1, { gte: 6, lte: 16, trim: true })) {
            errors.password1 = "Password's length must between 6 to 16";
        } else if (Number.isInteger(parseInt(formData.password1))){
            errors.password1 = "Password should not be Integer only"
        }

        if(formData.password1 !== formData.password2) {
            errors.password2 = "Passwords are not match";
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
        var selectType = 'CL';
        if(errors === true){
            if(formData.Selecttype === 'Contractor'){
                selectType = 'CO';
            }
            this.toggleModal("notificationModal");
            this.props.onAuth(formData.firstname ,formData.lastname, formData.email, formData.password1, formData.password2, selectType);
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    render() {
        let errormessage = null;
        if(this.props.error) {
            errormessage = (
            <p>Please Verify and Login</p>
            );
        }

        return (
            <div>
                <Header {...this.props} />
                <div className="auth-inner-modified">
                    <h3 className="text-color">Join ApnaHome</h3>
                    <p className="text-color mt-3">To get FREE online exposure in millions of clients</p>
                    <p className="text-color">You need to complete your Profile </p>
                </div>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={this.login}>
                            <FormLabel><h3>Register Yourself</h3></FormLabel>
                            <FormGroup controlId="Selecttype">
                                <FormLabel style={{fontSize:'18px'}}>Select</FormLabel>
                                <FormControl name="Selecttype" as="select" size="lg" onChange={this.handleInputChange} custom>
                                    <option>Choose ..</option>
                                    <option>Contractor</option>
                                    <option>Client</option>
                                </FormControl>
                                { this.state.errors.Selecttype &&
                                <FormText className="Error-message">{this.state.errors.Selecttype}</FormText>
                                }
                            </FormGroup>
                            <FormGroup controlId="firstname" validationstate={ this.state.formSubmitted ? (this.state.errors.firstname ? 'error' : 'success') : null }>
                                <FormLabel style={{fontSize:'18px'}}>First Name</FormLabel>
                                <FormControl type="text" name="firstname" size="lg" onChange={this.handleInputChange} />
                            { this.state.errors.firstname &&
                                <FormText className="Error-message">{this.state.errors.firstname}</FormText>
                            }
                            </FormGroup>
                            <FormGroup controlId="lastname" validationstate={ this.state.formSubmitted ? (this.state.errors.lastname ? 'error' : 'success') : null }>
                                <FormLabel style={{fontSize:'18px'}}>Last Name</FormLabel>
                                <FormControl type="text" name="lastname" size="lg" onChange={this.handleInputChange} />
                            { this.state.errors.lastname &&
                                <FormText className="Error-message">{this.state.errors.lastname}</FormText>
                            }
                            </FormGroup>
                            <FormGroup controlId="email" validationstate={ this.state.formSubmitted ? (this.state.errors.email ? 'error' : 'success') : null }>
                                <FormLabel style={{fontSize:'18px'}}>Email</FormLabel>
                                <FormControl type="email" name="email" size="lg" onChange={this.handleInputChange} />
                            { this.state.errors.email &&
                                <FormText className="Error-message">{this.state.errors.email}</FormText>
                            }
                            </FormGroup>
                            <FormGroup controlId="password1" validationstate={ this.state.formSubmitted ? (this.state.errors.password1 ? 'error' : 'success') : null }>
                                <FormLabel style={{fontSize:'18px'}}>Enter Password</FormLabel>
                                <FormControl type="password" name="password1" size="lg" onChange={this.handleInputChange} />
                            { this.state.errors.password1 &&
                                <FormText className="Error-message">{this.state.errors.password1}</FormText>
                            }
                            </FormGroup>
                            <FormGroup controlId="password2" validationstate={ this.state.formSubmitted ? (this.state.errors.password2 ? 'error' : 'success') : null }>
                                <FormLabel style={{fontSize:'18px'}}>Confirm Password</FormLabel>
                                <FormControl type="password" name="password2" size="lg" onChange={this.handleInputChange} />
                            { this.state.errors.password2 &&
                                <FormText className="Error-message">{this.state.errors.password2}</FormText>
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
                                <div>
                                    <Button type="submit" size="lg" color="primary" className="btn btn-primary btn-block mb-3 mt-4">Register Now</Button>
                                    <Modal
                                    className="modal-dialog-centered modal-danger"
                                    contentClassName="bg-gradient-danger"
                                    isOpen={this.state.notificationModal}
                                    toggle={() => this.toggleModal("notificationModal")}
                                    >
                                    <div className="modal-header">
                                        <h6 className="modal-title" id="modal-title-notification">
                                        Your attention is required
                                        </h6>
                                        <button
                                        aria-label="Close"
                                        className="close"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={() => this.toggleModal("notificationModal")}
                                        >
                                        <span aria-hidden={true}>×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="py-3 text-center">
                                        <i className="ni ni-bell-55 ni-3x" />
                                        <p>
                                            Now Go to Email and Click on link
                                        </p>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <Button className="btn btn-white" color="default" type="button" onClick={() => this.toggleModal("notificationModal")}>
                                        Ok, Got it
                                        </Button>
                                        <Button
                                        className="text-white ml-auto"
                                        color="link"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={() => this.toggleModal("notificationModal")}
                                        >
                                        Close
                                        </Button>
                                    </div>
                                    </Modal>
                                </div>
                            }
                            <hr />
                            <p className="forgot-password text-right" style={{fontSize:'15px', fontWeight:'500'}}>
                                Already Registered? <a href="/login"  style={{fontSize:'15px', fontWeight:'500'}}>Login</a>
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
        isAuthenticated: Cookies.get('token') !== undefined,
        user: state.usersAllDetail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (firstname, lastname, email, password1, password2, selectType) => dispatch(actions.authSignup(firstname, lastname, email, password1, password2, selectType))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpForm1);