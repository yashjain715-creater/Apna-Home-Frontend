import React from 'react';
import Cookies from 'js-cookie';

import Header from '../Components/Navbar';
import { FormGroup,FormText, FormControl,FormCheck, FormLabel, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { isEmpty, isContainWhiteSpace } from '../Components/validation';
import * as actions from '../store/Actions/Actions';
import '../App.css';

class SignUpForm2 extends React.Component {

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

        if (isEmpty(formData.firm)) {
            errors.firm = "Firm name can't be blank";
        }

        if(formData.Selectcity === 'Choose ..' || formData.Selectcity === undefined) {
            errors.Selectcity = "Please choose some field"
        }

        if (isEmpty(formData.phone)) {
            errors.phone = "Phone number can't be blank";
        } else if(isContainWhiteSpace(formData.phone)) {
            errors.phone = "Phone number does not contain whitespaces"
        }

        if (isEmpty(formData.address)) {
            errors.address = "Address can't be blank";
        }

        if (isEmpty(formData.experience)) {
            errors.experience = "Experience can't be blank";
        } else if(isContainWhiteSpace(formData.experience)) {
            errors.experience = "Experience does not contain whitespaces"
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    Extra = (e) => {
        e.preventDefault();
        const { formData } = this.state;
        let errors = this.validateLoginForm();
        
        var list = '[';
        var city = null;
        if(formData.civil === 'on') {
            list += 'CivCon';
            list += ', '
        }
        if(formData.electric === 'on') {
            list += 'EleCon';
            list += ', '
        }
        if(formData.pop === 'on') {
            list += 'POP';
            list += ', '
        }
        if(formData.stone === 'on') {
            list += 'Ston';
            list += ', '
        }
        if(formData.tiles === 'on') {
            list += 'Tile';
            list += ', '
        }
        if(formData.polishing === 'on') {
            list += 'Pol';
            list += ', '
        }
        if(formData.woodwork === 'on') {
            list += 'WoWo';
            list += ', '
        }
        if(formData.false === 'on') {
            list += 'FalCie';
            list += ', '
        }
        if(formData.fabrication === 'on') {
            list += 'Fabr';
            list += ', '
        }
        if(formData.ac === 'on') {
            list += 'AC';
            list += ', '
        }
        if(formData.plumbing === 'on') {
            list += 'Plum';
            list += ', '
        }
        if(formData.Selectcity === 'Delhi') {
            city = 'DL'
        } else if(formData.Selectcity === 'Noida') {
            city = 'NO'
        } else if(formData.Selectcity === 'Gurgaon') {
            city = 'GR'
        } else if(formData.Selectcity === 'Faridabad') {
            city = 'FR'
        }
     
        if(errors === true){
            this.props.onExtraAuth(city, list, formData.phone, formData.address, formData.experience, formData.firm);
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
            this.props.history.push('/');
        }
    }

    render() {
        let errormessage = null;
        if(this.props.error) {
            errormessage = (
            <p>{this.props.error.message}</p>
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
                        <form onSubmit={this.Extra}>
                            <FormGroup controlId="firm" validationstate={ this.state.formSubmitted ? (this.state.errors.firm ? 'error' : 'success') : null }>
                                    <FormLabel style={{fontSize:'18px'}}>Firm Name</FormLabel>
                                    <FormControl type="text" name="firm" size="lg" onChange={this.handleInputChange} />
                                { this.state.errors.firm &&
                                    <FormText className="Error-message" style={{fontSize:'18px'}}>{this.state.errors.firm}</FormText>
                                }
                            </FormGroup>
                            <FormGroup controlId="Selectcity">
                                <FormLabel style={{fontSize:'18px'}}>City</FormLabel>
                                <FormControl name="Selectcity" as="select" size="lg" onChange={this.handleInputChange} custom>
                                    <option style={{fontSize:'18px'}}>Choose ..</option>
                                    <option style={{fontSize:'18px'}}>Delhi</option>
                                    <option style={{fontSize:'18px'}}>Noida</option>
                                    <option style={{fontSize:'18px'}}>Gurgaon</option>
                                    <option style={{fontSize:'18px'}}>Faridabad</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="Selectwork">
                                <FormLabel style={{fontSize:'18px'}}>Types of Contractor</FormLabel>
                                <FormCheck  type="checkbox" name="civil" label="Civil Contractor" onChange={this.handleInputChange} size="lg" />
                                <FormCheck  type="checkbox" name="electric" label="Electric Contractor" onChange={this.handleInputChange} size="lg" />
                                <FormCheck  type="checkbox" name="pop" label="POP Contractor" onChange={this.handleInputChange} size="lg" />
                                <FormCheck  type="checkbox" name="stone" label="Stone Contractor" onChange={this.handleInputChange} size="lg" />
                                <FormCheck  type="checkbox" name="tiles" label="Tiles Contractor" onChange={this.handleInputChange} size="lg" />
                                <FormCheck  type="checkbox" name="polishing" label="Polishing Contractor" onChange={this.handleInputChange} size="lg" />
                                <FormCheck  type="checkbox" name="woodwork" label="Woodwork Contractor" onChange={this.handleInputChange} size="lg" />
                                <FormCheck  type="checkbox" name="false" label="False Cieling Contractor" onChange={this.handleInputChange} size="lg" />
                                <FormCheck  type="checkbox" name="fabrication" label="Fabrication Contractor" onChange={this.handleInputChange} size="lg" />
                                <FormCheck  type="checkbox" name="ac" label="AC Contractor" onChange={this.handleInputChange} size="lg" />
                                <FormCheck  type="checkbox" name="plumbing" label="Plumbing Contractor" onChange={this.handleInputChange} size="lg" />
                            </FormGroup>
                            <FormGroup controlId="phone" validationstate={ this.state.formSubmitted ? (this.state.errors.phone ? 'error' : 'success') : null }>
                                <FormLabel style={{fontSize:'18px'}}>Phone Number</FormLabel>
                                <FormControl type="number" name="phone" size="lg" onChange={this.handleInputChange} />
                            { this.state.errors.phone &&
                                <FormText className="Error-message" style={{fontSize:'18px'}}>{this.state.errors.phone}</FormText>
                            }
                            </FormGroup>
                            <FormGroup controlId="address" validationstate={ this.state.formSubmitted ? (this.state.errors.address ? 'error' : 'success') : null }>
                                <FormLabel style={{fontSize:'18px'}}>Address</FormLabel>
                                <FormControl type="text" name="address" size="lg" onChange={this.handleInputChange} />
                            { this.state.errors.address &&
                                <FormText className="Error-message" style={{fontSize:'18px'}}>{this.state.errors.address}</FormText>
                            }
                            </FormGroup>
                            <FormGroup controlId="experience" validationstate={ this.state.formSubmitted ? (this.state.errors.experience ? 'error' : 'success') : null }>
                                <FormLabel style={{fontSize:'18px'}}>Experience</FormLabel>
                                <FormControl type="number" name="experience" size="lg" onChange={this.handleInputChange} />
                            { this.state.errors.experience &&
                                <FormText className="Error-message" style={{fontSize:'18px'}}>{this.state.errors.experience}</FormText>
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
                                <Button type="submit" size="lg" className="btn btn-primary btn-block mb-3 mt-4">Register Now</Button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.errorExtra,
        token: state.token,
        isAuthenticated: Cookies.get('token') !== undefined,
        user: state.usersAllDetail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onExtraAuth: (occupation, location, tags, phone, address, experience, firm) => dispatch(actions.extraSignup(occupation, location, tags, phone, address, experience, firm)),
        onTryAutoSignup: () => {
            dispatch(actions.authcheckstate());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpForm2);