import React from 'react';
import classnames from "classnames";
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import {
    Button,
    Card, 
    Container, 
    Row, 
    Col,
    CardBody,
    NavItem,
    NavLink,
    FormGroup,
    Form,
    Input,
    InputGroup,
    Modal,
    Nav,
    TabContent,
    TabPane
} from "reactstrap";
import { isEmpty } from '../Components/validation';
import * as actions from '../store/Actions/Actions';
import Header from '../Components/Navbar';
import Image from "../assets/img/theme/team-1-800x800.jpg";

var style = {
    height:'100%',
    backgroundImage: `url(${Image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
}

var basicstyle = {
    borderRadius: '5px',
    boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
    padding:'0'
}


class ContractorDetail extends React.Component {

    state = {
        tabs: 1,
        formData: {}, 
        errors: {}, 
        formSubmitted: false,
    };
    
    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        });
    };

    componentDidMount() {
        this.props.onTryAutoSignup();
        this.props.getParticularContractor(this.props.match.params.id);
    }

    toggleModal = (state) => {
        this.setState({
        [state]: !this.state[state],
        errors: {},
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
        if (isEmpty(formData.price)) {
            errors.price = "Price can't be blank";
        }

        if (isEmpty(formData.area)) {
            errors.area = "Area can't be blank";
        }

        if (isEmpty(formData.des)) {
            errors.des = "Description can't be blank";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    SubmitForm = (e) => {

        e.preventDefault();
        const { formData } = this.state;
        let errors = this.validateLoginForm();
        if(errors === true){
            if(formData.Select === 'Select Work Type' || formData.Select === undefined){
                alert('Choose Correct Type')
            } else {
                if(this.props.isAuthenticated && this.props.selectedcontractorinfo){
                    var select = null
                    for (let i = 0; i < this.AllContractorList.length; i++) {
                        if(this.AllContractorList[i][0] === formData.Select){
                            select = this.AllContractorList[i][1];
                            break;
                        }
                    }
                    this.props.sendWork(formData.price, select, formData.area, formData.des, this.props.match.params.id);
                    this.props.history.push('/dashboard');
                } else {
                    this.props.history.push('/login');
                }
            }
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    AllContractorList = []

    render() {
        let exp = null;
        let city = null;
        let firm = null;
        if(this.props.selectedcontractorinfo){
            firm = this.props.selectedcontractorinfo.firm_name
            var exp_ref = this.props.selectedcontractorinfo.experience.split('.')
            exp = exp_ref[0]
            var list = []
            var part = this.props.selectedcontractorinfo.tags.substring(1,this.props.selectedcontractorinfo.tags.length-1)
            var dataC = part.split(", ")
            var str = ''
            for (let i = 0; i < dataC.length; i++) {
                if(dataC[i] === 'CivCon') {
                    str += 'Civil Contractor, '
                    list.push(['Civil Work', 'CivCon'])
                }
                if(dataC[i] === 'EleCon') {
                    str += 'Electric Contractor, '
                    list.push(['Electric Work','EleCon'])
                }
                if(dataC[i] === 'POP') {
                    str += 'POP Contractor, '
                    list.push(['POP Work', 'POP'])
                }
                if(dataC[i] === 'Ston') {
                    str += 'Stone Contractor, '
                    list.push(['Stone Work', 'Ston'])
                }
                if(dataC[i] === 'Tile') {
                    str += 'Tiles Contractor, '
                    list.push(['Tiles Work', 'Tile'])
                }
                if(dataC[i] === 'Pol') {
                    str += 'Polish Contractor, '
                    list.push(['Polishing work', 'Pol'])
                }
                if(dataC[i] === 'WoWo') {
                    str += 'Wood Contractor, '
                    list.push(['Wood Work', 'WoWo'])
                }
                if(dataC[i] === 'FalCie') {
                    str += 'False Ceiling Contractor, '
                    list.push(['False Ceiling Work', 'FalCie'])
                }
                if(dataC[i] === 'Fabr') {
                    str += 'Fabrication Contractor, '
                    list.push(['Fabrication Work', 'Fabr'])
                }
                if(dataC[i] === 'AC') {
                    str += 'AC Contractor, '
                    list.push(['AC Work', 'AC'])
                }
                if(dataC[i] === 'Plum') {
                    str += 'Plumbing Contractor, '
                    list.push(['Plumbing Work', 'Plum'])
                }
            }
            this.AllContractorList = list
            str = str.substring(0,str.length-2)
            if(this.props.selectedcontractorinfo.location === 'DL') {
                city = 'Delhi'
            } else if(this.props.selectedcontractorinfo.location === 'NO') {
                city = 'Noida'
            } else if(this.props.selectedcontractorinfo.location === 'GR') {
                city = 'Gurgaon'
            } else if(this.props.selectedcontractorinfo.location === 'FR') {
                city = 'Faridabad'
            }
        }
        
        var items = [
            require("../assets/img/theme/team-1-800x800.jpg"),
            require("../assets/img/theme/team-1-800x800.jpg"),
            require("../assets/img/theme/team-1-800x800.jpg"),
            require("../assets/img/theme/team-1-800x800.jpg"),
            require("../assets/img/theme/team-1-800x800.jpg"),
            require("../assets/img/theme/team-1-800x800.jpg"),
            require("../assets/img/theme/team-1-800x800.jpg"),
            require("../assets/img/theme/team-1-800x800.jpg"),
            require("../assets/img/theme/team-1-800x800.jpg"),
        ]

        return(
            <div>
                <Header {...this.props} />
                
                {
                    this.props.selectedcontractorinfo ?
                        <section className="section" style={{marginTop:'15%'}}>
                        <Container>
                            <Card className="card-profile mt--300">
                                <div style={style}>
                                    <div style={{height:'200px',backgroundColor: 'rgba(0,0,0,0.5)'}}>
                                        <h3 className="pt-3 pl-3" style={{fontWeight:'800', color:'white'}}>
                                            {firm}
                                        </h3>
                                        <div className="h6 pt-1 pl-3" style={{color:"white", fontSize:'17px'}}>
                                        <i className="ni business_briefcase-24" />
                                            This section belongs to the description of the contractor
                                        </div>
                                        <Button style={{bottom:'5px', position:'absolute', right:'5px'}} onClick={() => this.toggleModal('formModal')} type="button">Show Intrest</Button>
                                        <Modal
                                        className="modal-dialog-centered"
                                        size="sm"
                                        isOpen={this.state.formModal}
                                        toggle={() => this.toggleModal('formModal')}
                                        >
                                        <div className="modal-body p-0">
                                            <Card className="bg-secondary shadow border-0">
                                            <CardBody className="px-lg-5 py-lg-5">
                                                <div className="text-center text-muted mb-4">
                                                    <h5>Fill your requirements</h5>
                                                </div>
                                                <Form role="form" onSubmit={this.SubmitForm}>
                                                <FormGroup
                                                    className={classnames("mb-3", {
                                                    focused: this.state.priceFocused,
                                                    'has-danger': this.state.errors.price === "Price can't be blank",
                                                    })}
                                                >
                                                    <InputGroup className="input-group-alternative">
                                                    <Input
                                                        placeholder={this.state.errors.price === "Price can't be blank" ? "Please Enter Price" : "Price"}
                                                        className={classnames(
                                                            {'is-invalid': this.state.errors.price === "Price can't be blank"},
                                                        )}
                                                        onChange={this.handleInputChange}
                                                        name="price"
                                                        type="number"
                                                        onFocus={e => this.setState({ priceFocused: true })}
                                                        onBlur={e => this.setState({ priceFocused: false })}
                                                    />
                                                    </InputGroup>
                                                </FormGroup>
                                                <FormGroup
                                                    className={classnames("mb-3", {
                                                    focused: this.state.selectFocused,
                                                    })}
                                                >
                                                    <InputGroup className="input-group-alternative">
                                                        <Input
                                    
                                                            name="Select"
                                                            id="exampleSelect"
                                                            type="select"
                                                            onFocus={e => this.setState({ selectFocused: true })}
                                                            onBlur={e => this.setState({ selectFocused: false })}
                                                            onChange={this.handleInputChange}
                                                        >
                                                            <option>Select Work Type</option>
                                                            {
                                                                this.props.selectedcontractorinfo ?
                                                                list.map((data, index) => {
                                                                    return <option key={index}>{data[0]}</option>
                                                                }): null 
                                                            }
                                                        </Input>
                                                    </InputGroup>
                                                </FormGroup>
                                                <FormGroup
                                                    className={classnames("mb-3", {
                                                        focused: this.state.SizeFocused,
                                                        'has-danger': this.state.errors.area === "Area can't be blank",
                                                    })}
                                                >
                                                    <InputGroup className="input-group-alternative">
                                                    <Input
                                                        placeholder={this.state.errors.area === "Area can't be blank" ? "Please Enter Area" : "Size"}
                                                        className={classnames(
                                                            {'is-invalid': this.state.errors.area === "Area can't be blank"},
                                                        )}
                                                        onChange={this.handleInputChange}
                                                        name="area"
                                                        type="text"
                                                        onFocus={e => this.setState({ SizeFocused: true })}
                                                        onBlur={e => this.setState({ SizeFocused: false })}
                                                    />
                                                    </InputGroup>
                                                </FormGroup>
                                                <FormGroup
                                                    className={classnames({
                                                    focused: this.state.DescriptionFocused,
                                                    'has-danger': this.state.errors.des === "Description can't be blank",
                                                    })}
                                                >
                                                    <InputGroup className="input-group-alternative">
                                                    <textarea
                                                        onChange={this.handleInputChange}
                                                        name="des"
                                                        style={{border:'none'}}
                                                        className={classnames(
                                                            'form-control',
                                                            {'is-invalid': this.state.errors.des === "Description can't be blank"},
                                                        )}
                                                        placeholder={this.state.errors.des === "Description can't be blank" ? "Please Enter Description" : "Description"}
                                                        rows="4"
                                                        cols="50"
                                                        type="text"
                                                        onFocus={e =>
                                                        this.setState({ DescriptionFocused: true })
                                                        }
                                                        onBlur={e =>
                                                        this.setState({ DescriptionFocused: false })
                                                        }
                                                    />
                                                    </InputGroup>
                                                </FormGroup>
                                                
                                                <div className="text-center">
                                                    <Button className="my-4" color="primary" type="submit">
                                                        Submit
                                                    </Button>
                                                </div>
                                                </Form>
                                            </CardBody>
                                            </Card>
                                        </div>
                                        </Modal>
                                    </div>
                                </div>
                            </Card>
                            <div className="nav-wrapper">
                            <Nav
                                className="nav-fill flex-column flex-md-row"
                                id="tabs-icons-text"
                                pills
                                role="tablist"
                            >
                                <NavItem>
                                <NavLink
                                    aria-selected={this.state.tabs === 1}
                                    className={classnames("mb-sm-3 mb-md-0", {
                                    active: this.state.tabs === 1
                                    })}
                                    onClick={e => this.toggleNavs(e, "tabs", 1)}
                                    href="#pablo"
                                    role="tab"
                                    style={{fontWeight:"600", fontSize:'18px'}}
                                >
                                    Gallery
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                    aria-selected={this.state.tabs === 2}
                                    className={classnames("mb-sm-3 mb-md-0", {
                                    active: this.state.tabs === 2
                                    })}
                                    onClick={e => this.toggleNavs(e, "tabs", 2)}
                                    href="#pablo"
                                    role="tab"
                                    style={{fontWeight:"600", fontSize:'18px'}}
                                >
                                    Details
                                </NavLink>
                                </NavItem>
                            </Nav>
                            </div>
                            
                                <TabContent activeTab={"tabs" + this.state.tabs} style={{marginBottom:'100px'}}>
                                <TabPane tabId="tabs1" style={basicstyle}>
                                    <Row style={{padding:'10px'}}>
                                        {
                                            items.map((data, index) => {
                                                return(
                                                    <Col xs="6" md="4" key={index} className="mt-4">
                                                        <img
                                                            alt="..."
                                                            className="img-fluid"
                                                            style= {{height: '200px', width: '500px'}}
                                                            src={data}
                                                            
                                                        />
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </TabPane>
                                <TabPane tabId="tabs2" style={basicstyle}>
                                    {
                                        this.props.selectedcontractorinfo ?
                                        <div style={{padding:'25px'}}>
                                            <h4 style={{fontWeight:'800'}}>Service Type</h4>
                                            <h4>Contractor</h4>
                                            <h4 style={{fontWeight:'800'}} className="mt-3">List of Services</h4>
                                            <h4>{str}</h4>
                                            <h4 style={{fontWeight:'800'}} className="mt-3">Experience</h4>
                                            <h4>{exp} Years</h4>
                                            <h4 style={{fontWeight:'800'}} className="mt-3">Location</h4>
                                            <h4><i className="ni ni-building" />  {city}</h4>
                                        </div> 
                                        : null
                                    }
                                </TabPane>
                                </TabContent>
                            
                        </Container>
                    </section> :
                    <div className="text-center" style={{marginTop:'500px'}}>
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading ...</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.usersAllDetail,
        selectedcontractorinfo: state.selectedcontractorinfo,
        isAuthenticated: Cookies.get('token') !== undefined,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => {
            dispatch(actions.authcheckstate());
        },
        getParticularContractor: (id) => dispatch(actions.ParticularContractorInfo(id)),
        sendWork: (price, work_type, area, description, id) => {
            dispatch(actions.SendClientWork(price, work_type, area, description, id));
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ContractorDetail);