import React from "react";
import { 
    Container, 
    Row, 
    Col, 
    FormGroup,
    Button,
    InputGroupAddon,
    InputGroupText,
    InputGroup, } from "reactstrap";
import { connect } from 'react-redux';
import * as actions from '../store/Actions/Actions';

class Hero extends React.Component {
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

  Search = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    
    if(formData.SelectType == null){
      alert('Please Choose Type');
    } else if(formData.Selectcity == null){
      alert('Please Choose City')
    } else {
      var type = null;
      var city = null;
      if(formData.SelectType === 'Civil Contractor') {
          type = 'CivCon';
      }
      if(formData.SelectType === 'Electric Contractor') {
          type = 'EleCon';
      }
      if(formData.SelectType === 'POP Contractor') {
          type = 'POP';
      }
      if(formData.SelectType === 'Stone Contractor') {
          type = 'Ston';
      }
      if(formData.SelectType === 'Tiles Contractor') {
          type = 'Tile';
      }
      if(formData.SelectType === 'Polishing Contractor') {
          type = 'Pol';
      }
      if(formData.SelectType === 'Woodwork Contractor') {
          type = 'WoWo';
      }
      if(formData.SelectType === 'False Cieling Contractor') {
          type = 'FalCie';
      }
      if(formData.SelectType === 'Fabrication Contractor') {
          type = 'Fabr';
      }
      if(formData.SelectType === 'AC Contractor') {
          type = 'AC';
      }
      if(formData.SelectType === 'Plumbing Contractor') {
          type = 'Plum';
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
      console.log(type, city);
      this.props.getContractorJson(city, type);
      this.props.history.push(`/contractors/${city}/${type}`); 
    }
  }

  render() {
    return (
      <>
        <div className="position-relative">
          <section className="section section-hero section-shaped">
            <div className="shape shape-style-1 shape-default">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg container-box">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="9">
                    <h2 style={{color: '#ffffff'}}>Make Your Dream Home Possible With Us!</h2>
                    <h4 className="text-white">
                    Find Best Contractors From Your City
                    </h4>
                    <form onSubmit={this.Search}>
                    <Row>
                      <Col sm="3" xs="3" className="px-0 pl-3 mt-5">
                          <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                  <i className="ni ni-building" style={{color: '#000000'}} />
                                  </InputGroupText>
                              </InputGroupAddon>
                              <select className="form-control pr-3" name="Selectcity" onChange={this.handleInputChange} placeholder="Select..." data-toggle="select" data-minimum-results-for-search="Infinity">
                                <option unselectable="off">Select City</option>
                                <option>Delhi</option>
                                <option>Gurgaon</option>
                                <option>Noida</option>
                                <option>Faridabad</option>
                              </select>
                          </InputGroup>
                      </Col>
                      <Col sm="6" xs="9" className="px-0 pr-3">
                        <div className="btn-wrapper mt-5">  
                          <FormGroup>
                              <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                  <i className="ni ni-zoom-split-in" style={{color: '#000000'}} />
                                  </InputGroupText>
                              </InputGroupAddon>
                              <select className="form-control pr-3" name="SelectType" data-toggle="select" onChange={this.handleInputChange} data-minimum-results-for-search="Infinity">
                                <option unselectable="off">Select Type</option>
                                <option>Civil Contractor</option>
                                <option>Electric Contractor</option>
                                <option>POP Contractor</option>
                                <option>Stone Contractor</option>
                                <option>Tiles Contractor</option>
                                <option>Polishing Contractor</option>
                                <option>Woodwork Contractor</option>
                                <option>False Cieling Contractor</option>
                                <option>Fabrication Contractor</option>
                                <option>AC Contractor</option>
                              </select>
                              </InputGroup>
                          </FormGroup>
                          </div>
                      </Col>
                      <Col sm="3" className="px-0 pr-3">
                        <div className="text-center mt-5">
                          <Button color="info" type="submit">
                              Find
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    </form>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getContractorJson: (city, type) => {
          dispatch(actions.filteringContractors(city, type));
      }
  };
}

export default connect(null,mapDispatchToProps)(Hero);
