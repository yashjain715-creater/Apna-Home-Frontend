import React from 'react';
import classnames from "classnames";
import {
    Button,
    CardHeader,
    Card,
    CardBody,
    Row,
    Col,
    FormGroup,
    Form,
    Input,
    InputGroup,
    Modal,
  } from "reactstrap";
import { connect } from 'react-redux';
import { isEmpty } from '../Components/validation';
import * as actions from '../store/Actions/Actions';

class AllContractorcard extends React.Component {
    
    componentDidMount() {
        this.props.onTryAutoFilter();
    }

    state = {
        formData: {}, 
        errors: {}, 
        formSubmitted: false,
    };

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

    GotoDetailPage = (id) => {
        this.props.history.push(`/contractor/${id}`);
    }

    SubmitForm = (e) => {

        e.preventDefault();
        const { formData } = this.state;
        let errors = this.validateLoginForm();
        if(errors === true){
            if(formData.Select === 'Select Work Type' || formData.Select === undefined){
                alert('Choose Correct Type')
            } else {
                if(this.props.isAuthenticated){
                    var select = null
                    for (let i = 0; i < this.AllContractorList.length; i++) {
                        if(this.AllContractorList[i][0] === formData.Select){
                            select = this.AllContractorList[i][1];
                            break;
                        }
                    }
                    this.props.sendWork(formData.price, select, formData.area, formData.des, this.globalindex);
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

    toggle = (index) => {
        this.toggleModal('formModal')
        let data = null;
        if(this.props.filterdata){
            data = this.props.filterdata;
        }
        this.AllContractorList = []
        var part = data[index].tags.substring(1,data[index].tags.length-1)
        var dataC = part.split(", ")
        var list = []
        for (let i = 0; i < dataC.length; i++) {
            if(dataC[i] === 'CivCon') {
                list.push(['Civil Work', 'CivCon'])
            }
            if(dataC[i] === 'EleCon') {
                list.push(['Electric Work','EleCon'])
            }
            if(dataC[i] === 'POP') {
                list.push(['POP Work', 'POP'])
            }
            if(dataC[i] === 'Ston') {
                list.push(['Stone Work', 'Ston'])
            }
            if(dataC[i] === 'Tile') {
                list.push(['Tiles Work', 'Tile'])
            }
            if(dataC[i] === 'Pol') {
                list.push(['Polishing work', 'Pol'])
            }
            if(dataC[i] === 'WoWo') {
                list.push(['Wood Work', 'WoWo'])
            }
            if(dataC[i] === 'FalCie') {
                list.push(['False Ceiling Work', 'FalCie'])
            }
            if(dataC[i] === 'Fabr') {
                list.push(['Fabrication Work', 'Fabr'])
            }
            if(dataC[i] === 'AC') {
                list.push(['AC Work', 'AC'])
            }
            if(dataC[i] === 'Plum') {
                list.push(['Plumbing Work', 'Plum'])
            }
        }
        this.AllContractorList = list
        this.toggling = !this.toggling
    }
    toggling = false
    globalindex = 0
    AllContractorList = []
    render() {
        let data = null;
        if(this.props.filterdata){
            data = this.props.filterdata;
        }
        return (
            <div className="container-box">
                <Row>
                    {
                        this.props.filterdata ? 
                        data.map((data, index) => {
                            var part = data.tags.substring(1,data.tags.length-1)
                            var dataC = part.split(", ")
                            var str = ''
                            var count = 0
                            for (let i = 1; i < dataC.length; i++) {
                                if(dataC[i] === 'CivCon') {
                                    if(count<2){
                                        str += 'Civil Contractor, '
                                    }
                                    count++;
                                }
                                if(dataC[i] === 'EleCon') {
                                    if(count<2){
                                        str += 'Electric Contractor, '
                                    }
                                    count++;
                                }
                                if(dataC[i] === 'POP') {
                                    if(count<2){
                                        str += 'POP Contractor, '
                                    }
                                    count++;
                                }
                                if(dataC[i] === 'Ston') {
                                    if(count<2){
                                        str += 'Stone Contractor, '
                                    }
                                    count++;
                                }
                                if(dataC[i] === 'Tile') {
                                    if(count<2){
                                        str += 'Tiles Contractor, '
                                    }
                                    count++;
                                }
                                if(dataC[i] === 'Pol') {
                                    if(count<2){
                                        str += 'Polish Contractor, '
                                    }
                                    count++;
                                }
                                if(dataC[i] === 'WoWo') {
                                    if(count<2){
                                        str += 'Wood Contractor, '
                                    }
                                    count++;
                                }
                                if(dataC[i] === 'FalCie') {
                                    if(count<2){
                                        str += 'False Ceiling Contractor, '
                                    }
                                    count++;
                                }
                                if(dataC[i] === 'Fabr') {
                                    if(count<2){
                                        str += 'Fabrication Contractor, '
                                    }
                                    count++;
                                }
                                if(dataC[i] === 'AC') {
                                    if(count<2){
                                        str += 'AC Contractor, '
                                    }
                                    count++;
                                }
                                if(dataC[i] === 'Plum') {
                                    if(count<2){
                                        str += 'Plumbing Contractor, '
                                    }
                                    count++;
                                }
                            }
                            str = str.substring(0,str.length-2)
                            if(count >= 2){
                                str += '...'
                            }
                            var exp = data.experience.split(".")
                            return (
                                <Col md="6" xl="4" key={`${index}`}>
                                    <Card className="bg-secondary border-0 mr-3 ml-3 mb-5 mt-5">
                                        <CardHeader className="bg-transparent">
                                            <img
                                                alt="..."
                                                className="img-fluid"
                                                style= {{height: '200px', width: '500px'}}
                                                src={require("../assets/img/theme/team-1-800x800.jpg")}
                                                
                                            />
                                        </CardHeader>
                                        <CardBody className="px-lg-3 py-lg-3">
                                            <h2 style={{fontWeight:'800', fontSize:'18px'}} className="text-center">{data.firm_name}</h2>
                                            <p className="text-center" style={{fontWeight:'600'}}>
                                                <i className="ni ni-badge mr-2" />
                                                {str}
                                            </p>
                                            <h5 className="text-center mb-4">Experience: {exp[0]} Years</h5>
                                        
                                            <Row>
                                                <Col xs="6">
                                                    <div className="text-center">
                                                    <Button color="primary" style={{width:"auto"}} className="ml-2" onClick={() => this.toggle(index)} type="button">
                                                        show Intrest
                                                    </Button>
                                                    <Modal
                                                    className="modal-dialog-centered"
                                                    size="sm"
                                                    isOpen={this.state.formModal}
                                                    toggle={() => this.toggle(index)}
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
                                                                            this.AllContractorList.map((data, index) => {
                                                                                return <option key={index}>{data[0]}</option>
                                                                            }) 
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
                                                                <Button className="my-4" color="primary" type="submit" onClick={() => this.globalindex = data.id}>
                                                                    Submit
                                                                </Button>
                                                            </div>
                                                            </Form>
                                                        </CardBody>
                                                        </Card>
                                                    </div>
                                                    </Modal>
                                                    </div>
                                                </Col>
                                                <Col xs="6">
                                                    <div className="text-center">
                                                    <Button color="info" style={{width:"140px"}} type="button" onClick={() => this.GotoDetailPage(data.id)}>
                                                        Read More
                                                    </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        }) :
                        <div className="text-center" style={{marginTop:'500px', marginLeft:'200px'}}>
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading ...</span>
                            </div>
                        </div>
                    }
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filterdata: state.filterContractors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoFilter: () => {
            dispatch(actions.Allcheckstate());
        },
        sendWork: (price, work_type, area, description, id) => {
            dispatch(actions.SendClientWork(price, work_type, area, description, id));
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AllContractorcard);