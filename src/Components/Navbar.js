import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/Actions/Actions';
import Headroom from "headroom.js";


import {
    UncontrolledCollapse,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    Button
  } from "reactstrap";

class Header extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    if(this.props.page === 'home') {
      headroom.init();
    }
  }
    
    render() {

        let name = null;
        if(this.props.user) {
            var title = 'Welcome '+this.props.user.first_name;
            name = (
                <UncontrolledDropdown>  
                    <DropdownToggle color="secondary"className="nav-button loginbtn" caret>
                      {title}
                    </DropdownToggle>
                   
                    <DropdownMenu>
                        <DropdownItem href="/dashboard">
                            <i className="ni ni-credit-card" />
                            Dashboard
                        </DropdownItem>
                        <DropdownItem href="/profile">
                        <i className="ni ni-circle-08" />
                        Profile
                        </DropdownItem>
                        <DropdownItem onClick={this.props.logout}>
                        <i className="ni ni-curved-next" />
                            Logout
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
        }

        let navClass = null;
        if(this.props.page === 'home'){
          navClass = 'navbar-horizontal bg-default navbar-transparent'
        } else {
          navClass = 'navbar-horizontal bg-default navbar-dark'
        }

        return(
            <>
        <Navbar
          className={navClass}
          expand="lg"
          style={{height:'100px'}}
          id="navbar-main"
        >
          <Container>
            <NavbarBrand href="/">
            <img
              alt="..."
              src={require('../assets/img/brand/logo2.png')}
              style={{height:'60px', width:"200px"}}
              />
            </NavbarBrand>
            <button
              aria-controls="navbar-default"
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navbar-default"
              data-toggle="collapse"
              id="navbar-default"
              type="button"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-default">
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                    <img
                      alt="..."
                      src={require('../assets/img/brand/logo2.png')}
                      style={{height:'80px', width:"240px", background:'deepskyblue'}}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      aria-controls="navbar-default"
                      aria-expanded={false}
                      aria-label="Toggle navigation"
                      className="navbar-toggler"
                      data-target="#navbar-default"
                      data-toggle="collapse"
                      id="navbar-default"
                      type="button"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              
              <Row className="rowphone">
                <Col lg={{ size:12, offset:7 }} className="displaychange"><h5 className="colnumber">Phone number: <a href="tel:(+91)8450949364">(+91)8450949364</a></h5></Col>
                <Col lg={{ size:12, offset:6 }} className="displaychange">
                  <div style={{width:'100%'}}></div>
                <Nav navbar style={{height:'30px', marginLeft:'auto'}}>
                <NavItem>
                  <NavLink
                    className="nav-link-icon links"
                    href="/Allcontractors"
                    onClick={this.props.getContractorJson}
                  >
                      <i className="ni ni-ruler-pencil d-lg-none" />
                    <span className="nav-link-inner--text">
                      Home
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon links"
                    href="/aboutus"
                  >
                    <i className="ni ni-notification-70 d-lg-none" />
                    <span className="nav-link-inner--text">
                      About Us
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon links"
                    href="/aboutus"
                  >
                    <i className="ni ni-notification-70 d-lg-none" />
                    <span className="nav-link-inner--text">
                      Services
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon links"
                    href="/aboutus"
                  //  style={{paddingTop:'0',paddingBottom:'0'}}
                  >
                    <i className="ni ni-notification-70 d-lg-none" />
                    <span className="nav-link-inner--text">
                      Contact Us
                    </span>
                  </NavLink>
                </NavItem>
                  {
                    this.props.isAuthenticated ?
                    
                    name

                    :
                      
                        <Button
                          aria-expanded={false}
                          aria-haspopup={true}
                          className="loginbtn"
                          data-toggle="dropdown"
                          href="/login"
                          id="navbar-default_dropdown_1"
                          role="button"
                      >
                          <i className="ni ni-circle-08 d-lg-none" />
                          <span className="nav-link-inner--text">
                          Log in
                          </span>
                        </Button>
                  }
               
              </Nav>
              </Col>
              </Row>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.authLogout()),
        getContractorJson: () => {
          dispatch(actions.getAllContractors());
        }
    }
} 

export default withRouter(connect(null, mapDispatchToProps)(Header));