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
    Col
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
                    
                    <DropdownToggle color="secondary"className="nav-button" style={{width:'auto'}} caret>
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
          id="navbar-main"
        >
          <Container>
            <NavbarBrand href="/">
              <h3 style={{color: '#ffffff', fontWeight:'600', fontSize:'33px'}}>Apna Home</h3>
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
                      <h1>Apna Home</h1>
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
              <Nav className="ml-lg-auto" navbar>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    href="/Allcontractors"
                    onClick={this.props.getContractorJson}
                  >
                      <i className="ni ni-ruler-pencil d-lg-none" />
                    <span className="nav-link-inner--text">
                      Contractors
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    href="/aboutus"
                  >
                    <i className="ni ni-notification-70 d-lg-none" />
                    <span className="nav-link-inner--text">
                      About Us
                    </span>
                  </NavLink>
                </NavItem>
                  {
                      this.props.isAuthenticated ?

                      name
                      :
                      null
                  }
                  {
                    this.props.isAuthenticated ?
                    
                        <NavItem>
                          <NavLink
                            aria-expanded={false}
                            aria-haspopup={true}
                            className="nav-link-icon"
                            data-toggle="dropdown"
                            id="navbar-default_dropdown_1"
                            role="button"
                            onClick={this.props.logout}
                        >
                            <i className="ni ni-ruler-pencil d-lg-none" />
                            <span className="nav-link-inner--text">
                            Logout
                            </span>
                        </NavLink>
                        </NavItem>
                    :
                      <NavItem>
                        <NavLink
                        aria-expanded={false}
                        aria-haspopup={true}
                        className="nav-link-icon"
                        data-toggle="dropdown"
                        href="/login"
                        id="navbar-default_dropdown_1"
                        role="button"
                    >
                        <i className="ni ni-circle-08 d-lg-none" />
                        <span className="nav-link-inner--text">
                        Login
                        </span>
                    </NavLink>
                      </NavItem>
                  }
               
              </Nav>
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