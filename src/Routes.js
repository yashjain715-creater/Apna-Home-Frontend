import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

import Home from './Containers/Home';
import Login from './Containers/Login';
import SignUp from './Containers/Signup';
import Profile from './Containers/Profile';
import EmailVerify from './Containers/Email-verify';
import Dashboard from './Containers/Dashboard';
import ContractorDetail from './Containers/Contractor_detail';
import SignUp2 from './Containers/Signup2';
import AboutUs from './Containers/AboutUs';
import Contractors_List from './Containers/Contractors_List';


const BaseRouter = () => (
    <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <GuardProfile path="/dashboard" component={Dashboard} />
        <GuardProfile path="/profile" component={Profile} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/accounts/:id" component={EmailVerify} />
        <Route exact path="/contractor/:id" component={ContractorDetail} />
        <Route exact path="/signup/extra" component={SignUp2} />
        <Route exact path="/Allcontractors" component={Contractors_List} />
        <Route exact path="/contractors/:city/:type" component={Contractors_List} />
        <Route exact path="/aboutus" component={AboutUs} />
    </div>
);

const GuardProfile = ({component: Component, ...rest}) => {
    const token = Cookies.get('token')
    return (
        <Route {...rest} render={(props) => (
            token
                ? <Component {...props} />
                : <Redirect to="/login" />
        )} />
    )
}


export default BaseRouter;