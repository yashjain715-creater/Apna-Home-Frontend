import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import "../assets/plugins/nucleo/css/nucleo.css";
import "../assets/scss/argon-dashboard-react.scss";
import DashboardSide from'../Components/DashboardSide';
import LoginForm from '../Containers/Login'
import Profile from '../Containers/Profile';
import Workbar from '../Containers/Works';
import { connect } from 'react-redux';
import * as actions from '../store/Actions/Actions';

class Dashboard extends React.Component {
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

  routes = [
    {
      path: "/home",
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      component: Workbar,
      layout: "/dashboard"
    },
    {
      path: "/user-profile",
      name: "My Profile",
      icon: "ni ni-single-02 text-yellow",
      component: Profile,
      layout: "/dashboard"
    },
    {
      path: "/login",
      name: "Logout",
      icon: "ni ni-user-run text-info",
      component: LoginForm,
      layout: ""
    },
  ];

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/dashboard") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return (
      <>
      <DashboardSide
        {...this.props}
        routes={this.routes}
        logo={{
          innerLink: "/",
        }}
      />
      <div className="main-content" ref="mainContent">
        <Switch>
          {this.getRoutes(this.routes)}
          <Redirect from="*" to="/dashboard/home" />
        </Switch>
      </div>
    </>
      
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(actions.authLogout()),
  }
} 

export default connect(null, mapDispatchToProps)(Dashboard);
