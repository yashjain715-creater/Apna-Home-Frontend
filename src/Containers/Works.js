import React from "react";
import classnames from "classnames";
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import * as actions from '../store/Actions/Actions';
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  FormGroup,
  Form,
  Input,
  InputGroup,
} from "reactstrap";
import { isEmpty } from '../Components/validation';

var basicstyle = {
  borderRadius: '5px',
  boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
  padding:'0'
}

var intrest = {
  border: '2px solid black',
  borderRadius: '30px',
  padding: '5px',
  fontSize: '19px'
}

class WorkBar extends React.Component {
  state = {
    tabs: 1,
    formData: {}, 
    errors: {}, 
    formSubmitted: false,
  };

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  updateClient = true
  updateContractorWorks = true
  updateContractorBids = true
  componentDidUpdate(){
    if(this.props.allDetail){
      if(this.props.allDetail.occupation === 'CL'){
        if(this.updateClient && this.state.tabs === 1){
          this.updateClient = false;
          this.props.ClientWorks();
        }
      }
      if(this.props.allDetail.occupation === 'CO'){
        if(this.updateContractorWorks === true && this.state.tabs === 4){
          this.updateContractorWorks = false;
          this.props.ClientWorksForContractors(this.props.allDetail.tags)
        } else if(this.updateContractorBids === true && this.state.tabs === 3){
          this.updateContractorBids = false;
          this.props.getContractorBids();
        }
      }
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
      if (isEmpty(formData.price)) {
          errors.price = "Bid can't be blank";
      }
      if (isEmpty(formData.remark)) {
        errors.remark = "Remark can't be blank";
      }

      if (isEmpty(errors)) {
          return true;
      } else {
          return errors;
      }
  }

  Index = 0;
  selectedIndex = (id) => {
    this.Index = id
  }

  SubmitForm = (e) => {
      e.preventDefault();
      const { formData } = this.state;
      let errors = this.validateLoginForm();
      if(errors === true){
          this.props.SendInitialContractorBid(this.Index, formData.price, formData.remark);
          window.location.reload();
      } else {
          this.setState({
              errors: errors,
              formSubmitted: true
          });
      }
  }

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

  deleteClientWorkfromClientSide = (id) => {
    this.props.DeleteClientWorkFromClientSide(id);
  }

  render() {
    var occ = null;
    var worksClient = null;
    if(this.props.allDetail){
      occ = this.props.allDetail.occupation;
    }
    if(this.props.contractorBids){
      console.log(this.props.contractorBids)
    }
    if(this.props.worksClient){
      worksClient = this.props.worksClient;
    }
    return (
      <>
        {
          occ === 'CO' ?
          <>
            <div className="nav-wrapper mx-5">
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
                    style={{fontWeight:"600"}}
                  >
                    ONGOING WORKS
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
                    style={{fontWeight:"600"}}
                  >
                    COMPLETED WORKS
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.tabs === 3}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.tabs === 3
                    })}
                    onClick={e => this.toggleNavs(e, "tabs", 3)}
                    href="#pablo"
                    role="tab"
                    style={{fontWeight:"600"}}
                  >
                    BID WORKS
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.tabs === 4}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.tabs === 4
                    })}
                    onClick={e => this.toggleNavs(e, "tabs", 4)}
                    href="#pablo"
                    role="tab"
                    style={{fontWeight:"600"}}
                  >
                    WORKS BY CLIENTS
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <Card className="shadow mx-5">
              <CardBody>
                <TabContent activeTab={"tabs" + this.state.tabs}>
                  <TabPane tabId="tabs1">
                    <p className="description">
                      Raw denim you probably haven't heard of them jean shorts
                      Austin. Nesciunt tofu stumptown aliqua, retro synth master
                      cleanse. Mustache cliche tempor, williamsburg carles vegan
                      helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                      synth.
                    </p>
                    <p className="description">
                      Raw denim you probably haven't heard of them jean shorts
                      Austin. Nesciunt tofu stumptown aliqua, retro synth master
                      cleanse.
                    </p>
                  </TabPane>
                  <TabPane tabId="tabs2">
                    <p className="description">
                      Cosby sweater eu banh mi, qui irure terry richardson ex
                      squid. Aliquip placeat salvia cillum iphone. Seitan aliquip
                      quis cardigan american apparel, butcher voluptate nisi qui.
                    </p>
                  </TabPane>
                  <TabPane tabId="tabs3">
                  {
                      this.props.contractorBids ? 
                      this.props.contractorBids.map((data, index) => {
                        
                        return (
                          <Card className="bg-secondary border-0 my-3" key={index}>
                            <CardBody className="px-lg-3 py-lg-3">
                              <Row>
                                <Col md='6' lg="8">
                                  {/* <h4>Client Intrest: <span style={intrest}>Intrested</span></h4>
                                  <h1 className="display-4">Work Type: {work_type}</h1>
                                  <h3 className="display-4">Area: {data.area}</h3>
                                  <h3 className="display-4">Client Bid: {data.price} Rs</h3>
                                  <h5>
                                      Description of Work: {data.description}
                                  </h5> */}
                                  <h3 className="display-4">Your Current Bid Amount: {data.bid_amount}</h3>
                                  <h5>Remarks: {data.remarks}</h5>
                                </Col>
                                <Col md="6" lg="4" className="m-auto text-center">
                                  {
                                    data.currently_being_reviewed_by === 'CO' ?
                                    <Form role="form" onSubmit={this.SubmitForm}>
                                      <FormGroup>
                                          <InputGroup className="input-group-alternative">
                                          <Input
                                              placeholder={this.state.errors.price === "Bid can't be blank" ? "Enter Bid Price" : "Price"}
                                              className={classnames(
                                                  {'is-invalid': this.state.errors.price === "Bid can't be blank"},
                                              )}
                                              onChange={this.handleInputChange}
                                              name="price"
                                              type="number"
                                          />
                                          </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                          <InputGroup className="input-group-alternative">
                                          <Input
                                              placeholder={this.state.errors.remark === "Remark can't be blank" ? "Enter Remarks" : "Remarks"}
                                              className={classnames(
                                                  {'is-invalid': this.state.errors.remark === "Remark can't be blank"},
                                              )}
                                              onChange={this.handleInputChange}
                                              name="remark"
                                              type="text"
                                          />
                                          </InputGroup>
                                      </FormGroup>
                                      <Button color="info" style={{width:'auto'}} className="text-center" type="submit" onClick={() => this.selectedIndex(data.id)}>
                                          Bid
                                      </Button>
                                    </Form> : 
                                    <h4>Please Wait for Client Response</h4>
                                  }
                                </Col>
                              </Row>
                            </CardBody>
                        </Card>
                        );
                      }) : <div className="text-center" style={{marginTop:'100px'}}>
                              <div className="spinner-border" role="status">
                                  <span className="sr-only">Loading ...</span>
                              </div>
                          </div>
                    }
                  </TabPane>
                  <TabPane tabId="tabs4">
                    {
                      this.props.contractorWorks ? 
                      this.props.contractorWorks.map((data, index) => {
                        var work_type = null;
                        if(data.work_type === 'CivCon') {
                          work_type = 'Civil Contractor Work'
                        }
                        if(data.work_type === 'EleCon') {
                          work_type = 'Electric Contractor Work'
                        }
                        if(data.work_type === 'POP') {
                          work_type = 'POP Contractor Work'
                        }
                        if(data.work_type === 'Ston') {
                          work_type = 'Stone Contractor Work'
                        }
                        if(data.work_type === 'Tile') {
                          work_type = 'Tiles Contractor Work'
                        }
                        if(data.work_type === 'Pol') {
                          work_type = 'Polish Contractor Work'
                        }
                        if(data.work_type === 'WoWo') {
                          work_type = 'Wood Contractor Work'
                        }
                        if(data.work_type === 'FalCie') {
                          work_type = 'False Ceiling Contractor Work'
                        }
                        if(data.work_type === 'Fabr') {
                          work_type = 'Fabrication Contractor Work'
                        }
                        if(data.work_type === 'AC') {
                          work_type = 'AC Contractor Work'
                        }
                        if(data.work_type === 'Plum') {
                          work_type = 'Plumbing Contractor Work'
                        }
                        return (
                          <Card className="bg-secondary border-0 my-3" key={index}>
                            <CardBody className="px-lg-3 py-lg-3">
                              <Row>
                                <Col md='6' lg="8">
                                  <h4>Client Intrest: <span style={intrest}>Intrested</span></h4>
                                  <h1 className="display-4">Work Type: {work_type}</h1>
                                  <h3 className="display-4">Area: {data.area}</h3>
                                  <h3 className="display-4">Client Bid: {data.price} Rs</h3>
                                  <h5>
                                      Description of Work: {data.description}
                                  </h5>
                                </Col>
                                <Col md="6" lg="4" className="m-auto text-center">
                                  <Form role="form" onSubmit={this.SubmitForm}>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                        <Input
                                            placeholder={this.state.errors.price === "Bid can't be blank" ? "Enter Bid Price" : "Price"}
                                            className={classnames(
                                                {'is-invalid': this.state.errors.price === "Bid can't be blank"},
                                            )}
                                            onChange={this.handleInputChange}
                                            name="price"
                                            type="number"
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                        <Input
                                            placeholder={this.state.errors.remark === "Remark can't be blank" ? "Enter Remarks" : "Remarks"}
                                            className={classnames(
                                                {'is-invalid': this.state.errors.remark === "Remark can't be blank"},
                                            )}
                                            onChange={this.handleInputChange}
                                            name="remark"
                                            type="text"
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                    <Button color="info" style={{width:'auto'}} className="text-center" type="submit" onClick={() => this.selectedIndex(data.id)}>
                                        Bid
                                    </Button>
                                  </Form>
                                </Col>
                              </Row>
                            </CardBody>
                        </Card>
                        );
                      }) : <div className="text-center" style={{marginTop:'100px'}}>
                              <div className="spinner-border" role="status">
                                  <span className="sr-only">Loading ...</span>
                              </div>
                          </div>
                    }
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
        </> : occ === 'CL' ?
        <>
        <div className="nav-wrapper mx-5">
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
                style={{fontWeight:"600"}}
              >
                POSTED WORK
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
                style={{fontWeight:"600"}}
              >
                INTRESTED CONTRACTORS BID
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 3}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 3
                })}
                onClick={e => this.toggleNavs(e, "tabs", 3)}
                href="#pablo"
                role="tab"
                style={{fontWeight:"600"}}
              >
                OTHER CONTRACTORS INTRESTED
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <Card className="shadow mx-5">
          <CardBody>
            <TabContent activeTab={"tabs" + this.state.tabs}>
              <TabPane tabId="tabs1" style={basicstyle}>
                {
                  this.props.worksClient ? 
                  worksClient.map((data, index) => {
                    var work_type = null;
                    if(data.work_type === 'CivCon') {
                      work_type = 'Civil Contractor Work'
                    }
                    if(data.work_type === 'EleCon') {
                      work_type = 'Electric Contractor Work'
                    }
                    if(data.work_type === 'POP') {
                      work_type = 'POP Contractor Work'
                    }
                    if(data.work_type === 'Ston') {
                      work_type = 'Stone Contractor Work'
                    }
                    if(data.work_type === 'Tile') {
                      work_type = 'Tiles Contractor Work'
                    }
                    if(data.work_type === 'Pol') {
                      work_type = 'Polish Contractor Work'
                    }
                    if(data.work_type === 'WoWo') {
                      work_type = 'Wood Contractor Work'
                    }
                    if(data.work_type === 'FalCie') {
                      work_type = 'False Ceiling Contractor Work'
                    }
                    if(data.work_type === 'Fabr') {
                      work_type = 'Fabrication Contractor Work'
                    }
                    if(data.work_type === 'AC') {
                      work_type = 'AC Contractor Work'
                    }
                    if(data.work_type === 'Plum') {
                      work_type = 'Plumbing Contractor Work'
                    }
                    return (
                      <Card className="bg-secondary border-0 my-3" key={index}>
                        <CardBody className="px-lg-3 py-lg-3">
                          <Row>
                            <Col md='9' lg="10">
                              <h1 className="display-4">Type of Work: {work_type}</h1>
                              <h3 className="display-4">Area: {data.area}</h3>
                              <h5 className="display-4">Your Bid: {data.price}Rs</h5>
                              <h5>
                                  Description: {data.description}
                              </h5>
                            </Col>
                            <Col md="3" lg="2" className="m-auto text-center">
                              <Button color="info" style={{width:"140px"}} className="text-center" type="button" onClick={() => this.deleteClientWorkfromClientSide(data.id)}>
                                  Delete
                              </Button>
                            </Col>
                          </Row>
                        </CardBody>
                    </Card>
                    );
                  }) : <div className="text-center" style={{marginTop:'100px'}}>
                          <div className="spinner-border" role="status">
                              <span className="sr-only">Loading ...</span>
                          </div>
                      </div>
                }
              </TabPane>
              <TabPane tabId="tabs2">
                <p className="description">
                  Cosby sweater eu banh mi, qui irure terry richardson ex
                  squid. Aliquip placeat salvia cillum iphone. Seitan aliquip
                  quis cardigan american apparel, butcher voluptate nisi qui.
                </p>
              </TabPane>
              <TabPane tabId="tabs3">
                <p className="description">
                  Cosby sweater eu banh mi, qui irure terry richardson ex
                  squid. Aliquip placeat salvia cillum iphone. Seitan aliquip
                  quis cardigan american apparel, butcher voluptate nisi qui.
                </p>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </> : <div className="text-center" style={{marginTop:'500px'}}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading ...</span>
                </div>
            </div>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
      user: state.user,
      allDetail: state.usersAllDetail,
      isAuthenticated: Cookies.get('token') !== undefined,
      worksClient: state.clientsWorks,
      contractorWorks: state.clientsWorksforcontractor,
      contractorBids: state.contractorbids,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      ClientWorks: () => dispatch(actions.GetClientsWorks()),
      ClientWorksForContractors: (tags) => dispatch(actions.GetClientsWorksForContractors(tags)),
      DeleteClientWorkFromClientSide: (id) => dispatch(actions.DeleteClientWorkFromClientSide(id)),
      onTryAutoSignup: () => {
        dispatch(actions.authcheckstate());
      },
      SendInitialContractorBid: (id, bid, remark) => dispatch(actions.sendInitialBid(id, bid, remark)),
      getContractorBids: () => dispatch(actions.GetContractorBids())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(WorkBar);