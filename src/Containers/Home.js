import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import * as actions from '../store/Actions/Actions';
import Header from '../Components/Navbar';
import HowWeWork from '../Components/HowWeWork';
import Footer from '../Components/Footer';
import MiddleSection from '../Components/Jumbotron';

class Home extends React.Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    componentDidUpdate(){
        if(!this.props.user){
            this.props.history.push('/');
        }
    }
    render() {
        return (
            <div>
                <Header {...this.props} />
                <MiddleSection {...this.props} />
                <HowWeWork />
                <Footer />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: Cookies.get('token') !== undefined,
        user: state.usersAllDetail,
        page: 'home'
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => {
            dispatch(actions.authcheckstate());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);