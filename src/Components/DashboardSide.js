import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class DashboardSide extends React.Component {
  state = {
    collapseOpen: false
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  
  closeCollapseLogin = () => {
    this.setState({
      collapseOpen: false
    });
    this.props.logout();
  };

  createLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.layout === ''){
        return (
          <NavItem key={key} className="navItem">
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={this.closeCollapseLogin}
              activeClassName="active"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      } else {
        return (
          <NavItem key={key} className="navItem">
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={this.closeCollapse}
              activeClassName="active"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      }
    });
  };
  render() {
    const { routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="lg"
        id="sidenav-main"
      >
        <Container fluid>
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {logo ? (
            <NavbarBrand className="pt-0 text-center m-auto" {...navbarBrandProps} >
              <h3>Apna Home</h3>
            </NavbarBrand>
          ) : null}
          
          <Collapse navbar isOpen={this.state.collapseOpen}>
            <div className="navbar-collapse-header d-lg-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand text-center m-auto" xs="6">
                      <Link to={logo.innerLink}>
                        <h3>Apna Home</h3>
                      </Link>
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav navbar>{this.createLinks(routes)}</Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

DashboardSide.defaultProps = {
  routes: [{}]
};

DashboardSide.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
  })
};

export default DashboardSide;
