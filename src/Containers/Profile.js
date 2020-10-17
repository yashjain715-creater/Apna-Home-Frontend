import React from 'react';
import Cookies from 'js-cookie';
import 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../store/Actions/Actions';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    FormText,
    Form,
    Input,
    Row,
    Col
  } from "reactstrap";
import { isEmpty, isContainWhiteSpace } from '../Components/validation';
import Header from '../Components/Navbar';

class Profile extends React.Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    state = {
        formData: {}, 
        errors: {}, 
        formSubmitted: false, 
        loading: false 
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

        if(this.props.user){
            if(this.props.user.occupation === 'CO'){
        
                if(isContainWhiteSpace(formData.ph_num)) {
                    errors.ph_num = "Phone number does not contain whitespaces"
                }
                
                if(!(isEmpty(formData.ph_num))){
                    if(!(formData.ph_num.length === 10)){
                        errors.ph_num = "Phone number is of 10 digits"
                    }
                }

                if(!(isEmpty(formData.experience))){
                    if(formData.experience.length > 2){
                        errors.experience = 'Experience must be less than 100 years'
                    }
                }
                if(isContainWhiteSpace(formData.experience)) {
                    errors.experience = "Experience does not contain whitespaces"
                }     
            } else if(this.props.user.occupation === 'CL'){
                if(isContainWhiteSpace(formData.ph_num)) {
                    errors.ph_num = "Phone number does not contain whitespaces"
                }
                if(!(isEmpty(formData.ph_num))){
                    if(!(formData.ph_num.length === 10)){
                        errors.ph_num = "Phone number is of 10 digits"
                    }
                }
            }
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    ClientUpdate = (e) => {
        e.preventDefault();
        const { formData } = this.state;
        let errors = this.validateLoginForm();

        if(isEmpty(formData)){
            alert('Change phone number')
        } else {
            if(errors === true){
                this.setState({
                    errors: {},
                    formSubmitted: true
                });
                this.props.ClientUpdate(formData);
            } else {
                this.setState({
                    errors: errors,
                    formSubmitted: true
                });
            }
        }
    }

    ContractorUpdate = (e) => {
        e.preventDefault();
        const { formData } = this.state;
        let errors = this.validateLoginForm();
        if(isEmpty(formData)){
            alert('Change Some Field')
        } else {
            var city = null;
            if(formData.location === 'Delhi') {
                city = 'DL'
            } else if(formData.location === 'Noida') {
                city = 'NO'
            } else if(formData.location === 'Gurgaon') {
                city = 'GR'
            } else if(formData.location === 'Faridabad') {
                city = 'FR'
            }
        
            if(errors === true){
                this.setState({
                    errors: {},
                    formSubmitted: true
                });
                if(formData.location !== undefined){
                    formData.location = city
                }
                this.props.ContractorUpdate(formData);
                window.location.reload();
            } else {
                this.setState({
                    errors: errors,
                    formSubmitted: true
                });
            }
        }
    }

    render() {
        let firstname = null;
        let lastname = null;
        let mobile = null;
        let address = null;
        let city = null;
        let email = null;
        let occ = null;
        let firm = null;
        let exp = null;
        let exp_ref = null;
        if(this.props.user){
            firstname = this.props.user.first_name;
            lastname = this.props.user.last_name;
            mobile = this.props.user.ph_num;
            address = this.props.user.address;
            email = this.props.user.email;
            firm = this.props.user.firm_name;
            exp_ref = this.props.user.experience;
            if(this.props.user.occupation === 'CO'){
                exp = exp_ref.split('.')
            }
            if(this.props.user.occupation === 'CO'){
                occ = 'Contractor'
            } else if(this.props.user.occupation === 'CL'){
                occ = 'Client'
            }
            if(this.props.user.location === 'DL') {
                city = 'Delhi'
            } else if(this.props.user.location === 'NO') {
                city = 'Noida'
            } else if(this.props.user.location === 'GR') {
                city = 'Gurgaon'
            } else if(this.props.user.location === 'FR') {
                city = 'Faridabad'
            }

            if(this.props.user.occupation === 'CO'){
                var part = this.props.user.tags.substring(1, this.props.user.tags.length-1)
                var dataC = part.split(", ")
                var str = ''
        
                for (let i = 0; i < dataC.length; i++) {
                    if(dataC[i] === 'CivCon') {
                        str += 'Civil Contractor, '
                    }
                    if(dataC[i] === 'EleCon') {
                        str += 'Electric Contractor, '
                    }
                    if(dataC[i] === 'POP') {
                        str += 'POP Contractor, '
                    }
                    if(dataC[i] === 'Ston') {
                        str += 'Stone Contractor, '
                    }
                    if(dataC[i] === 'Tile') {
                        str += 'Tiles Contractor, '
                    }
                    if(dataC[i] === 'Pol') {
                        str += 'Polish Contractor, '
                    }
                    if(dataC[i] === 'WoWo') {
                        str += 'Wood Contractor, '
                    }
                    if(dataC[i] === 'FalCie') {
                        str += 'False Ceiling Contractor, '
                    }
                    if(dataC[i] === 'Fabr') {
                        str += 'Fabrication Contractor, '
                    }
                    if(dataC[i] === 'AC') {
                        str += 'AC Contractor, '
                    }
                    if(dataC[i] === 'Plum') {
                        str += 'Plumbing Contractor, '
                    }
                }
                str = str.substring(0,str.length-2)
            }
        }
 
        return (
            <div>
                {
                    this.props.location.pathname === '/dashboard/user-profile' ?
                    null :
                    <Header {...this.props} />
                }
                <div className="container my-5">
                <Col>
                    <Card className="bg-secondary">
                        <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col xs="8">
                            <h3 className="mb-0">My account</h3>
                            </Col>
                        </Row>
                        </CardHeader>
                        <CardBody>
                            <h6 className="heading-small text-muted mb-4">
                            User information
                            </h6>
                            <div className="pl-lg-4">
                            <Row className="justify-content-center">
                            <Col lg="3">
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                    <img
                                    alt="..."
                                    className="rounded-circle"
                                    style={{width:'150px'}}
                                    src={require("../assets/img/theme/team-4-800x800.jpg")}
                                    />
                                </a>
                            </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                <FormGroup>
                                    <label
                                    className="form-control-label mt-5"
                                    htmlFor="input-first-name"
                                    >
                                    First name
                                    </label>
                                    <Input
                                    style={{color:'black'}}
                                    disabled
                                    className="form-control-alternative"
                                    defaultValue={firstname}
                                    type="text"
                                    />
                                </FormGroup>
                                </Col>
                                <Col lg="6">
                                <FormGroup>
                                    <label
                                    className="form-control-label mt-5"
                                    htmlFor="input-last-name"
                                    >
                                    Last name
                                    </label>
                                    <Input
                                    style={{color:'black'}}
                                    disabled
                                    className="form-control-alternative"
                                    defaultValue={lastname}
                                    type="text"
                                    />
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-email"
                                        >
                                        Email address
                                        </label>
                                        <Input
                                        style={{color:'black'}}
                                        disabled
                                        className="form-control-alternative"
                                        defaultValue={email}
                                        type="email"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-email"
                                        >
                                        Type
                                        </label>
                                        <Input
                                        style={{color:'black'}}
                                        disabled
                                        className="form-control-alternative"
                                        defaultValue={occ}
                                        type="text"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            {
                                occ === 'Contractor' ?
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <label
                                            className="form-control-label"
                                            htmlFor="input-tags"
                                            >
                                            Works Type
                                            </label>
                                            <Input
                                            disabled
                                            style={{color:'black'}}
                                            className="form-control-alternative"
                                            defaultValue={str}
                                            type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row> :
                                null
                            }
                            </div>
                            <hr className="my-4" />
                            {/* Address */}
                            <h6 className="heading-small text-muted mb-4">
                            Contact information
                            </h6>
                            {
                                occ === 'Contractor' ?
                                <Form onSubmit={this.ContractorUpdate}>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                    className="form-control-label"
                                                    htmlFor="input-firm"
                                                    >
                                                    Firm Name
                                                    </label>
                                                    <Input
                                                    name="firm_name"
                                                    onChange={this.handleInputChange}
                                                    style={{color:'black'}}
                                                    className="form-control-alternative"
                                                    defaultValue={firm}
                                                    type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                    className="form-control-label"
                                                    htmlFor="input-number"
                                                    >
                                                    Phone number
                                                    </label>
                                                    <Input
                                                    name="ph_num"
                                                    onChange={this.handleInputChange}
                                                    maxLength="10"
                                                    minLength="10"
                                                    style={{color:'black'}}
                                                    className="form-control-alternative"
                                                    defaultValue={mobile}
                                                    type="number"
                                                    />
                                                    { this.state.errors.ph_num &&
                                                        <FormText className="Error-message" style={{fontSize:'18px'}}>{this.state.errors.ph_num}</FormText>
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                    className="form-control-label"
                                                    htmlFor="input-city"
                                                    >
                                                    City
                                                    </label>
                                                    <Input
                                                    name="location"
                                                    onChange={this.handleInputChange}
                                                    style={{color:'black'}}
                                                    className="form-control-alternative"
                                                    defaultValue={city}
                                                    type="select"
                                                    >
                                                        <option>Delhi</option>
                                                        <option>Noida</option>
                                                        <option>Gurgaon</option>
                                                        <option>Faridabad</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                    className="form-control-label"
                                                    htmlFor="input-experience"
                                                    >
                                                    Experience
                                                    </label>
                                                    <Input
                                                    name="experience"
                                                    onChange={this.handleInputChange}
                                                    style={{color:'black'}}
                                                    className="form-control-alternative"
                                                    defaultValue={exp[0]}
                                                    type="number"
                                                    />
                                                    { this.state.errors.experience &&
                                                        <FormText className="Error-message" style={{fontSize:'18px'}}>{this.state.errors.experience}</FormText>
                                                    }
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label
                                                    className="form-control-label"
                                                    htmlFor="input-address"
                                                    >
                                                    Address
                                                    </label>
                                                    <Input
                                                    onChange={this.handleInputChange}
                                                    name="address"
                                                    style={{color:'black'}}
                                                    className="form-control-alternative"
                                                    defaultValue={address}
                                                    placeholder="Home Address"
                                                    type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <Button color="info" style={{width:"140px"}} className="text-center mt-3" type="submit">
                                                    Update
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form> : occ === 'Client' ?
                                <Form onSubmit={this.ClientUpdate}>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                    className="form-control-label"
                                                    htmlFor="input-number"
                                                    >
                                                    Phone number
                                                    </label>
                                                    <Input
                                                    maxLength="10"
                                                    onChange={this.handleInputChange}
                                                    name='ph_num'
                                                    minLength='10'
                                                    style={{color:'black'}}
                                                    className="form-control-alternative"
                                                    defaultValue={mobile}
                                                    type="number"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <Button color="info" style={{width:"140px"}} className="text-center mt-3" type="submit">
                                                    Update
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form> :   <div className="text-center" style={{marginTop:'500px'}}>
                                                <div className="spinner-border" role="status">
                                                    <span className="sr-only">Loading ...</span>
                                                </div>
                                            </div>
                            }
                        </CardBody>
                    </Card>
                    </Col>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        user: state.usersAllDetail,
        isAuthenticated: Cookies.get('token') !== undefined,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => {
            dispatch(actions.authcheckstate());
        },
        ContractorUpdate: (data) => {
            dispatch(actions.extraContractorUpdate(data));
        },
        ClientUpdate: (data) => {
            dispatch(actions.extraClientUpdate(data));
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
