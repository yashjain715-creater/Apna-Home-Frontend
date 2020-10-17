import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Header from '../Components/Navbar';
import Contractorcard from '../Components/ContractorsCard';
import AllContractorcard from '../Components/AllContractors';
import * as actions from '../store/Actions/Actions';

class Contractors_List extends React.Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                {
                    this.props.location.pathname === '/Allcontractors'?
                    <AllContractorcard {...this.props} /> :
                    <Contractorcard {...this.props} />

                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.usersAllDetail,
        isAuthenticated: Cookies.get('token') !== undefined,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => {
            dispatch(actions.authcheckstate());
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Contractors_List);